
/**
 * @file MethodsProxy.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import {PromiEvent} from 'web3-core-method';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';

export default class MethodsProxy {
    /**
     * @param {Contract} contract
     * @param {MethodFactory} methodFactory
     * @param {MethodEncoder} methodEncoder
     * @param {MethodOptionsValidator} methodOptionsValidator
     * @param {MethodOptionsMapper} methodOptionsMapper
     *
     * @constructor
     */
    constructor(contract, methodFactory, methodEncoder, methodOptionsValidator, methodOptionsMapper) {
        this.contract = contract;
        this.methodFactory = methodFactory;
        this.methodEncoder = methodEncoder;
        this.methodOptionsValidator = methodOptionsValidator;
        this.methodOptionsMapper = methodOptionsMapper;

        return new Proxy(this, {
            /**
             * Checks if a contract event exists by the given name and
             * returns the subscription otherwise it throws an error
             *
             * @param {MethodsProxy} target
             * @param {String} name
             *
             * @returns {Function|Error}
             */
            get: (target, name) => {
                if (this.contract.abiModel.hasMethod(name)) {
                    let abiItemModel = this.contract.abiModel.getMethod(name);

                    // TODO: Find a better solution for the handling of the contractMethodParameters
                    /* eslint-disable no-inner-declarations */
                    function ContractMethod() {
                        let methodArguments = [...arguments];

                        // Because of the possibility to overwrite the contract data if I call contract.deploy()
                        // have I to check here if it is a contract deployment. If this call is a contract deployment
                        // then I have to set the right contract data and to map the arguments.
                        // TODO: Change API or improve this
                        if (name === 'contractConstructor') {
                            if (methodArguments[0]) {
                                if (methodArguments[0]['data']) {
                                    target.contract.data = methodArguments[0]['data'];
                                }

                                if (methodArguments[0]['arguments']) {
                                    abiItemModel.contractMethodParameters = methodArguments[0]['arguments'];
                                }

                                return ContractMethod;
                            }

                            abiItemModel.contractMethodParameters = [];

                            return ContractMethod;
                        }

                        // If there exists more than one method with this name then find the correct abiItemModel
                        if (isArray(abiItemModel)) {
                            const abiItemModelFound = abiItemModel.some((model) => {
                                if (model.getInputLength() === methodArguments.length) {
                                    abiItemModel = model;

                                    return true;
                                }

                                return false;
                            });

                            if (!abiItemModelFound) {
                                throw new Error(`Methods with name "${name}" found but the given parameters are wrong`);
                            }
                        }

                        abiItemModel.contractMethodParameters = methodArguments;

                        return ContractMethod;
                    }

                    ContractMethod.call = function() {
                        return target.executeMethod(abiItemModel, arguments, 'call');
                    };

                    ContractMethod.send = function() {
                        if (abiItemModel.isOfType('constructor')) {
                            return target.executeMethod(abiItemModel, arguments, 'contract-deployment');
                        }

                        return target.executeMethod(abiItemModel, arguments, 'send');
                    };

                    ContractMethod.call.request = function() {
                        return target.createMethod(abiItemModel, arguments, 'call');
                    };

                    ContractMethod.send.request = function() {
                        return target.createMethod(abiItemModel, arguments, 'send');
                    };

                    ContractMethod.estimateGas = function() {
                        return target.executeMethod(abiItemModel, arguments, 'estimate');
                    };

                    ContractMethod.encodeABI = function() {
                        return target.methodEncoder.encode(abiItemModel, target.contract.data);
                    };

                    return ContractMethod;
                    /* eslint-enable no-inner-declarations */
                }

                return Reflect.get(target, name);
            }
        });
    }

    /**
     * Executes the RPC method with the methodController
     *
     * @param {AbiItemModel} abiItemModel
     * @param {IArguments} methodArguments
     * @param {String} requestType
     *
     * @returns {Promise|PromiEvent}
     */
    executeMethod(abiItemModel, methodArguments, requestType) {
        let method;

        try {
            method = this.createMethod(abiItemModel, methodArguments, requestType);
        } catch (error) {
            const promiEvent = new PromiEvent();
            promiEvent.reject(error);
            promiEvent.emit('error', error);

            return promiEvent;
        }

        return method.execute();
    }

    /**
     * Creates the rpc method, encodes the contract method and validate the objects.
     *
     * @param {AbiItemModel} abiItemModel
     * @param {IArguments} methodArguments
     * @param {String} requestType
     *
     * @returns {Method}
     */
    createMethod(abiItemModel, methodArguments, requestType) {
        // Get correct method class
        const method = this.methodFactory.createMethodByRequestType(abiItemModel, this.contract, requestType);
        method.setArguments(methodArguments);

        // If no parameters are given for the eth_call or eth_send* methods then it will set a empty options object.
        if (!method.parameters[0]) {
            method.parameters[0] = {};
        }

        // Encode contract method
        method.parameters[0]['data'] = this.methodEncoder.encode(abiItemModel, this.contract.data);

        // Set default options in the transaction object if required
        method.parameters[0] = this.methodOptionsMapper.map(this.contract, method.parameters[0]);

        // Validate transaction object
        this.methodOptionsValidator.validate(abiItemModel, method);

        return method;
    }
}

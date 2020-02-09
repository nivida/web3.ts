
/**
 * @file MethodFactory.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import {
    EstimateGasMethod,
    ChainIdMethod,
    GetTransactionCountMethod,
    GetTransactionReceiptMethod,
    GetBlockByNumberMethod,
    SocketTransactionObserver,
    HttpTransactionObserver
} from 'web3-core-method';
import {NewHeadsSubscription} from 'web3-core-subscriptions';
import CallContractMethod from '../methods/CallContractMethod';
import ContractDeployMethod from '../methods/ContractDeployMethod';
import PastEventLogsMethod from '../methods/PastEventLogsMethod';
import AllPastEventLogsMethod from '../methods/AllPastEventLogsMethod';
import SendContractMethod from '../methods/SendContractMethod';

export default class MethodFactory {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {ContractModuleFactory} contractModuleFactory
     * @param {AbiCoder} abiCoder
     *
     * @constructor
     */
    constructor(utils, formatters, contractModuleFactory, abiCoder) {
        this.utils = utils;
        this.formatters = formatters;
        this.contractModuleFactory = contractModuleFactory;
        this.abiCoder = abiCoder;
    }

    /**
     * Returns the correct Method
     *
     * @method createMethod
     *
     * @param {AbiItemModel} abiItem
     * @param {Contract} contract
     * @param {String} requestType
     *
     * @returns {Method}
     */
    createMethodByRequestType(abiItem, contract, requestType) {
        let rpcMethod;

        switch (requestType) {
            case 'call':
                rpcMethod = this.createCallContractMethod(abiItem, contract);
                break;
            case 'send':
                rpcMethod = this.createSendContractMethod(contract);
                break;
            case 'estimate':
                rpcMethod = this.createEstimateGasMethod(contract);
                break;
            case 'contract-deployment':
                rpcMethod = this.createContractDeployMethod(contract);
                break;
        }

        if (typeof rpcMethod === 'undefined') {
            throw new TypeError(`RPC call not found with requestType: "${requestType}"`);
        }

        return rpcMethod;
    }

    /**
     * Returns an object of type PastEventLogsMethod
     *
     * @method createPastEventLogsMethod
     *
     * @param {AbiItemModel} abiItem
     * @param {Contract} contract
     *
     * @returns {PastEventLogsMethod}
     */
    createPastEventLogsMethod(abiItem, contract) {
        return new PastEventLogsMethod(
            this.utils,
            this.formatters,
            contract,
            this.contractModuleFactory.createEventLogDecoder(),
            abiItem,
            this.contractModuleFactory.createEventOptionsMapper()
        );
    }

    /**
     * Returns an object of type PastEventLogsMethod
     *
     * @method createPastEventLogsMethod
     *
     * @param {AbiModel} abiModel
     * @param {Contract} contract
     *
     * @returns {AllPastEventLogsMethod}
     */
    createAllPastEventLogsMethod(abiModel, contract) {
        return new AllPastEventLogsMethod(
            this.utils,
            this.formatters,
            contract,
            this.contractModuleFactory.createAllEventsLogDecoder(),
            abiModel,
            this.contractModuleFactory.createAllEventsOptionsMapper()
        );
    }

    /**
     * Returns an object of type CallContractMethod
     *
     * @method createCallContractMethod
     *
     * @param {AbiItemModel} abiItem
     * @param {Contract} contract
     *
     * @returns {CallContractMethod}
     */
    createCallContractMethod(abiItem, contract) {
        return new CallContractMethod(this.utils, this.formatters, contract, this.abiCoder, abiItem);
    }

    /**
     * Returns an object of type SendContractMethod
     *
     * @method createSendContractMethod
     *
     * @param {Contract} contract
     *
     * @returns {SendContractMethod}
     */
    createSendContractMethod(contract) {
        return new SendContractMethod(
            this.utils,
            this.formatters,
            contract,
            this.createTransactionObserver(contract),
            new ChainIdMethod(this.utils, this.formatters, contract),
            new GetTransactionCountMethod(this.utils, this.formatters, contract),
            this.contractModuleFactory.createAllEventsLogDecoder(),
            contract.abiModel
        );
    }

    /**
     * Returns an object of type ContractDeployMethod
     *
     * @method createContractDeployMethod
     *
     * @param {Contract} contract
     *
     * @returns {ContractDeployMethod}
     */
    createContractDeployMethod(contract) {
        return new ContractDeployMethod(
            this.utils,
            this.formatters,
            contract,
            this.createTransactionObserver(contract),
            new ChainIdMethod(this.utils, this.formatters, contract),
            new GetTransactionCountMethod(this.utils, this.formatters, contract)
        );
    }

    /**
     * Returns an object of type EstimateGasMethod
     *
     * @method createEstimateGasMethod
     *
     * @param {Contract} contract
     *
     * @returns {EstimateGasMethod}
     */
    createEstimateGasMethod(contract) {
        return new EstimateGasMethod(this.utils, this.formatters, contract);
    }

    /**
     * Returns the correct timeout value
     *
     * @method getTimeout
     *
     * @param {Contract} contract
     *
     * @returns {Number}
     */
    getTimeout(contract) {
        let timeout = contract.transactionBlockTimeout;

        if (!contract.currentProvider.supportsSubscriptions()) {
            timeout = contract.transactionPollingTimeout;
        }

        return timeout;
    }

    /**
     * Returns a object of type AbstractTransactionObserver
     *
     * @method createTransactionObserver
     *
     * @param {Configuration} moduleInstance
     *
     * @returns {AbstractTransactionObserver}
     */
    createTransactionObserver(moduleInstance) {
        if (moduleInstance.currentProvider.supportsSubscriptions()) {
            return new SocketTransactionObserver(
                moduleInstance.currentProvider,
                this.getTimeout(moduleInstance),
                moduleInstance.transactionConfirmationBlocks,
                new GetTransactionReceiptMethod(this.utils, this.formatters, moduleInstance),
                new NewHeadsSubscription(this.utils, this.formatters, moduleInstance)
            );
        }

        return new HttpTransactionObserver(
            moduleInstance.currentProvider,
            this.getTimeout(moduleInstance),
            moduleInstance.transactionConfirmationBlocks,
            new GetTransactionReceiptMethod(this.utils, this.formatters, moduleInstance),
            new GetBlockByNumberMethod(this.utils, this.formatters, moduleInstance)
        );
    }
}

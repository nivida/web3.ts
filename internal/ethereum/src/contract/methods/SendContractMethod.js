
/**
 * @file SendContractMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import isArray from 'lodash/isArray';
import {EthSendTransactionMethod} from 'web3-core-method';

// TODO: Implement revert handling (AbstractContractMethod)
export default class SendContractMethod extends EthSendTransactionMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {Configuration} moduleInstance
     * @param {AbstractTransactionObserver} transactionObserver
     * @param {ChainIdMethod} chainIdMethod
     * @param {GetTransactionCountMethod} getTransactionCountMethod
     * @param {AllEventsLogDecoder} allEventsLogDecoder
     * @param {AbiModel} abiModel
     *
     * @constructor
     */
    constructor(
        utils,
        formatters,
        moduleInstance,
        transactionObserver,
        chainIdMethod,
        getTransactionCountMethod,
        allEventsLogDecoder,
        abiModel
    ) {
        super(utils, formatters, moduleInstance, transactionObserver, chainIdMethod, getTransactionCountMethod);

        this.allEventsLogDecoder = allEventsLogDecoder;
        this.abiModel = abiModel;
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {Object}
     */
    afterExecution(response) {
        if (isArray(response.logs)) {
            response.events = {};

            response.logs.forEach((log, index) => {
                log = this.allEventsLogDecoder.decode(this.abiModel, log);

                if (log.event) {
                    if (response.events[log.event]) {
                        if (isArray(response.events[log.event])) {
                            response.events[log.event].push(log);

                            return;
                        }

                        response.events[log.event] = [response.events[log.event], log];

                        return;
                    }

                    response.events[log.event] = log;

                    return;
                }

                response.events[index] = log;
            });

            delete response.logs;
        }

        return super.afterExecution(response);
    }
}


/**
 * @file ContractDeployMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import {EthSendTransactionMethod} from 'web3-core-method';

export default class ContractDeployMethod extends EthSendTransactionMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {Configuration} moduleInstance
     * @param {AbstractTransactionObserver} transactionObserver
     * @param {ChainIdMethod} chainIdMethod
     * @param {GetTransactionCountMethod} getTransactionCountMethod
     *
     * @constructor
     */
    constructor(utils, formatters, moduleInstance, transactionObserver, chainIdMethod, getTransactionCountMethod) {
        super(utils, formatters, moduleInstance, transactionObserver, chainIdMethod, getTransactionCountMethod);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {Configuration} moduleInstance - The module where the method is called from for example Eth.
     */
    beforeExecution(moduleInstance) {
        if (this.rpcMethod !== 'eth_sendRawTransaction') {
            super.beforeExecution(moduleInstance);
            delete this.parameters[0].to;
        }
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {Contract}
     */
    afterExecution(response) {
        const clonedContract = this.moduleInstance.clone();
        clonedContract.address = response.contractAddress;

        if (this.promiEvent.listenerCount('receipt') > 0) {
            this.promiEvent.emit('receipt', super.afterExecution(response));
            this.promiEvent.removeAllListeners('receipt');
        }

        return clonedContract;
    }
}

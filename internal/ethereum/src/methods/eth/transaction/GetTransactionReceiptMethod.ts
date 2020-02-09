/**
 * @file GetTransactionReceiptMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from "internal/core/src/json-rpc/methods/Method";
import TransactionReceipt from "../../../../lib/types/output/TransactionReceipt";
import EthereumConfiguration from "../../../config/EthereumConfiguration";

export default class GetTransactionReceiptMethod<TransactionReceipt> extends Method<TransactionReceipt> {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config: EthereumConfiguration, parameters: any[]) {
        super('eth_getTransactionReceipt', 1, config, parameters);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {any} response
     *
     * @returns {Promise<TransactionReceipt|null>}
     */
    async afterExecution(response: any) {
        if (response !== null) {
            return new TransactionReceipt(response);
        }

        return response;
    }
}

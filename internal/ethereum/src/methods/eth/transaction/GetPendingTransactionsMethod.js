/**
 * @file GetPendingTransactionsMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2020
 */

import Method from "../../../../../core/src/json-rpc/methods/Method";
import Transaction from "../../../../lib/types/output/Transaction";

export default class GetPendingTransactionsMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('eth_pendingTransactions', 0, config, []);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {Promise<Transaction>}
     */
    async afterExecution(response) {
        if (response) {
            return response.map((item) => {
                return new Transaction(item);
            });
        }

        return response;
    }
}

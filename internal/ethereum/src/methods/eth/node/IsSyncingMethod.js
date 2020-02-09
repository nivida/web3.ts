/**
 * @file IsSyncingMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from "../../../../../core/src/json-rpc/methods/Method";
import SyncState from "../../../../lib/types/output/SyncState";

export default class IsSyncingMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('eth_syncing', 0, config, []);
    }

    /**
     * TODO: This should always return a consistency return value type
     *
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {Promise<SyncState|Boolean>}
     */
    async afterExecution(response) {
        if (typeof response !== 'boolean') {
            return new SyncState(response);
        }

        return response;
    }
}

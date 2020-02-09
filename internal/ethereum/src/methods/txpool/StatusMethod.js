/**
 * @file StatusMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2020
 */

import Method from "../../../../core/src/json-rpc/methods/Method";
import Hex from "../../../../core/src/utility/Hex";

export default class StatusMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('txpool_status', 0, config, []);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {Promise<Object>}
     */
    async afterExecution(response) {
        if (response) {
            response.pending = new Hex(response.pending).toNumber();
            response.queued = new Hex(response.queued).toNumber();
        }

        return response;
    }
}

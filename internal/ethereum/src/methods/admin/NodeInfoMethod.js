
/**
 * @file NodeInfoMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2019
 */

import Method from "../../../../core/src/json-rpc/methods/Method";
import Hex from "../../../../core/src/utility/Hex";

export default class NodeInfoMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('admin_nodeInfo', 0, config, []);
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
            response.ports.discovery = new Hex(response.ports.discovery).toNumber();
            response.ports.listener = new Hex(response.ports.listener).toNumber();
        }

        return response;
    }
}

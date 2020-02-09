/**
 * @file StopRpcMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2020
 */

import Method from "../../../../core/src/json-rpc/methods/Method";

export default class StopRpcMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('admin_stopRPC', 0, config, []);
    }
}

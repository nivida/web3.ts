
/**
 * @file StopGoTraceMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2019
 */

import Method from "../../../../core/src/json-rpc/methods/Method";

export default class StopGoTraceMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('debug_stopGoTrace', 0, config, []);
    }
}

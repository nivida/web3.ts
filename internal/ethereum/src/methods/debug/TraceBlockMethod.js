/**
 * @file TraceBlockMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2020
 */

import Method from "../../../../core/src/json-rpc/methods/Method";

export default class TraceBlockMethod extends Method {
    /**
     * @param {Array} parameters
     * @param {Configuration} config
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('debug_traceBlock', 2, config, parameters);
    }
}

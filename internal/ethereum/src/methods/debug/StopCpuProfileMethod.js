
/**
 * @file StopCpuProfileMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2019
 */

import Method from "../../../../core/src/json-rpc/methods/Method";

export default class StopCpuProfileMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('debug_stopCPUProfile', 0, config, []);
    }
}

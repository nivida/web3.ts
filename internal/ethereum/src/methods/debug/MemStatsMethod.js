/**
 * @file MemStatsMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2020
 */

import Method from "../../../../core/src/json-rpc/methods/Method";

export default class MemStatsMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('debug_memStats', 0, config, []);
    }
}

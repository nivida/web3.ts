/**
 * @file StopMiningMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2020
 */

import Method from "../../../../core/src/json-rpc/methods/Method";

export default class StopMiningMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('miner_stop', 0, config, []);
    }
}


/**
 * @file InspectMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2019
 */

import Method from "../../../../core/src/json-rpc/methods/Method";

export default class InspectMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('txpool_inspect', 0, config, []);
    }
}

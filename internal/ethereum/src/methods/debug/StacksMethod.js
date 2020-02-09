/**
 * @file StacksMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2020
 */

import Method from "../../../../core/src/json-rpc/methods/Method";

export default class StacksMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('debug_stacks', 0, config, []);
    }
}

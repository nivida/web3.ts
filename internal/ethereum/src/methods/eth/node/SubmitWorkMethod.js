/**
 * @file SubmitWorkMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from "../../../../../core/src/json-rpc/methods/Method";

export default class SubmitWorkMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('eth_submitWork', 3, config, []);
    }
}

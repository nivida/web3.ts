
/**
 * @file ShhVersionMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../core/src/json-rpc/methods/Method";

export default class ShhVersionMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('shh_version', 0, config, []);
    }
}

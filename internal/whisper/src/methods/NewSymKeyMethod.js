
/**
 * @file NewSymKeyMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../core/src/json-rpc/methods/Method";

export default class NewSymKeyMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('shh_newSymKey', 0, config, []);
    }
}

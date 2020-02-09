
/**
 * @file NewKeyPairMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../core/src/json-rpc/methods/Method";

export default class NewKeyPairMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('shh_newKeyPair', 0, config, []);
    }
}

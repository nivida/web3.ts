
/**
 * @file MarkTrustedPeerMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../core/src/json-rpc/methods/Method";

export default class MarkTrustedPeerMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('shh_markTrustedPeer', 1, config, parameters);
    }
}

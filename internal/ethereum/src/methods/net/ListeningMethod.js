
/**
 * @file ListeningMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../../core/src/json-rpc/methods/Method";

export default class ListeningMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('net_listening', 0, config, []);
    }
}

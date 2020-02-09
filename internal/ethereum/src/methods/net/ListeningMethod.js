/**
 * @file ListeningMethod.js
 * @author Samuel Furter
 * @date 2020
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

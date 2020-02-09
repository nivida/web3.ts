
/**
 * @file GetInfoMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../core/src/json-rpc/methods/Method";

export default class GetInfoMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('shh_info', 0, config, []);
    }
}

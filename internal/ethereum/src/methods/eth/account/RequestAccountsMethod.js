/**
 * @file RequestAccountsMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from "../../../../../core/src/json-rpc/methods/Method";

export default class RequestAccountsMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('eth_requestAccounts', 0, config, []);
    }
}

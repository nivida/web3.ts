/**
 * @file SignMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from '../../../../core/src/json-rpc/methods/Method';

export default class SignMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_sign', 2, config, parameters);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @returns {Promise}
     */
    async beforeExecution() {
        this.parameters[0] = Hex.isValid(this.parameters[0]) ? this.parameters[0] : Hex.fromUTF8(this.parameters[0]).toString();
        this.parameters[1] = new Address(this.parameters[1]).toString();
        this.parameters.reverse();
    }
}

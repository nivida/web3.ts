
/**
 * @file EcRecoverMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../../core/src/json-rpc/methods/Method";
import Hex from "../../../../core/src/utility/Hex";

export default class EcRecoverMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('personal_ecRecover', 2, config, parameters);
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
    }
}


/**
 * @file PersonalSignMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../../core/src/json-rpc/methods/Method";
import Address from "../../../lib/types/input/Address";
import Hex from "../../../../core/src/utility/Hex";

export default class PersonalSignMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('personal_sign', 3, config, parameters);
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
    }
}

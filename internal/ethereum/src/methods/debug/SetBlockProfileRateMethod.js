/**
 * @file SetBlockProfileRateMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2020
 */

import Method from "../../../../core/src/json-rpc/methods/Method";
import Hex from "../../../../core/src/utility/Hex";

export default class SetBlockProfileRateMethod extends Method {
    /**
     * @param {Array} parameters
     * @param {Configuration} config
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('debug_setBlockProfileRate', 1, config, parameters);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @returns {Promise}
     */
    async beforeExecution() {
        this.parameters[0] = Hex.fromNumber(this.parameters[0]).toString();
    }
}

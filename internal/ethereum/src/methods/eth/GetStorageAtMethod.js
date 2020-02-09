/**
 * @file GetStorageAtMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from '../../../../core/src/json-rpc/methods/Method';
import Address from "../../../lib/types/input/Address";
import Hex from "../../../../core/src/utility/Hex";
import BlockNumber from "../../../lib/types/input/BlockNumber";

export default class GetStorageAtMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_getStorageAt', 3, config, parameters);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @returns {Promise}
     */
    async beforeExecution() {
        this.parameters[0] = new Address(this.parameters[0]).toString();
        this.parameters[1] = Hex.fromNumber(this.parameters[1]).toString();
        this.parameters[2] = new BlockNumber(this.parameters[2]).toString();
    }
}

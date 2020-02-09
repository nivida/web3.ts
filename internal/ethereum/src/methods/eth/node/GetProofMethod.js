/**
 * @file GetProofMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2020
 */

import Method from "../../../../../core/src/json-rpc/methods/Method";
import Address from "../../../../lib/types/input/Address";
import BlockNumber from "../../../../lib/types/input/BlockNumber";
import Hex from "../../../../../core/src/utility/Hex";

export default class GetProofMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_getProof', 3, config, parameters);
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
        this.parameters[2] = new BlockNumber(this.parameters[2]).toString();
    }

    /**
     * TODO: This should be handled with a output Proof type object
     *
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {Promise<Proof>}
     */
    async afterExecution(response) {
        response.nonce = new Hex(response.nonce).toNumberString();
        response.balance = new Hex(response.balance).toNumberString();

        for (let i = 0; i < response.storageProof.length; i++) {
            response.storageProof[i].value = new Hex(response.storageProof[i].value).toNumberString();
        }

        return response;
    }
}

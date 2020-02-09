
/**
 * @file ListAccountsMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../../core/src/json-rpc/methods/Method";
import Address from "../../../lib/types/input/Address";

export default class ListAccountsMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('personal_listAccounts', 0, config, []);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {String[]} response
     *
     * @returns {Promise<String[]>}
     */
    async afterExecution(response) {
        return response.map((responseItem) => {
            return Address.toChecksum(responseItem);
        });
    }
}

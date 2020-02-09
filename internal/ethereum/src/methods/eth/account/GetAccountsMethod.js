
/**
 * @file GetAccountsMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from '../../../../../core/src/json-rpc/methods/Method';
import Address from '../../../../lib/types/input/Address';

export default class GetAccountsMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('eth_accounts', 0, config, []);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {Promise<Array<string>>}
     */
    async afterExecution(response) {
        return response.map((responseItem) => {
            return Address.toChecksum(responseItem);
        });
    }
}

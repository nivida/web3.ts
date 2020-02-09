/**
 * @file GetPastLogsMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from '../../../../core/src/json-rpc/methods/Method';
import LogOptions from "../../../lib/types/input/LogOptions";
import Log from "../../../lib/types/output/Log";

export default class GetPastLogsMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_getLogs', 1, config, parameters);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @returns {Promise}
     */
    async beforeExecution() {
        this.parameters[0] = new LogOptions(this.parameters[0]);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Array} response
     *
     * @returns {Promise<Log[]>}
     */
    async afterExecution(response) {
        return response.map((responseItem) => {
            return new Log(responseItem);
        });
    }
}

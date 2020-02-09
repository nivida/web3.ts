
/**
 * @file AllPastEventLogsMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import {GetPastLogsMethod} from 'web3-core-method';

export default class AllPastEventLogsMethod extends GetPastLogsMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {Configuration} moduleInstance
     * @param {AllEventsLogDecoder} allEventsLogDecoder
     * @param {AbiModel} abiModel
     * @param {AllEventsOptionsMapper} allEventsOptionsMapper
     *
     * @constructor
     */
    constructor(utils, formatters, moduleInstance, allEventsLogDecoder, abiModel, allEventsOptionsMapper) {
        super(utils, formatters, moduleInstance);
        this.abiModel = abiModel;
        this.allEventsLogDecoder = allEventsLogDecoder;
        this.allEventsOptionsMapper = allEventsOptionsMapper;
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {Configuration} moduleInstance - The package where the method is called from for example Eth.
     */
    beforeExecution(moduleInstance) {
        super.beforeExecution(moduleInstance);
        this.parameters[0] = this.allEventsOptionsMapper.map(this.abiModel, moduleInstance, this.parameters[0]);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Array} response
     *
     * @returns {Array}
     */
    afterExecution(response) {
        const formattedLogs = super.afterExecution(response);

        return formattedLogs.map((logItem) => {
            return this.allEventsLogDecoder.decode(this.abiModel, logItem);
        });
    }
}

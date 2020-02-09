
/**
 * @file PastEventLogsMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import {GetPastLogsMethod} from 'web3-core-method';

export default class PastEventLogsMethod extends GetPastLogsMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {Configuration} moduleInstance
     * @param {EventLogDecoder} eventLogDecoder
     * @param {AbiItemModel} abiItemModel
     * @param {EventOptionsMapper} eventOptionsMapper
     *
     * @constructor
     */
    constructor(utils, formatters, moduleInstance, eventLogDecoder, abiItemModel, eventOptionsMapper) {
        super(utils, formatters, moduleInstance);
        this.abiItemModel = abiItemModel;
        this.eventLogDecoder = eventLogDecoder;
        this.eventOptionsMapper = eventOptionsMapper;
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
        this.parameters[0] = this.eventOptionsMapper.map(this.abiItemModel, moduleInstance, this.parameters[0]);
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
            return this.eventLogDecoder.decode(this.abiItemModel, logItem);
        });
    }
}

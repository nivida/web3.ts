
/**
 * @file CallContractMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import {CallMethod} from 'web3-core-method';

// TODO: Implement revert handling (AbstractContractMethod)
export default class CallContractMethod extends CallMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {Configuration} moduleInstance
     * @param {AbiCoder} abiCoder
     * @param {AbiItemModel} abiItemModel
     *
     * @constructor
     */
    constructor(utils, formatters, moduleInstance, abiCoder, abiItemModel) {
        super(utils, formatters, moduleInstance);
        this.abiCoder = abiCoder;
        this.abiItemModel = abiItemModel;
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {String} response
     *
     * @returns {Array|String}
     */
    afterExecution(response) {
        if (!response || response === '0x') {
            return null;
        }

        const outputs = this.abiItemModel.getOutputs();
        if (outputs.length > 1) {
            return this.abiCoder.decodeParameters(outputs, response);
        }

        return this.abiCoder.decodeParameter(outputs[0], response);
    }
}

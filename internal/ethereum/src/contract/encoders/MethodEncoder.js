
/**
 * @file MethodEncoder.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

export default class MethodEncoder {
    /**
     * @param {AbiCoder} abiCoder
     *
     * @constructor
     */
    constructor(abiCoder) {
        this.abiCoder = abiCoder;
    }

    /**
     * Encodes the method with the given parameters
     *
     * @method encode
     *
     * @param {AbiItemModel} abiItemModel
     * @param {String} deployData
     *
     * @returns {String|Error}
     */
    encode(abiItemModel, deployData) {
        let encodedParameters = this.abiCoder.encodeParameters(
            abiItemModel.getInputs(),
            abiItemModel.contractMethodParameters
        );

        if (encodedParameters.startsWith('0x')) {
            encodedParameters = encodedParameters.slice(2);
        }

        if (abiItemModel.isOfType('constructor')) {
            if (!deployData) {
                throw new Error(
                    'The contract has no contract data option set. This is necessary to append the constructor parameters.'
                );
            }

            return deployData + encodedParameters;
        }

        if (abiItemModel.isOfType('function')) {
            return abiItemModel.signature + encodedParameters;
        }

        return encodedParameters;
    }
}


/**
 * @file index.js
 * @author Marek Kotewicz <marek@parity.io>
 * @author Fabian Vogelsteller <fabian@frozeman.de>
 * @date 2019
 */

import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

// TODO: Implement it by our self this can't be a dependency because of the importance of it.
export default class AbiCoder {
    /**
     * @param {Utils} utils
     * @param {EthersAbiCoder} ethersAbiCoder
     *
     * @constructor
     */
    constructor(utils, ethersAbiCoder) {
        this.utils = utils;
        this.ethersAbiCoder = ethersAbiCoder;
    }

    /**
     * Encodes the function name to its ABI representation, which are the first 4 bytes of the keccak256 of the function name including  types.
     *
     * @method encodeFunctionSignature
     *
     * @param {String|Object} functionName
     *
     * @returns {String} encoded function name
     */
    encodeFunctionSignature(functionName) {
        if (isObject(functionName)) {
            functionName = this.utils.jsonInterfaceMethodToString(functionName);
        }

        return this.utils.keccak256(functionName).slice(0, 10);
    }

    /**
     * Encodes the function name to its ABI representation, which are the first 4 bytes of the keccak256 of the function name including  types.
     *
     * @method encodeEventSignature
     *
     * @param {String|Object} functionName
     *
     * @returns {String} encoded function name
     */
    encodeEventSignature(functionName) {
        if (isObject(functionName)) {
            functionName = this.utils.jsonInterfaceMethodToString(functionName);
        }

        return this.utils.keccak256(functionName);
    }

    /**
     * Should be used to encode plain param
     *
     * @method encodeParameter
     *
     * @param {String} type
     * @param {Object} param
     *
     * @returns {String} encoded plain param
     */
    encodeParameter(type, param) {
        return this.encodeParameters([type], [param]);
    }

    /**
     * Should be used to encode list of params
     *
     * @method encodeParameters
     *
     * @param {Array} types
     * @param {Array} params
     *
     * @returns {String} encoded list of params
     */
    encodeParameters(types, params) {
        return this.ethersAbiCoder.encode(types, params);
    }

    /**
     * Encodes a function call from its json interface and parameters.
     *
     * @method encodeFunctionCall
     *
     * @param {Object} jsonInterface
     * @param {Array} params
     *
     * @returns {String} The encoded ABI for this function call
     */
    encodeFunctionCall(jsonInterface, params) {
        return (
            this.encodeFunctionSignature(jsonInterface) +
            this.encodeParameters(jsonInterface.inputs, params).replace('0x', '')
        );
    }

    /**
     * Should be used to decode bytes to plain param
     *
     * @method decodeParameter
     *
     * @param {String} type
     * @param {String} bytes
     *
     * @returns {Object} plain param
     */
    decodeParameter(type, bytes) {
        return this.decodeParameters([type], bytes)[0];
    }

    /**
     * Should be used to decode list of params
     *
     * @method decodeParameter
     *
     * @param {Array<String|Object>|Object} outputs
     * @param {String} bytes
     *
     * @returns {Object} Object with named and indexed properties of the returnValues
     */
    decodeParameters(outputs, bytes) {
        if (isArray(outputs) && outputs.length === 0) {
            throw new Error('Empty outputs array given!');
        }

        if (!bytes || bytes === '0x' || bytes === '0X') {
            throw new Error(`Invalid bytes string given: ${bytes}`);
        }

        const result = this.ethersAbiCoder.decode(outputs, bytes);
        let returnValues = {};
        let decodedValue;

        if (isArray(result)) {
            if (outputs.length > 1) {
                outputs.forEach((output, i) => {
                    decodedValue = result[i];

                    if (decodedValue === '0x') {
                        decodedValue = null;
                    }

                    returnValues[i] = decodedValue;

                    if (isObject(output) && output.name) {
                        returnValues[output.name] = decodedValue;
                    }
                });

                return returnValues;
            }

            return result;
        }

        if (isObject(outputs[0]) && outputs[0].name) {
            returnValues[outputs[0].name] = result;
        }

        returnValues[0] = result;

        return returnValues;
    }

    /**
     * Decodes events non- and indexed parameters.
     *
     * @method decodeLog
     *
     * @param {Array} inputs
     * @param {String} data
     * @param {Array} topics
     *
     * @returns {Object} Object with named and indexed properties of the returnValues
     */
    decodeLog(inputs, data = '', topics) {
        const returnValues = {};
        let topicCount = 0;
        let value;
        let nonIndexedInputKeys = [];
        let nonIndexedInputItems = [];

        if (!isArray(topics)) {
            topics = [topics];
        }

        inputs.forEach((input, i) => {
            if (input.indexed) {
                if (input.type === 'string') {
                    return;
                }

                value = topics[topicCount];

                if (this.isStaticType(input.type)) {
                    value = this.decodeParameter(input.type, topics[topicCount]);
                }

                returnValues[i] = value;
                returnValues[input.name] = value;
                topicCount++;

                return;
            }

            nonIndexedInputKeys.push(i);
            nonIndexedInputItems.push(input);
        });

        if (data) {
            let values = this.decodeParameters(nonIndexedInputItems, data);

            let decodedValue;
            nonIndexedInputKeys.forEach((itemKey, index) => {
                decodedValue = values[index];

                returnValues[itemKey] = decodedValue;
                returnValues[nonIndexedInputItems[index].name] = decodedValue;
            });
        }

        return returnValues;
    }

    /**
     * Checks if a given type string is a static solidity type
     *
     * @method isStaticType
     *
     * @param {String} type
     *
     * @returns {Boolean}
     */
    isStaticType(type) {
        if (type === 'bytes') {
            return false;
        }

        if (type === 'string') {
            return false;
        }

        if (type.indexOf('[') && type.slice(type.indexOf('[')).length === 2) {
            return false;
        }

        return true;
    }
}

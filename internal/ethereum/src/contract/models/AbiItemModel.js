/**
 * @file AbiItemModel.js
 * @author Samuel Furter
 * @date 2020
 */

import isArray from 'lodash/isArray';

export default class AbiItemModel {
    /**
     * @param {Object} abiItem
     *
     * @constructor
     */
    constructor(abiItem) {
        this.abiItem = abiItem;
        this.signature = this.abiItem.signature;
        this.name = this.abiItem.name;
        this.payable = this.abiItem.payable;
        this.anonymous = this.abiItem.anonymous;
        this.contractMethodParameters = [];
    }

    /**
     * TODO: rename getInputLength to getInputsLength
     * Returns the input length of the abiItem
     *
     * @method getInputLength
     *
     * @returns {Number}
     */
    getInputLength() {
        if (isArray(this.abiItem.inputs)) {
            return this.abiItem.inputs.length;
        }

        return 0;
    }

    /**
     * TODO: Refactor to es6 accessor
     * Returns all inputs of the abi item
     *
     * @method getInputs
     *
     * @returns {Array}
     */
    getInputs() {
        if (isArray(this.abiItem.inputs)) {
            return this.abiItem.inputs;
        }

        return [];
    }

    /**
     * TODO: Refactor to es6 accessor
     * Returns all outputs of the abi item
     *
     * @method getOutputs
     *
     * @returns {Array}
     */
    getOutputs() {
        if (isArray(this.abiItem.outputs)) {
            return this.abiItem.outputs;
        }

        return [];
    }

    /**
     * Returns the indexed input of this abiItem
     *
     * @returns {Array}
     */
    getIndexedInputs() {
        return this.getInputs().filter((input) => {
            return input.indexed === true;
        });
    }

    /**
     * Checks the type of this abiItem
     *
     * @method isOfType
     *
     * @returns {Boolean}
     */
    isOfType(type) {
        return this.abiItem.type === type;
    }
}


/**
 * @file MethodOptionsValidator.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import SendContractMethod from '../methods/SendContractMethod';

export default class MethodOptionsValidator {
    /**
     * @param {Utils} utils
     *
     * @constructor
     */
    constructor(utils) {
        this.utils = utils;
    }

    /**
     * Validates the options object for the RPC-Method call
     *
     * @method validate
     *
     * @param {AbiItemModel} abiItemModel
     * @param {Method} method
     *
     * @returns {Error|Boolean}
     */
    validate(abiItemModel, method) {
        if (!this.isToSet(abiItemModel, method)) {
            throw new Error("This contract object doesn't have address set yet, please set an address first.");
        }

        if (!this.isFromSet(method) && method instanceof SendContractMethod) {
            throw new Error('No valid "from" address specified in neither the given options, nor the default options.');
        }

        if (!this.isValueValid(abiItemModel, method)) {
            throw new Error('Can not send value to non-payable contract method or constructor');
        }

        return true;
    }

    /**
     * Checks if the property to is set in the options object
     *
     * @method isToSet
     *
     * @param {AbiItemModel} abiItemModel
     * @param {Method} method
     *
     * @returns {Boolean}
     */
    isToSet(abiItemModel, method) {
        if (abiItemModel.isOfType('constructor')) {
            return true;
        }

        return this.utils.isAddress(method.parameters[0].to);
    }

    /**
     * Checks if the property from of the options object is set and a valid address
     *
     * @method isFromSet
     *
     * @param {Method} method
     *
     * @returns {Boolean}
     */
    isFromSet(method) {
        return this.utils.isAddress(method.parameters[0].from);
    }

    /**
     * Checks the value and payable property are having valid values.
     *
     * @method isValueValid
     *
     * @param {AbiItemModel} abiItemModel
     * @param {Method} method
     *
     * @returns {Boolean}
     */
    isValueValid(abiItemModel, method) {
        return abiItemModel.payable || (!abiItemModel.payable && !method.parameters[0].value);
    }
}


/**
 * @file EventOptionsMapper.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import isArray from 'lodash/isArray';

export default class EventOptionsMapper {
    /**
     * @param {Object} formatters
     * @param {EventFilterEncoder} eventFilterEncoder
     *
     * @constructor
     */
    constructor(formatters, eventFilterEncoder) {
        this.formatters = formatters;
        this.eventFilterEncoder = eventFilterEncoder;
    }

    /**
     * @param {AbiItemModel} abiItemModel
     * @param {Contract} contract
     * @param {Object} options
     *
     * @returns {Object}
     */
    map(abiItemModel, contract, options) {
        if (!options) {
            options = {};
        }

        if (!isArray(options.topics)) {
            options.topics = [];
        }

        if (typeof options.fromBlock !== 'undefined') {
            options.fromBlock = this.formatters.inputBlockNumberFormatter(options.fromBlock);
        } else if (contract.defaultBlock !== null) {
            options.fromBlock = contract.defaultBlock;
        }

        if (typeof options.toBlock !== 'undefined') {
            options.toBlock = this.formatters.inputBlockNumberFormatter(options.toBlock);
        }

        if (typeof options.filter !== 'undefined') {
            options.topics = options.topics.concat(this.eventFilterEncoder.encode(abiItemModel, options.filter));
            delete options.filter;
        }

        if (!abiItemModel.anonymous) {
            options.topics.unshift(abiItemModel.signature);
        }

        if (!options.address) {
            options.address = contract.address;
        }

        return options;
    }
}

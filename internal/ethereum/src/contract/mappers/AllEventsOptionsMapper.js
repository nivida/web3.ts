
/**
 * @file AllEventsOptionsMapper.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import isArray from 'lodash/isArray';

// TODO: Remove code duplication and create a AbstractEventsOptionsMapper
export default class AllEventsOptionsMapper {
    /**
     * @param {Object} formatters
     * @param {AllEventsFilterEncoder} allEventsFilterEncoder
     *
     * @constructor
     */
    constructor(formatters, allEventsFilterEncoder) {
        this.formatters = formatters;
        this.allEventsFilterEncoder = allEventsFilterEncoder;
    }

    /**
     * @param {AbiModel} abiModel
     * @param {Contract} contract
     * @param {Object} options
     *
     * @returns {Object}
     */
    map(abiModel, contract, options) {
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
            options.topics = options.topics.concat(this.allEventsFilterEncoder.encode(abiModel, options.filter));
            delete options.filter;
        }

        if (!options.address) {
            options.address = contract.address;
        }

        return options;
    }
}

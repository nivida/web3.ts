/**
 * @file LogOptions.js
 * @author Samuel Furter
 * @date 2020
 */

import {isArray} from 'lodash';
import Address from './Address';
import BlockNumber from './BlockNumber';
import Hex from "../../../../core/src/utility/Hex";

export default class LogOptions {
    /**
     * @param {Object} options
     *
     * @constructor
     */
    constructor(options) {
        this.properties = options;

        this.fromBlock = options.fromBlock;
        this.toBlock = options.toBlock;
        this.topics = options.topics;
        this.address = options.address;
    }

    /**
     * Getter for the fromBlock property
     *
     * @property fromBlock
     *
     * @returns {String}
     */
    get fromBlock() {
        return this.properties.fromBlock;
    }

    /**
     * Setter for the fromBlock property
     *
     * @property fromBlock
     *
     * @param {any} fromBlock
     */
    set fromBlock(fromBlock) {
        if (fromBlock) {
            this.properties.fromBlock = new BlockNumber(fromBlock).toString();
        }
    }

    /**
     * Getter for the toBlock property
     *
     * @property toBlock
     *
     * @returns {String}
     */
    get toBlock() {
        return this.properties.toBlock;
    }

    /**
     * Getter for the toBlock property
     *
     * @property toBlock
     *
     * @param {String} toBlock
     */
    set toBlock(toBlock) {
        if (toBlock) {
            this.properties.toBlock = new BlockNumber(toBlock).toString();
        }
    }

    /**
     * Getter for the topics property.
     *
     * @property topics
     *
     * @returns {Array<String>}
     */
    get topics() {
        return this.properties.topics;
    }

    /**
     * Setter for the topics property.
     *
     * @property topics
     *
     * @param {any} topics
     */
    set topics(topics) {
        // make sure topics, get converted to hex
        if (isArray(topics)) {
            this.properties.topics = topics.map((topic) => {
                if (isArray(topic)) {
                    return topic.map(this.toTopic);
                }

                return this.toTopic(topic);
            });

            return;
        }

        this.properties.topics = [];
    }

    /**
     * Getter for the address property.
     *
     * @property address
     *
     * @returns {String}
     */
    get address() {
        return this.properties.address;
    }

    /**
     * Setter for the address property.
     *
     * @property address
     *
     * @param {String} address
     */
    set address(address) {
        if (address) {
            if (isArray(address)) {
                this.properties.address = address.map((addr) => {
                    return new Address(addr).toString();
                });

                return;
            }

            this.properties.address = new Address(address).toString();
        }
    }

    /**
     * Setter for the blockHash property.
     *
     * @property blockHash
     *
     * @param {String} blockHash
     */
    set blockHash(blockHash) {
        this.properties.blockHash = blockHash;
    }

    /**
     * Getter for the blockHash property.
     *
     * @property blockHash
     *
     * @returns {String}
     */
    get blockHash() {
        return this.properties.blockHash;
    }

    /**
     * Converts the given topic to a hex string
     *
     * @method toTopic
     *
     * @param {string} properties
     *
     * @returns {string}
     */
    toTopic(properties) {
        if (properties === null || typeof properties === 'undefined') {
            return null;
        }

        properties = String(properties);

        if (properties.indexOf('0x') === 0) {
            return properties;
        }

        return Hex.fromUTF8(properties).toString();
    }
}


/**
 * @file ModuleOptions.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Address from './Address';
import BlockNumber from './BlockNumber';

export default class ModuleOptions {
    /**
     * @param {Object} options
     *
     * @constructor
     */
    constructor(options) {
        this.properties = options;

        if (options.defaultAccount) {
            this.defaultAccount = options.defaultAccount;
        }

        if (options.defaultBlock) {
            this.defaultBlock = options.defaultBlock;
        }
    }

    /**
     * Getter for the defaultBlock property
     *
     * @property defaultBlock
     *
     * @returns {String|Number}
     */
    get defaultBlock() {
        if (this.properties.defaultBlock) {
            return this.properties.defaultBlock;
        }

        return 'latest';
    }

    /**
     * Setter for the defaultAccount property
     *
     * @property defaultBlock
     *
     * @param {String|Number} block
     */
    set defaultBlock(block) {
        this.properties.defaultBlock = new BlockNumber(block).toString();
    }

    /**
     * Getter for the defaultAccount property
     *
     * @property defaultAccount
     *
     * @returns {null|String}
     */
    get defaultAccount() {
        if (this.properties.defaultAccount) {
            return this.properties.defaultAccount;
        }

        return null;
    }

    /**
     * Sets the defaultAccount of the current object
     *
     * @property defaultAccount
     *
     * @param {String} address
     */
    set defaultAccount(address) {
        this.properties.defaultAccount = new Address(address).toChecksum();
    }

    /**
     * Getter for the transactionBlockTimeout property
     *
     * @property transactionBlockTimeout
     *
     * @returns {Number}
     */
    get transactionBlockTimeout() {
        if (this.properties.transactionBlockTimeout || this.properties.transactionBlockTimeout === 0) {
            return this.properties.transactionBlockTimeout;
        }

        return 50;
    }

    /**
     * Setter for the transactionBlockTimeout property
     *
     * @property transactionBlockTimeout
     *
     * @param {Number} transactionBlockTimeout
     */
    set transactionBlockTimeout(transactionBlockTimeout) {
        this.properties.transactionBlockTimeout = transactionBlockTimeout;
    }

    /**
     * Getter for the transactionConfirmationBlocks property
     *
     * @property transactionConfirmationBlocks
     *
     * @returns {Number}
     */
    get transactionConfirmationBlocks() {
        if (this.properties.transactionConfirmationBlocks || this.properties.transactionConfirmationBlocks === 0) {
            return this.properties.transactionConfirmationBlocks;
        }

        return 0;
    }

    /**
     * Setter for the transactionConfirmationBlocks property
     *
     * @property transactionConfirmationBlocks
     *
     * @param {Number} transactionConfirmationBlocks
     */
    set transactionConfirmationBlocks(transactionConfirmationBlocks) {
        this.properties.transactionConfirmationBlocks = transactionConfirmationBlocks;
    }

    /**
     * Getter for the transactionPollingTimeout property
     *
     * @property transactionPollingTimeout
     *
     * @returns {Number}
     */
    get transactionPollingTimeout() {
        if (this.properties.transactionPollingTimeout || this.properties.transactionPollingTimeout === 0) {
            return this.properties.transactionPollingTimeout;
        }

        return 750;
    }

    /**
     * Setter for the transactionPollingTimeout property
     *
     * @property transactionPollingTimeout
     *
     * @param {Number} transactionPollingTimeout
     */
    set transactionPollingTimeout(transactionPollingTimeout) {
        this.properties.transactionPollingTimeout = transactionPollingTimeout;
    }

    /**
     * Getter for the defaultGasPrice property
     *
     * @property defaultGasPrice
     *
     * @returns {Number|String}
     */
    get defaultGasPrice() {
        return this.properties.defaultGasPrice;
    }

    /**
     * Setter for the defaultGasPrice property
     *
     * @property defaultGasPrice
     *
     * @param {Number|String} defaultGasPrice
     */
    set defaultGasPrice(defaultGasPrice) {
        this.properties.defaultGasPrice = defaultGasPrice;
    }

    /**
     * Getter for the defaultGas property
     *
     * @property defaultGas
     *
     * @returns {Number|String}
     */
    get defaultGas() {
        return this.properties.defaultGas;
    }

    /**
     * Setter for the defaultGas property
     *
     * @property defaultGas
     *
     * @param {Number|String} defaultGas
     */
    set defaultGas(defaultGas) {
        this.properties.defaultGas = defaultGas;
    }
}

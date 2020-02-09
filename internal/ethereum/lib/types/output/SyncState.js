/**
 * @file SyncState.js
 * @author Samuel Furter
 * @date 2020
 */

import Hex from "../../../../core/src/utility/Hex";

export default class SyncState {
    /**
     * @param {Object} syncState
     *
     * @constructor
     */
    constructor(syncState) {
        this.properties = syncState;

        this.startingBlock = syncState.startingBlock;
        this.currentBlock = syncState.currentBlock;
        this.highestBlock = syncState.highestBlock;
        this.knownStates = syncState.knownStates;
        this.pulledStates = syncState.pulledStates;
    }

    /**
     * Getter for the startingBlock property.
     *
     * @property startingBlock
     *
     * @returns {Number}
     */
    get startingBlock() {
        return this.properties.startingBlock;
    }

    /**
     * Setter for the startingBlock property.
     *
     * @property startingBlock
     *
     * @param {String} startingBlock
     */
    set startingBlock(startingBlock) {
        this.properties.startingBlock = new Hex(startingBlock).toNumber();
    }

    /**
     * Getter for the currentBlock property.
     *
     * @property currentBlock
     *
     * @returns {String}
     */
    get currentBlock() {
        return this.properties.currentBlock;
    }

    /**
     * Setter for the currentBlock property.
     *
     * @property currentBlock
     *
     * @param {String} currentBlock
     */
    set currentBlock(currentBlock) {
        this.properties.currentBlock = new Hex(currentBlock).toNumber();
    }

    /**
     * Getter for the highestBlock property.
     *
     * @property highestBlock
     *
     * @returns {Number}
     */
    get highestBlock() {
        return this.properties.highestBlock;
    }

    /**
     * Setter for the highestBlock property.
     *
     * @property highestBlock
     *
     * @param {String} highestBlock
     */
    set highestBlock(highestBlock) {
        this.properties.highestBlock = new Hex(highestBlock).toNumber();
    }

    /**
     * Getter for the knownStates property.
     *
     * @property knownStates
     *
     * @returns {Number}
     */
    get knownStates() {
        return this.properties.knownStates;
    }

    /**
     * Setter for the knownStates property.
     *
     * @property knownStates
     *
     * @param {String} knownStates
     */
    set knownStates(knownStates) {
        if (knownStates) {
            this.properties.knownStates = new Hex(knownStates).toNumber();
        }
    }

    /**
     * Getter for the pulledStates property.
     *
     * @property pulledStates
     *
     * @returns {Number}
     */
    get pulledStates() {
        return this.properties.pulledStates;
    }

    /**
     * Setter for the pulledStates property.
     *
     * @property pulledStates
     *
     * @param {String} pulledStates
     */
    set pulledStates(pulledStates) {
        if (pulledStates) {
            this.properties.pulledStates = new Hex(pulledStates).toNumber();
        }
    }
}

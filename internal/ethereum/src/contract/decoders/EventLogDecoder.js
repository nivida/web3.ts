
/**
 * @file EventLogDecoder.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

export default class EventLogDecoder {
    /**
     * @param {AbiCoder} abiCoder
     *
     * @constructor
     */
    constructor(abiCoder) {
        this.abiCoder = abiCoder;
    }

    /**
     * Decodes the event subscription response
     *
     * @method decode
     *
     * @param {AbiItemModel} abiItemModel
     * @param {Object} response
     *
     * @returns {Object}
     */
    decode(abiItemModel, response) {
        let argumentTopics = response.topics;

        if (!abiItemModel.anonymous) {
            argumentTopics = response.topics.slice(1);
        }

        if (response.data === '0x') {
            response.data = null;
        }

        response.returnValues = this.abiCoder.decodeLog(abiItemModel.getInputs(), response.data, argumentTopics);
        response.event = abiItemModel.name;
        response.signature = abiItemModel.signature;
        response.raw = {
            data: response.data,
            topics: response.topics
        };

        if (abiItemModel.anonymous || !response.topics[0]) {
            response.signature = null;
        }

        delete response.data;
        delete response.topics;

        return response;
    }
}

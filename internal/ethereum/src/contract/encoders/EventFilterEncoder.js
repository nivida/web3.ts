
/**
 * @file EventFilterEncoder.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import isArray from 'lodash/isArray';

export default class EventFilterEncoder {
    /**
     * @param {AbiCoder} abiCoder
     *
     * @constructor
     */
    constructor(abiCoder) {
        this.abiCoder = abiCoder;
    }

    /**
     * Creates encoded topics from filter option of an event.
     *
     * @param {AbiItemModel} abiItemModel
     * @param {*} filter
     *
     * @returns {Array}
     */
    encode(abiItemModel, filter) {
        let topics = [];

        abiItemModel.getIndexedInputs().forEach((input) => {
            if (filter[input.name]) {
                let filterItem = filter[input.name];

                if (isArray(filterItem)) {
                    filterItem = filterItem.map((item) => {
                        return this.abiCoder.encodeParameter(input.type, item);
                    });

                    topics.push(filterItem);

                    return;
                }

                topics.push(this.abiCoder.encodeParameter(input.type, filterItem));

                return;
            }

            topics.push(null);
        });

        return topics;
    }
}

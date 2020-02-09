
/**
 * @file AllEventsFilterEncoder.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import EventFilterEncoder from './EventFilterEncoder';

export default class AllEventsFilterEncoder extends EventFilterEncoder {
    /**
     * Creates encoded topics from filter option of an event.
     *
     * @param {AbiModel} abiModel
     * @param {*} filter
     *
     * @returns {Array}
     */
    encode(abiModel, filter) {
        const events = abiModel.getEvents();
        let topics = [];

        Object.keys(events).forEach((key) => {
            topics.push(super.encode(events[key], filter));
        });

        return topics;
    }
}

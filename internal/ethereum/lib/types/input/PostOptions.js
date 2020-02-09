
/**
 * @file PostOptions.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @author Marek Kotewicz <marek@parity.io>
 * @date 2019
 */

import {isArray} from 'lodash';
import Hex from "../../../../core/src/utility/Hex";

export default class PostOptions {
    /**
     * @param {Object} options
     *
     * @constructor
     */
    constructor(options) {
        this.properties = options;

        this.ttl = options.ttl;
        this.workToProve = options.workToProve;
        this.priority = options.priority;
        this.topics = options.topics;
    }

    /**
     * Getter for the ttl property.
     *
     * @property ttl
     *
     * @returns {Number}
     */
    get ttl() {
        return this.properties.ttl;
    }

    /**
     * Setter for the ttl property.
     *
     * @property ttl
     *
     * @param {Number} ttl
     */
    set ttl(ttl) {
        if (ttl || ttl === 0) {
            this.properties.ttl = Hex.fromNumber(ttl).toString();
        }
    }

    /**
     * Getter for the workToProve property.
     *
     * @property workToProve
     *
     * @returns {String}
     */
    get workToProve() {
        return this.properties.workToProve;
    }

    /**
     * Setter for the workToProve property.
     *
     * @property workToProve
     *
     * @param {String} workToProve
     */
    set workToProve(workToProve) {
        if (workToProve || workToProve === 0) {
            this.properties.workToProve = Hex.fromNumber(workToProve).toString();
        }
    }

    /**
     * Getter for the priority property.
     *
     * @property priority
     *
     * @returns {String}
     */
    get priority() {
        return this.properties.priority;
    }

    /**
     * Setter for the priority property.
     *
     * @property priority
     *
     * @param {Number} priority
     */
    set priority(priority) {
        if (priority || priority === 0) {
            this.properties.priority = Hex.fromNumber(this.properties.priority).toString();
        }
    }

    /**
     * Getter for the topics array.
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
        if (!isArray(topics)) {
            if (topics) {
                this.properties.topics = [topics];

                return;
            }

            this.properties.topics = [];
        }

        // format the following options
        this.properties.topics = this.properties.topics.map((topic) => {
            // convert only if not hex
            if (topic.startsWith('0x')) {
                return topic;
            }

            return Hex.fromUTF8(topic).toString();
        });
    }
}

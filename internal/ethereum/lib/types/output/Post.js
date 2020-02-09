/**
 * @file Post.js
 * @author Samuel Furter
 * @date 2020
 */

import Hex from "../../../../core/src/utility/Hex";

export default class Post {
    /**
     * @param {Object} post
     *
     * @constructor
     */
    constructor(post) {
        this.properties = post;

        this.expiry = post.expiry;
        this.sent = post.sent;
        this.ttl = post.ttl;
        this.workProved = post.workProved;
        this.topics = post.topics;
        this.payload = post.payload;
    }

    /**
     * Getter for the expiry property
     *
     * @property expiry
     *
     * @returns {Number}
     */
    get expiry() {
        return this.properties.expiry;
    }

    /**
     * Setter for the expiry property
     *
     * @property expiry
     *
     * @param {String} expiry
     */
    set expiry(expiry) {
        this.properties.expiry = new Hex(expiry).toNumber();
    }

    /**
     * Getter for the sent property
     *
     * @property sent
     *
     * @returns {Number}
     */
    get sent() {
        return this.properties.sent;
    }

    /**
     * Setter for the sent property
     *
     * @property sent
     *
     * @param {String} sent
     */
    set sent(sent) {
        this.properties.sent = new Hex(sent).toNumber();
    }

    /**
     * Getter for the ttl property
     *
     * @property ttl
     *
     * @returns {Number}
     */
    get ttl() {
        return this.properties.ttl;
    }

    /**
     * Setter for the ttl property
     *
     * @property ttl
     *
     * @param {String} ttl
     */
    set ttl(ttl) {
        this.properties.ttl = new Hex(ttl).toNumber();
    }

    /**
     * Getter for the workProved property
     *
     * @property workProved
     *
     * @returns {Number}
     */
    get workProved() {
        return this.properties.workProved;
    }

    /**
     * Setter for the workProved property
     *
     * @property workProved
     *
     * @param {String} workProved
     */
    set workProved(workProved) {
        this.properties.workProved = new Hex(workProved).toNumber();
    }

    /**
     * Getter for the topics property
     *
     * @property topics
     *
     * @returns {Number}
     */
    get topics() {
        return this.properties.topics;
    }

    /**
     * Setter for the topics property
     *
     * @property topics
     *
     * @param {Array<String>} topics
     */
    set topics(topics) {
        if (!topics) {
            this.properties.topics = topics;

            return;
        }

        this.properties.topics = topics.map((topic) => {
            return new Hex(topic).toUTF8();
        });
    }

    /**
     * Getter for the payload property
     *
     * @property payload
     *
     * @returns {Number}
     */
    get payload() {
        return this.properties.payload;
    }

    /**
     * Setter for the payload property.
     *
     * @param {String} payload
     */
    set payload(payload) {
        this.properties.payload = new Hex(payload).toAscii();
    }
}

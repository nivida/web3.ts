
/**
 * @file MessagesSubscription.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Subscription from "../../../core/src/json-rpc/subscriptions/Subscription";

export default class MessagesSubscription extends Subscription {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('shh_subscribe', 'messages', config);
    }
}

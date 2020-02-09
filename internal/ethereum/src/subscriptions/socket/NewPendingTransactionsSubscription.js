/**
 * @file NewHeadSubscription.js
 * @authors: Samuel Furter
 * @date 2020
 */

import SocketSubscription from "../../../../core/src/json-rpc/subscriptions/socket/SocketSubscription";

export default class NewPendingTransactionsSubscription extends SocketSubscription {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('eth_subscribe', 'newPendingTransactions', config);
    }
}

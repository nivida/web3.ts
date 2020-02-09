
/**
 * @file NewHeadSubscription.js
 * @authors: Samuel Furter <samuel@ethereum.org>
 * @date 2019
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


/**
 * @file EventLogSubscription.js
 * @authors: Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import {LogSubscription} from 'web3-core-subscriptions';

export default class EventLogSubscription extends LogSubscription {
    /**
     * @param {EthereumConfiguration} config
     * @param {Object} options
     * @param {GetPastLogsMethod} getPastLogsMethod
     * @param {EventLogDecoder} eventLogDecoder
     * @param {AbiItemModel} abiItemModel
     *
     * @constructor
     */
    constructor(config, options, getPastLogsMethod, eventLogDecoder, abiItemModel) {
        super(config, options, getPastLogsMethod);

        this.eventLogDecoder = eventLogDecoder;
        this.abiItemModel = abiItemModel;
    }

    /**
     * This method will be executed on each new subscription item.
     *
     * @method onNewSubscriptionItem
     *
     * @param {*} subscriptionItem
     *
     * @returns {Object}
     */
    onNewSubscriptionItem(subscriptionItem) {
        let log = this.formatters.outputLogFormatter(subscriptionItem);

        if (log.removed) {
            log = this.eventLogDecoder.decode(this.abiItemModel, log);

            this.emit('changed', log);

            return log;
        }

        return this.eventLogDecoder.decode(this.abiItemModel, log);
    }
}

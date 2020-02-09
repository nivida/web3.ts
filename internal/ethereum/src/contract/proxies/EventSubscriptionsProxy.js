
/**
 * @file EventSubscriptionsProxy.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import cloneDeep from 'lodash/cloneDeep';

export default class EventSubscriptionsProxy {
    /**
     * @param {Contract} contract
     * @param {EventSubscriptionFactory} eventSubscriptionFactory
     * @param {EventOptionsMapper} eventOptionsMapper
     * @param {EventLogDecoder} eventLogDecoder
     * @param {AllEventsLogDecoder} allEventsLogDecoder
     * @param {AllEventsOptionsMapper} allEventsOptionsMapper
     *
     * @constructor
     */
    constructor(
        contract,
        eventSubscriptionFactory,
        eventOptionsMapper,
        eventLogDecoder,
        allEventsLogDecoder,
        allEventsOptionsMapper
    ) {
        this.contract = contract;
        this.eventSubscriptionFactory = eventSubscriptionFactory;
        this.eventOptionsMapper = eventOptionsMapper;
        this.eventLogDecoder = eventLogDecoder;
        this.allEventsLogDecoder = allEventsLogDecoder;
        this.allEventsOptionsMapper = allEventsOptionsMapper;

        return new Proxy(this, {
            /**
             * Checks if a contract event exists by the given name and returns the subscription otherwise it throws an error
             *
             * @param {EventSubscriptionsProxy} target
             * @param {String} name
             *
             * @returns {Function|Error}
             */
            get: (target, name) => {
                if (this.contract.abiModel.hasEvent(name)) {
                    return (options, callback) => {
                        return target.subscribe(target.contract.abiModel.getEvent(name), cloneDeep(options), callback);
                    };
                }

                if (name === 'allEvents') {
                    return (options, callback) => {
                        return target.subscribeAll(cloneDeep(options), callback);
                    };
                }

                return Reflect.get(target, name);
            }
        });
    }

    /**
     * Returns an subscription on the given event
     *
     * @param {AbiItemModel} abiItemModel
     * @param {Object} options
     * @param {Function} callback
     *
     * @callback callback callback(error, result)
     * @returns {Subscription|PromiEvent}
     */
    subscribe(abiItemModel, options, callback) {
        if (options && !isUndefined(options.filter) && !isUndefined(options.topics)) {
            this.handleValidationError(
                'Invalid subscription options: Only filter or topics are allowed and not both',
                callback
            );

            return;
        }

        return this.eventSubscriptionFactory
            .createEventLogSubscription(
                this.eventLogDecoder,
                this.contract,
                this.eventOptionsMapper.map(abiItemModel, this.contract, options),
                abiItemModel
            )
            .subscribe(callback);
    }

    /**
     * Returns an subscription for all contract events
     *
     * @method subscribeAll
     *
     * @param {Object} options
     * @param {Function} callback
     *
     * @callback callback callback(error, result)
     * @returns {Subscription|PromiEvent}
     */
    subscribeAll(options, callback) {
        if (options && !isUndefined(options.filter) && !isUndefined(options.topics)) {
            this.handleValidationError(
                'Invalid subscription options: Only filter or topics are allowed and not both',
                callback
            );

            return;
        }

        return this.eventSubscriptionFactory
            .createAllEventsLogSubscription(
                this.allEventsLogDecoder,
                this.contract,
                this.allEventsOptionsMapper.map(this.contract.abiModel, this.contract, options)
            )
            .subscribe(callback);
    }

    /**
     * Creates an promiEvent and rejects it with an error
     *
     * @method handleValidationError
     *
     * @param {String} errorMessage
     * @param {Function} callback
     *
     * @callback callback callback(error, result)
     */
    handleValidationError(errorMessage, callback) {
        const error = new Error(errorMessage);

        if (isFunction(callback)) {
            callback(error, null);
        }

        throw error;
    }
}

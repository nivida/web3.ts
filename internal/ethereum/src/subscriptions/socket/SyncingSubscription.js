/**
 * @file SyncingSubscription.js
 * @authors: Samuel Furter
 * @date 2020
 */

import {Observable} from 'rxjs';
import SocketSubscription from "../../../../core/src/json-rpc/subscriptions/socket/SocketSubscription";

export default class SyncingSubscription extends SocketSubscription {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('eth_subscribe', 'syncing', config);
        this.isSyncing = null;
    }

    /**
     * Sends the JSON-RPC request and returns a RxJs Subscription object
     *
     * @method subscribe
     *
     * @param {Function} observerOrNext
     * @param {Function} error
     * @param {Function} complete
     *
     * @returns {Subscription}
     */
    subscribe(observerOrNext, error, complete) {
        return new Observable((observer) => {
            return super.subscribe({
                next(sync) {
                    // TODO: Create operator for the 'changed' event and return consistent value types here!
                    if (typeof sync !== 'boolean') {
                        const isSyncing = sync.syncing;

                        if (this.isSyncing === null) {
                            this.isSyncing = isSyncing;
                            // this.emit('changed', this.isSyncing);

                            return sync.status;
                        }

                        if (this.isSyncing !== isSyncing) {
                            this.isSyncing = isSyncing;
                            // this.emit('changed', this.isSyncing);
                        }

                        return sync.status;
                    }

                    this.isSyncing = sync;
                    // this.emit('changed', sync);

                    observer.next(sync);
                },
                error(error) {
                    observer.error(error);
                },
                complete() {
                    observer.complete();
                }
            });
        })
    }
}

/**
 * @file LogSubscription.js
 * @authors: Samuel Furter
 * @date 2020
 */

import {Observable} from 'rxjs';
import LogOptions from "../../../lib/types/input/LogOptions";
import SocketSubscription from "../../../../core/src/json-rpc/subscriptions/socket/SocketSubscription";
import Log from "../../../lib/types/output/Log";

export default class LogSubscription extends SocketSubscription {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_subscribe', 'logs', config, [new LogOptions(parameters[0])]);
    }

    /**
     * TODO: create operator for this: log.removed ? this.emit('changed', log);
     *
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
                next(log) {
                    observer.next(new Log(log))
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

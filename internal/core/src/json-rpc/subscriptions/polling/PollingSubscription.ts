/**
 * @file PollingSubscription
 * @authors: Samuel Furter
 * @date 2020
 */

import {Observable, interval, PartialObserver, Subscription, Subscriber} from 'rxjs';
import Method from '../../methods/Method';
import JsonRpcConfiguration from "../../config/JsonRpcConfiguration";

export default class PollingSubscription<T> extends Observable<T> {
    /**
     * @param {JsonRpcConfiguration} config
     * @param {Method} method
     *
     * @constructor
     */
    public constructor(public config: JsonRpcConfiguration, public method: Method<T>) {
        super();
    }

    /**
     * TODO: Remove ts-ignore as soon as RxJs has removed the deprecated method signatures
     * Polls the given Method and returns a RxJs Subscription object
     *
     * @method subscribe
     *
     * @param {Observer|Function} observerOrNext
     * @param {Function} error
     * @param {Function} complete
     *
     * @returns {Subscription}
     */
    // @ts-ignore
    public subscribe(
        observerOrNext?: PartialObserver<T> | ((value: T) => void),
        error?: (error: any) => void,
        complete?: () => void
    ): Subscription {
        // @ts-ignore
        const subscription: Subscriber<T> = super.subscribe(observerOrNext, error, complete);

        const intervalSub = interval(this.config.pollingInterval).subscribe({
            next: async () => {
                subscription.next(await this.method.execute());
            },
            error: (error: Error) => {
                subscription.error(error);
            },
            complete: () => {
                subscription.complete();
            }
        });


        subscription.add(intervalSub.unsubscribe.bind(intervalSub));

        return subscription;
    }
}

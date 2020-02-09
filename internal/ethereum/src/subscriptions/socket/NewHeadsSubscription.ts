/**
 * @file NewHeadsSubscription
 * @authors: Samuel Furter
 * @date 2020
 */

import {PartialObserver, Subscription, Subscriber} from 'rxjs';
import SocketSubscription from "../../../../core/src/json-rpc/subscriptions/socket/SocketSubscription";
import EthereumConfiguration from "../../config/EthereumConfiguration";
import BlockProperties from "../../../lib/types/output/interfaces/block/BlockProperties";
import Block from '../../../lib/types/output/Block';

export default class NewHeadsSubscription extends SocketSubscription<Block> {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    public constructor(config: EthereumConfiguration) {
        super('eth_subscribe', 'newHeads', config);
    }

    /**
     * Sends the JSON-RPC request and returns a RxJs Subscription object
     *
     * @method subscribe
     *
     * @param {Observer|Function} observerOrNext
     * @param {Function} error
     * @param {Function} complete
     *
     * @returns {Subscription}
     */
    public subscribe(
        observerOrNext?: PartialObserver<Block> | ((value: Block) => void),
        error?: (error: any) => void,
        complete?: () => void
    ): Subscription {
        const subscriber: Subscriber<Block> = new Subscriber(observerOrNext, error, complete);

        return super.subscribe({
            next: (blockProperties: BlockProperties): void => {
                subscriber.next(new Block(blockProperties) as unknown as Block);
            },
            error: (error: Error): void => {
                subscriber.error(error);
            },
            complete: (): void => {
                subscriber.complete();
            }
        });
    }
}

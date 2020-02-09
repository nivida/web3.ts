/**
 * @file TransactionConfirmationSubscription
 * @author Samuel Furter
 * @date 2020
 */

import {Subscriber, PartialObserver, Subscription} from "rxjs";
import PollingSubscription from "../../../../core/src/json-rpc/subscriptions/polling/PollingSubscription";
import GetBlockByNumberMethod from "../../methods/eth/block/GetBlockByNumberMethod";
import GetTransactionReceiptMethod from "../../methods/eth/transaction/GetTransactionReceiptMethod";
import EthereumConfiguration from "../../config/EthereumConfiguration";
import TransactionReceipt from "../../../lib/types/output/TransactionReceipt";
import Block from "../../../lib/types/output/Block";

export default class TransactionConfirmationSubscription extends PollingSubscription<TransactionReceipt> {
    /**
     * @param {EthereumConfiguration} config
     * @param {String} txHash
     *
     * @constructor
     */
    constructor(config: EthereumConfiguration, txHash: string) {
        super(config, new GetTransactionReceiptMethod(config, [txHash]));
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
    subscribe(
        observerOrNext?: PartialObserver<TransactionReceipt | Error | undefined> | ((value: TransactionReceipt) => void),
        error?: (error: any) => void,
        complete?: () => void
    ): Subscription {
        let lastBlock: Block;
        const subscriber: Subscriber<TransactionReceipt> = new Subscriber(observerOrNext, error, complete);

        return super.subscribe({
            next: async (receipt: TransactionReceipt): Promise<void> => {
                try {
                    let getBlockByNumber = new GetBlockByNumberMethod(this.config, []);

                    if (receipt && (receipt.blockNumber === 0 || receipt.blockNumber)) {
                        if (lastBlock) {
                            getBlockByNumber.parameters = [lastBlock.number as number + 1];
                            const block = await getBlockByNumber.execute();

                            if (block) {
                                lastBlock = block;

                                subscriber.next(receipt);
                            }
                        } else {
                            getBlockByNumber.parameters = [receipt.blockNumber];
                            lastBlock = await getBlockByNumber.execute();

                            subscriber.next(receipt);
                        }
                    }
                } catch (error) {
                    subscriber.error(error);
                }
            },
            error: (error): void => {
                subscriber.error(error);
            },
            complete: (): void => {
                subscriber.complete();
            }
        });
    }
}
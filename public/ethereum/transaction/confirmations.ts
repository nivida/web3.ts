/**
 * @file confirmations.js
 * @author Samuel Furter
 * @date 2020
 */

import {Observable} from 'rxjs';
import {transactionConfirmations} from "internal/ethereum/src/subscriptions/operators/transactionConfirmations";
import TransactionConfirmationSubscription from "internal/ethereum/src/subscriptions/polling/TransactionConfirmationSubscription";
import NewHeadsSubscription from "internal/ethereum/src/subscriptions/socket/NewHeadsSubscription";
import EthereumConfiguration from "internal/ethereum/src/config/EthereumConfiguration";
import TransactionReceipt from "internal/ethereum/lib/types/output/TransactionReceipt";
import SocketSubscription from "internal/core/src/json-rpc/subscriptions/socket/SocketSubscription";
import PollingSubscription from "internal/core/src/json-rpc/subscriptions/polling/PollingSubscription";
import getConfig from "../../core/config/getConfig";
import ConfigurationTypes from "../../core/config/ConfigurationTypes";

/**
 * Starts a newHeads subscription or polls for the transaction receipt and emits if a valid confirmation happened.
 *
 * @method confirmations
 *
 * @param {String} txHash
 * @param {EthereumConfiguration} config
 *
 * @returns {Observable}
 */
export default function confirmations(
    txHash: string,
    config?: EthereumConfiguration
): SocketSubscription<TransactionReceipt> | PollingSubscription<TransactionReceipt> {
    const mappedConfig = getConfig(ConfigurationTypes.ETHEREUM, config);

    if (mappedConfig.provider.supportsSubscriptions()) {
        return new NewHeadsSubscription(mappedConfig).pipe(
            transactionConfirmations(mappedConfig, txHash)
        ) as SocketSubscription<TransactionReceipt>;
    }

    return new TransactionConfirmationSubscription(mappedConfig, txHash);
}

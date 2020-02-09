/**
 * @file mined.js
 * @author Samuel Furter
 * @date 2020
 */

import confirmations from './confirmations';
import EthereumConfiguration from "internal/ethereum/src/config/EthereumConfiguration";
import TransactionReceipt from "internal/ethereum/lib/types/output/TransactionReceipt";
import getConfig from "../../core/config/getConfig";
import ConfigurationTypes from "../../core/config/ConfigurationTypes";

/**
 * Returns the receipt if the amount of configured confirmations is reached.
 *
 * @method mined
 *
 * @param {String} txHash
 * @param {EthereumConfiguration} config
 *
 * @returns {Promise<TransactionReceipt>}
 */
export default function receipt(
    txHash: string,
    config?: EthereumConfiguration
): Promise<TransactionReceipt> {
    const mappedConfig = getConfig(ConfigurationTypes.ETHEREUM, config);

    return new Promise((resolve, reject) => {
        let counter: number = 0;

        const subscription = confirmations(txHash, mappedConfig).subscribe(
            (confirmation: TransactionReceipt) => {
                if (counter === mappedConfig.transaction.confirmations) {
                    subscription.unsubscribe();
                    resolve(confirmation);
                } else {
                    counter++;
                }
            },
            (error: Error) => {
                reject(error);
            }
        );
    });
}


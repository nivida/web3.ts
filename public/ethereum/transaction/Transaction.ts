
/**
 * @file Transaction.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import TransactionOptionsProperties from "internal/ethereum/lib/types/input/interfaces/TransactionOptionsProperties";
import TransactionReceipt from "internal/ethereum/lib/types/output/TransactionReceipt";
import EthereumConfiguration from "internal/ethereum/src/config/EthereumConfiguration";
import SocketSubscription from "internal/core/src/json-rpc/subscriptions/socket/SocketSubscription";
import PollingSubscription from "internal/core/src/json-rpc/subscriptions/polling/PollingSubscription";
import send from "./send";
import confirmations from "./confirmations";
import receipt from "./receipt";
import getConfig from "../../config/getConfig";
import ConfigurationTypes from "../../config/ConfigurationTypes";

export default class Transaction {
    /**
     * @property config
     */
    public config: EthereumConfiguration;

    /**
     * @property hash
     */
    public hash: string = '';

    /**
     * @param {TransactionOptionsProperties} options
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(
        public options: TransactionOptionsProperties,
        config?: EthereumConfiguration
    ) {
        this.config = getConfig(ConfigurationTypes.ETHEREUM, config);
    }

    /**
     * Executes the transaction and returns itself with the hash property set
     *
     * @returns {Promise<Transaction>}
     */
    async send(): Promise<Transaction> {
        this.hash = await send(this.options, this.config);

        return this;
    }

    /**
     * Resolves with the transaction receipt if the configured amount of confirmations is reached
     *
     * @method mined
     *
     * @returns {Promise<TransactionReceipt>}
     */
    receipt(): Promise<TransactionReceipt> {
        return receipt(this.hash, this.config)
    }

    /**
     * Returns a Observable which does trigger the next listener on each valid confirmation
     *
     * @method confirmations
     *
     * @returns {SocketSubscription<TransactionReceipt> | PollingSubscription<TransactionReceipt>}
     */
    confirmations(): SocketSubscription<TransactionReceipt> | PollingSubscription<TransactionReceipt> {
        return confirmations(this.hash, this.config);
    }
}

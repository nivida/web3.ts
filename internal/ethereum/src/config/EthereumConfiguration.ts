
/**
 * @file EthereumConfiguration.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import JsonRpcConfiguration from "../../../core/src/json-rpc/config/JsonRpcConfiguration";
import Address from "../../lib/types/input/Address.js";
import TransactionConfiguration from "internal/ethereum/lib/config/interfaces/TransactionConfiguration";

export default class EthereumConfiguration extends JsonRpcConfiguration {
    /**
     * @property block
     */
    public block: string | number | undefined;

    /**
     * @property transaction
     */
    public transaction: TransactionConfiguration;

    /**
     * @property _account
     */
    private _account: string | undefined;

    /**
     * @param {Object} options
     * @param {Object} parent
     *
     * @constructor
     */
    public constructor(
        options: any = {},
        parent?: any
    ) {
        super(options, parent);

        this.block = options.block || parent ? parent.block : 'latest';

        const parentTransaction = parent ? parent.transaction : false;

        this.transaction = Object.assign(
            {timeout: 50, confirmations: 0},
            parentTransaction ? Object.assign(parentTransaction, options.transaction) : options.transaction
        );
        this.account = options.account;
    }

    /**
     * Getter for the defaultAccount property
     *
     * @property defaultAccount
     *
     * @returns {null|String}
     */
    public get account() {
        return this._account;
    }

    /**
     * Sets the defaultAccount of the current object
     *
     * @property defaultAccount
     *
     * @param {String} value
     */
    public set account(value) {
        if (value) {
            this._account = Address.toChecksum((value));
        }

        this._account = undefined;
    }

    /**
     * Returns a JSON compatible object
     *
     * @method toJSON
     *
     * @returns {Object}
     */
    public toJSON(): any {
        return {
            account: this.account,
            block: this.block,
            transaction: this.transaction,
            ... super.toJSON()
        }
    }
}

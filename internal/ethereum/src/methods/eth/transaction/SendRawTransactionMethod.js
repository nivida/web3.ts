/**
 * @file SendRawTransactionMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import AbstractTransactionMethod from "../../../../lib/methods/eth/transaction/AbstractTransactionMethod";

export default class SendRawTransactionMethod extends AbstractTransactionMethod {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_sendRawTransaction', 1, config, parameters);
    }
}

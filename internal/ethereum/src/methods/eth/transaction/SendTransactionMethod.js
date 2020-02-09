
/**
 * @file EthSendTransactionMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import AbstractTransactionMethod from "../../../../lib/methods/eth/transaction/AbstractTransactionMethod.js";

export default class SendTransactionMethod extends AbstractTransactionMethod {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_sendTransaction', 1, config, parameters);
    }
}

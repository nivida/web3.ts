
/**
 * @file GetBlockByNumberMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import AbstractGetBlockMethod from "../../../../lib/methods/eth/block/AbstractGetBlockMethod.js";

export default class GetBlockByNumberMethod extends AbstractGetBlockMethod {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_getBlockByNumber', config, parameters);
    }
}

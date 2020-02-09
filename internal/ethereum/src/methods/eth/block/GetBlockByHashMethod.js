/**
 * @file GetBlockByHashMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import AbstractGetBlockMethod from "../../../../lib/methods/eth/block/AbstractGetBlockMethod";

export default class GetBlockByHashMethod extends AbstractGetBlockMethod {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_getBlockByHash', config, parameters);
    }
}

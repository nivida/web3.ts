/**
 * @file GetUncleByBlockNumberAndIndexMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import AbstractGetUncleMethod from "../../../../lib/methods/eth/block/AbstractGetUncleMethod";

export default class GetUncleByBlockNumberAndIndexMethod extends AbstractGetUncleMethod {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_getUncleByBlockNumberAndIndex', config, parameters);
    }
}

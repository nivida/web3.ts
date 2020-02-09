/**
 * @file ImportRawKeyMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from "../../../../core/src/json-rpc/methods/Method";

export default class ImportRawKeyMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('personal_importRawKey', 2, config, parameters);
    }
}

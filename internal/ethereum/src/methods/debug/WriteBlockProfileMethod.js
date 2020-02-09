/**
 * @file WriteBlockProfileMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2020
 */

import Method from "../../../../core/src/json-rpc/methods/Method";

export default class WriteBlockProfileMethod extends Method {
    /**
     * @param {Array} parameters
     * @param {Configuration} config
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('debug_writeBlockProfile', 1, config, parameters);
    }
}

/**
 * @file ProviderError.ts
 * @author Samuel Furter
 * @date 2020
 */

import JsonRpcError from "./JsonRpcError";

export default class ProviderError extends JsonRpcError {
    /**
     * @property prefix
     */
    protected prefix: string = 'PROVIDER ERROR: ';

    /**
     * @param {String} message
     * @param {String} host
     * @param {Object} payload
     * @param {any} response
     *
     * @constructor
     */
    public constructor(message: string, host: string, payload?: object, response?: any) {
        super(message, host, payload, response);
    }
}

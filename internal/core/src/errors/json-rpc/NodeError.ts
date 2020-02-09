/**
 * @file NodeError.ts
 * @author Samuel Furter
 * @date 2020
 */

import JsonRpcError from "./JsonRpcError";
import JsonRpcPayload from "../../../lib/json-rpc/providers/interfaces/JsonRpcPayload";
import JsonRpcResponse from "../../../lib/json-rpc/providers/interfaces/JsonRpcResponse";

export default class NodeError extends JsonRpcError {
    /**
     * @property prefix
     */
    protected prefix: string = 'NODE ERROR: ';

    /**
     * @param {String} message
     * @param {String} host
     * @param {JsonRpcPayload} payload
     * @param {JsonRpcResponse} response
     *
     * @constructor
     */
    public constructor(message: string, host: string, payload?: JsonRpcPayload, response?: JsonRpcResponse) {
        super(message, host, payload, response);
    }
}

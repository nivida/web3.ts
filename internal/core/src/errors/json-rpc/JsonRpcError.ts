/**
 * @file JsonRpcError.js
 * @author Samuel Furter
 * @date 2020
 */

export default class JsonRpcError extends Error {
    /**
     * @property prefix
     */
    protected prefix: string = '';

    /**
     * @property host
     */
    public host: string;

    /**
     * TODO: Create payload interface
     *
     * @property payload
     */
    public payload: object | undefined;

    /**
     * @property response
     */
    public response: any;

    /**
     * @param {String} message
     * @param {String} host
     * @param {Object} payload
     * @param {any} response
     *
     * @constructor
     */
    public constructor(message: string, host: string, payload?: object, response?: any) {
        super();
        this.message = this.prefix + message;
        this.host = host;
        this.payload = payload;
        this.response = response;
    }
}

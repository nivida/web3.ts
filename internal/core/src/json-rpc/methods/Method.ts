/**
 * @file Method
 * @author Samuel Furter
 * @date 2020
 */

import JsonRpcConfiguration from "../config/JsonRpcConfiguration";

export default class Method<T> {
    /**
     * @param {String} rpcMethod
     * @param {Number} parametersAmount
     * @param {JsonRpcConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    public constructor(
        public rpcMethod: string,
        public parametersAmount: number,
        public config: JsonRpcConfiguration,
        public parameters: any[]
    ) {
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @returns {Promise<void>}
     */
    public async beforeExecution(): Promise<void> {}

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {any} response
     *
     * @returns {any}
     */
    public async afterExecution(response: any): Promise<T> {
        return response;
    }

    /**
     * Sends a JSON-RPC call request
     *
     * @method execute
     *
     * @returns {Promise<T>}
     */
    public async execute(): Promise<T> {
        await this.beforeExecution();

        if (this.parameters.length !== this.parametersAmount) {
            throw new Error(
                `Invalid Arguments length: expected: ${this.parametersAmount}, given: ${this.parameters.length}`
            );
        }

        let response = await this.config.provider.send(this.rpcMethod, this.parameters);

        return this.afterExecution(response);
    }
}

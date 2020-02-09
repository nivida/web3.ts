
/**
 * @file JsonRpcConfiguration.ts
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import AbstractProvider from "../../../lib/json-rpc/providers/AbstractProvider";
import HttpProvider from "../providers/HttpProvider";
import WebsocketProvider from "../providers/WebsocketProvider";

export default class JsonRpcConfiguration {
    /**
     * @property useDefault
     */
    public useDefault: boolean = true;

    /**
     * @property provider
     */
    public provider: AbstractProvider;

    /**
     * @property pollingInterval
     */
    public pollingInterval: number;

    /**
     * @param {Object} options
     * @param {Object} parent
     *
     * @constructor
     */
    public constructor(options: any = {}, parent?: any) {
        let host: string | undefined;
        let providerOptions;
        let provider;

        if (Array.isArray(options.provider)) {
            host = options.provider[0];
            providerOptions = options.provider[1];
        } else if (typeof options.provider === 'string') {
            host = options.provider;
        }

        if (host) {
            const ProviderConstructor = this.getProviderFromString(host);

            if (ProviderConstructor) {
                provider = new ProviderConstructor(host, providerOptions);
            }
        }

        if (parent && parent.provider instanceof Map) {
            if (host) {
                provider = parent.provider.get(host);
            } else {
                provider = parent.provider.get('default');
            }
        }

        parent = parent || {};

        this.provider = provider || options.provider || parent.provider;
        this.pollingInterval = options.pollingInterval || parent.pollingInterval || 1000;
    }

    /**
     * @method getProviderFromString
     *
     * @param {String} provider
     */
    private getProviderFromString(provider: string) {
        if (/^http(s)?:\/\//i.test(provider)) {
            return HttpProvider;
        }

        if (/^ws(s)?:\/\//i.test(provider)) {
            return WebsocketProvider;
        }

        // if (provider && net) {
        //     return IpcProvider
        // }
    }

    /**
     * Returns a JSON compatible object
     *
     * @method toJSON
     *
     * @returns {Object}
     */
    toJSON(): any {
        return {
            provider: this.provider,
            pollingInterval: this.pollingInterval
        }
    }
}

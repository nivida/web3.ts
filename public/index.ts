
/**
 * @file web3.js
 * @authors: Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Configuration from "./core/config/Configuration";

/**
 * Default configuration
 *
 * @type {Configuration}
 */
let config: Configuration = new Configuration();

export default class web3 {
    /**
     * Getter for the current context
     *
     * @property current
     *
     * @returns {Configuration}
     */
    static get config(): Configuration {
        return config;
    }

    /**
     * Sets the default context of Web3
     *
     * @method init
     *
     * @param {String} name
     * @param {Object} conf
     *
     * @returns {Configuration}
     */
    static init(name: string, conf: any): Configuration {
        config = new Configuration(conf);

        return config;
    }

    // /**
    //  * TODO: update detection
    //  *
    //  * Returns the injected EthereumProvider
    //  *
    //  * @property ethereumProvider
    //  *
    //  * @returns {AbstractProvider}
    //  */
    // static get ethereumProvider(): any {
    //     if (
    //         typeof global.ethereumProvider !== 'undefined' &&
    //         global.ethereumProvider.constructor.name === 'EthereumProvider'
    //     ) {
    //         return global.ethereumProvider;
    //     }
    //
    //     if (typeof global.web3 !== 'undefined' && global.web3.currentProvider) {
    //         return global.web3.currentProvider;
    //     }
    //
    //     return null;
    // }
}

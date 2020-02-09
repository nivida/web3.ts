
/**
 * @file Configuration.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import EthereumConfiguration from "internal/ethereum/src/config/EthereumConfiguration";
import IConfiguration from "./interfaces/Configuration";
import ConfigurationTypes from "./ConfigurationTypes";

export default class Configuration {
    /**
     * @property ethereum
     */
    public [ConfigurationTypes.ETHEREUM]: EthereumConfiguration;

    /**
     * @param {Object} options
     * @param {Object} parent
     *
     * @constructor
     */
    public constructor(options: any = {}, parent?: any) {
        this[ConfigurationTypes.ETHEREUM] = new EthereumConfiguration(options.ethereum, parent);
    }

    /**
     * @method toJSON
     *
     * @returns {IConfiguration}
     */
    public toJSON(): IConfiguration {
        return {
            [ConfigurationTypes.ETHEREUM]: this[ConfigurationTypes.ETHEREUM].toJSON()
        }
    }
}

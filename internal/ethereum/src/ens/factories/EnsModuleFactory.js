
/**
 * @file EnsModuleFactory.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Ens from '../Ens';
import Registry from '../contracts/Registry';

export default class EnsModuleFactory {
    /**
     * Returns an object of type Ens
     *
     * @method createENS
     *
     * @param {HttpProvider|WebsocketProvider|IpcProvider|Web3EthereumProvider|String} provider
     * @param {ContractModuleFactory} contractModuleFactory
     * @param {Accounts} accounts
     * @param {AbiCoder} abiCoder
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {Network} net
     * @param {Object} ensModuleOptions
     * @param {Net.Socket} nodeNet
     *
     * @returns {Ens}
     */
    createENS(provider, contractModuleFactory, accounts, abiCoder, utils, formatters, net, ensModuleOptions, nodeNet) {
        return new Ens(
            provider,
            ensModuleOptions,
            this,
            contractModuleFactory,
            accounts,
            abiCoder,
            utils,
            formatters,
            net,
            nodeNet
        );
    }

    /**
     * Returns an object of type Registry
     *
     * @method createRegistry
     *
     * @param {HttpProvider|WebsocketProvider|IpcProvider|Web3EthereumProvider|String} provider
     * @param {ContractModuleFactory} contractModuleFactory
     * @param {Accounts} accounts
     * @param {AbiCoder} abiCoder
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {Object} options
     * @param {Network} net
     *
     * @returns {Registry}
     */
    createRegistry(provider, contractModuleFactory, accounts, abiCoder, utils, formatters, options, net) {
        return new Registry(provider, contractModuleFactory, accounts, abiCoder, utils, formatters, options, net);
    }
}

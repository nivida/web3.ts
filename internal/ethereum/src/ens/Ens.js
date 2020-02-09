
/**
 * @file Ens.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import {PromiEvent} from 'web3-core-method';
import {AbstractWeb3Module} from 'web3-core';
import isFunction from 'lodash/isFunction';
import namehash from 'eth-ens-namehash';

// TODO: Remove the wrapped methods and create a proxy for handling a ENS method call.
export default class Ens extends AbstractWeb3Module {
    /**
     * @param {HttpProvider|WebsocketProvider|IpcProvider|Web3EthereumProvider|String} provider
     * @param {Object} options
     * @param {EnsModuleFactory} ensModuleFactory
     * @param {ContractModuleFactory} contractModuleFactory
     * @param {Accounts} accounts
     * @param {AbiCoder} abiCoder
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {Network} net
     * @param {Net.Socket} nodeNet
     *
     * @constructor
     */
    constructor(
        provider,
        options,
        ensModuleFactory,
        contractModuleFactory,
        accounts,
        abiCoder,
        utils,
        formatters,
        net,
        nodeNet
    ) {
        super(provider, options, null, nodeNet);

        this.accounts = accounts;
        this.ensModuleFactory = ensModuleFactory;
        this.contractModuleFactory = contractModuleFactory;
        this.abiCoder = abiCoder;
        this.utils = utils;
        this.formatters = formatters;
        this.registryOptions = options;
        this.net = net;
        this._transactionSigner = options.transactionSigner;
        this._registry = false;
    }

    /**
     * Getter for the transactionSigner property
     *
     * @property transactionSigner
     *
     * @returns {TransactionSigner}
     */
    get transactionSigner() {
        return this._transactionSigner;
    }

    /**
     * TODO: Remove setter
     *
     * Setter for the transactionSigner property
     *
     * @property transactionSigner
     *
     * @param {TransactionSigner} transactionSigner
     */
    set transactionSigner(transactionSigner) {
        if (transactionSigner.type && transactionSigner.type === 'TransactionSigner') {
            throw new Error('Invalid TransactionSigner given!');
        }

        this.registry.transactionSigner = transactionSigner;
        this._transactionSigner = transactionSigner;
    }

    /**
     * Clears all subscriptions and listeners
     *
     * @method clearSubscriptions
     *
     * @returns {Promise<Boolean|Error>}
     */
    clearSubscriptions() {
        return super.clearSubscriptions('eth_unsubscribe');
    }

    /**
     * Sets the defaultGasPrice property on all contracts and on all sub-modules
     *
     * @property defaultGasPrice
     *
     * @param {String|Number} value
     */
    set defaultGasPrice(value) {
        this.registry.defaultGasPrice = value;

        super.defaultGasPrice = value;
    }

    /**
     * Gets the defaultGasPrice property
     *
     * @property defaultGasPrice
     *
     * @returns {String|Number} value
     */
    get defaultGasPrice() {
        return super.defaultGasPrice;
    }

    /**
     * Sets the defaultGas property on all contracts and on all sub-modules
     *
     * @property defaultGas
     *
     * @param {Number} value
     */
    set defaultGas(value) {
        this.registry.defaultGas = value;

        super.defaultGas = value;
    }

    /**
     * Gets the defaultGas property
     *
     * @property defaultGas
     *
     * @returns {String|Number} value
     */
    get defaultGas() {
        return super.defaultGas;
    }

    /**
     * Sets the transactionBlockTimeout property on all contracts and on all sub-modules
     *
     * @property transactionBlockTimeout
     *
     * @param {Number} value
     */
    set transactionBlockTimeout(value) {
        this.registry.transactionBlockTimeout = value;

        super.transactionBlockTimeout = value;
    }

    /**
     * Gets the transactionBlockTimeout property
     *
     * @property transactionBlockTimeout
     *
     * @returns {Number} value
     */
    get transactionBlockTimeout() {
        return super.transactionBlockTimeout;
    }

    /**
     * Sets the transactionConfirmationBlocks property on all contracts and on all sub-modules
     *
     * @property transactionConfirmationBlocks
     *
     * @param {Number} value
     */
    set transactionConfirmationBlocks(value) {
        this.registry.transactionConfirmationBlocks = value;

        super.transactionConfirmationBlocks = value;
    }

    /**
     * Gets the transactionConfirmationBlocks property
     *
     * @property transactionConfirmationBlocks
     *
     * @returns {Number} value
     */
    get transactionConfirmationBlocks() {
        return super.transactionConfirmationBlocks;
    }

    /**
     * Sets the transactionPollingTimeout property on all contracts and on all sub-modules
     *
     * @property transactionPollingTimeout
     *
     * @param {Number} value
     */
    set transactionPollingTimeout(value) {
        this.registry.transactionPollingTimeout = value;

        super.transactionPollingTimeout = value;
    }

    /**
     * Gets the transactionPollingTimeout property
     *
     * @property transactionPollingTimeout
     *
     * @returns {Number} value
     */
    get transactionPollingTimeout() {
        return super.transactionPollingTimeout;
    }

    /**
     * Sets the defaultAccount property on all contracts and on the personal module
     *
     * @property defaultAccount
     *
     * @param {String} value
     */
    set defaultAccount(value) {
        this.registry.defaultAccount = value;

        super.defaultAccount = value;
    }

    /**
     * Gets the defaultAccount property
     *
     * @property defaultAccount
     *
     * @returns {String} value
     */
    get defaultAccount() {
        return super.defaultAccount;
    }

    /**
     * Setter for the defaultBlock property
     *
     * @property defaultBlock
     *
     * @param {String|Number}value
     */
    set defaultBlock(value) {
        this.registry.defaultBlock = value;

        super.defaultBlock = value;
    }

    /**
     * Gets the defaultBlock property
     *
     * @property defaultBlock
     *
     * @returns {String|Number} value
     */
    get defaultBlock() {
        return super.defaultBlock;
    }

    /**
     * Getter for the registry property
     *
     * @property registry
     *
     * @returns {Registry}
     */
    get registry() {
        if (!this._registry) {
            this._registry = this.ensModuleFactory.createRegistry(
                this.currentProvider,
                this.contractModuleFactory,
                this.accounts,
                this.abiCoder,
                this.utils,
                this.formatters,
                this.registryOptions,
                this.net
            );
        }

        return this._registry;
    }

    /**
     * Sets the provider for the registry and resolver object.
     * This method will also set the provider in the NetworkPackage and AccountsPackage because they are used here.
     *
     * @method setProvider
     *
     * @param {HttpProvider|WebsocketProvider|IpcProvider|Web3EthereumProvider|String} provider
     * @param {Net} net
     *
     * @returns {Boolean}
     */
    setProvider(provider, net) {
        return super.setProvider(provider, net) && this.registry.setProvider(provider, net);
    }

    /**
     * Returns an contract of type resolver
     *
     * @method resolver
     *
     * @param {String} name
     *
     * @returns {Promise<Contract>}
     */
    resolver(name) {
        return this.registry.resolver(name);
    }

    /**
     * Returns the address record associated with a name.
     *
     * @method supportsInterface
     *
     * @param {String} name
     * @param {String} interfaceId
     *
     * @returns {Promise<String>}
     */
    async supportsInterface(name, interfaceId) {
        const resolver = await this.registry.resolver(name);

        return resolver.methods.supportsInterface(interfaceId).call();
    }

    /**
     * Returns the address record associated with a name.
     *
     * @method getAddress
     *
     * @param {String} name
     *
     * @returns {Promise<String>}
     */
    async getAddress(name) {
        const resolver = await this.registry.resolver(name);

        return resolver.methods.addr(namehash.hash(name)).call();
    }

    /**
     * Sets a new address
     *
     * @method setAddress
     *
     * @param {String} name
     * @param {String} address
     * @param {Object} sendOptions
     *
     * @returns {PromiEvent}
     */
    setAddress(name, address, sendOptions) {
        const promiEvent = new PromiEvent();

        this.registry.resolver(name).then((resolver) => {
            resolver.methods
                .setAddr(namehash.hash(name), address)
                .send(sendOptions)
                .on('transactionHash', (transactionHash) => {
                    promiEvent.emit('transactionHash', transactionHash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    promiEvent.emit('confirmation', confirmationNumber, receipt);
                })
                .on('receipt', (receipt) => {
                    promiEvent.emit('receipt', receipt);
                    promiEvent.resolve(receipt);
                })
                .on('error', (error) => {
                    promiEvent.emit('error', error);
                    promiEvent.reject(error);
                });
        });

        return promiEvent;
    }

    /**
     * Returns the public key
     *
     * @method getPubkey
     *
     * @param {String} name
     *
     * @returns {Promise<String>}
     */
    async getPubkey(name) {
        const resolver = await this.registry.resolver(name);

        return resolver.methods.pubkey(namehash.hash(name)).call();
    }

    /**
     * Set the new public key
     *
     * @method setPubkey
     *
     * @param {String} name
     * @param {String} x
     * @param {String} y
     * @param {Object} sendOptions
     *
     * @returns {PromiEvent}
     */
    setPubkey(name, x, y, sendOptions) {
        const promiEvent = new PromiEvent();

        this.registry.resolver(name).then((resolver) => {
            resolver.methods
                .setPubkey(namehash.hash(name), x, y)
                .send(sendOptions)
                .on('transactionHash', (transactionHash) => {
                    promiEvent.emit('transactionHash', transactionHash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    promiEvent.emit('confirmation', confirmationNumber, receipt);
                })
                .on('receipt', (receipt) => {
                    promiEvent.emit('receipt', receipt);
                    promiEvent.resolve(receipt);
                })
                .on('error', (error) => {
                    promiEvent.emit('error', error);
                    promiEvent.reject(error);
                });
        });

        return promiEvent;
    }

    /**
     * Returns the text by the given key
     *
     * @method getText
     *
     * @param {String} name
     * @param {String} key
     *
     * @returns {Promise<String>}
     */
    async getText(name, key) {
        const resolver = await this.registry.resolver(name);

        return resolver.methods.text(namehash.hash(name), key).call();
    }

    /**
     * Set a new text item in the resolver.
     *
     * @method setText
     *
     * @param {String} name
     * @param {String} key
     * @param {String} value
     * @param {Object} sendOptions
     *
     * @returns {PromiEvent}
     */
    setText(name, key, value, sendOptions) {
        const promiEvent = new PromiEvent();

        this.registry.resolver(name).then((resolver) => {
            resolver.methods
                .setText(namehash.hash(name), key, value)
                .send(sendOptions)
                .on('transactionHash', (transactionHash) => {
                    promiEvent.emit('transactionHash', transactionHash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    promiEvent.emit('confirmation', confirmationNumber, receipt);
                })
                .on('receipt', (receipt) => {
                    promiEvent.emit('receipt', receipt);
                    promiEvent.resolve(receipt);
                })
                .on('error', (error) => {
                    promiEvent.emit('error', error);
                    promiEvent.reject(error);
                });
        });

        return promiEvent;
    }

    /**
     * Returns the content
     *
     * @method getContent
     *
     * @param {String} name
     *
     * @returns {Promise<String>}
     */
    async getContent(name) {
        const resolver = await this.registry.resolver(name);

        return resolver.methods.content(namehash.hash(name)).call();
    }

    /**
     * Set the content
     *
     * @method setContent
     *
     * @param {String} name
     * @param {String} hash
     * @param {Object} sendOptions
     *
     * @returns {PromiEvent}
     */
    setContent(name, hash, sendOptions) {
        const promiEvent = new PromiEvent();

        this.registry.resolver(name).then((resolver) => {
            resolver.methods
                .setContent(namehash.hash(name), hash)
                .send(sendOptions)
                .on('transactionHash', (transactionHash) => {
                    promiEvent.emit('transactionHash', transactionHash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    promiEvent.emit('confirmation', confirmationNumber, receipt);
                })
                .on('receipt', (receipt) => {
                    promiEvent.emit('receipt', receipt);
                    promiEvent.resolve(receipt);
                })
                .on('error', (error) => {
                    promiEvent.emit('error', error);
                    promiEvent.reject(error);
                });
        });

        return promiEvent;
    }

    /**
     * Get the multihash
     *
     * @method getMultihash
     *
     * @param {String} name
     *
     * @returns {Promise<String>}
     */
    async getMultihash(name) {
        const resolver = await this.registry.resolver(name);

        return resolver.methods.multihash(namehash.hash(name)).call();
    }

    /**
     * Set the multihash
     *
     * @method setMultihash
     *
     * @param {String} name
     * @param {String} hash
     * @param {Object} sendOptions

     * @returns {PromiEvent}
     */
    setMultihash(name, hash, sendOptions) {
        const promiEvent = new PromiEvent();

        this.registry.resolver(name).then((resolver) => {
            resolver.methods
                .setMultihash(namehash.hash(name), hash)
                .send(sendOptions)
                .on('transactionHash', (transactionHash) => {
                    promiEvent.emit('transactionHash', transactionHash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    promiEvent.emit('confirmation', confirmationNumber, receipt);
                })
                .on('receipt', (receipt) => {
                    promiEvent.emit('receipt', receipt);
                    promiEvent.resolve(receipt);
                })
                .on('error', (error) => {
                    promiEvent.emit('error', error);
                    promiEvent.reject(error);
                });
        });

        return promiEvent;
    }

    /**
     * Get the contenthash
     *
     * @method getContenthash
     *
     * @param {String} name
     *
     * @returns {Promise<String>}
     */
    async getContenthash(name) {
        const resolver = await this.registry.resolver(name);

        return resolver.methods.contenthash(namehash.hash(name)).call();
    }

    /**
     * Set the contenthash
     *
     * @method setContenthash
     *
     * @param {String} name
     * @param {String} hash
     * @param {Object} sendOptions
     *
     * @returns {PromiEvent}
     */
    setContenthash(name, hash, sendOptions) {
        const promiEvent = new PromiEvent();

        this.registry.resolver(name).then((resolver) => {
            resolver.methods
                .setContenthash(namehash.hash(name), hash)
                .send(sendOptions)
                .on('transactionHash', (transactionHash) => {
                    promiEvent.emit('transactionHash', transactionHash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    promiEvent.emit('confirmation', confirmationNumber, receipt);
                })
                .on('receipt', (receipt) => {
                    promiEvent.emit('receipt', receipt);
                    promiEvent.resolve(receipt);
                })
                .on('error', (error) => {
                    promiEvent.emit('error', error);
                    promiEvent.reject(error);
                });
        });

        return promiEvent;
    }
}

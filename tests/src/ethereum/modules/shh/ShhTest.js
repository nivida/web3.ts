import * as Utils from 'web3-utils';
import {formatters} from 'web3-core-helpers';
import {AbstractSubscription} from 'web3-core-subscriptions';
import {Network} from 'web3-net';
import MethodFactory from '../../src/factories/MethodFactory';
import SubscriptionsFactory from '../../src/factories/SubscriptionsFactory';
import Shh from '../../src/Shh';

// Mocks
jest.mock('web3-core-subscriptions');
jest.mock('web3-net');
jest.mock('web3-utils');
jest.mock('web3-core-helpers');
jest.mock('../../src/factories/SubscriptionsFactory');
jest.mock('../../src/factories/MethodFactory');

/**
 * Shh test
 */
describe('ShhTest', () => {
    let shh, methodFactory, subscriptionsFactoryMock, providerMock, networkMock;

    beforeEach(() => {
        methodFactory = new MethodFactory(Utils, formatters);

        new SubscriptionsFactory();
        subscriptionsFactoryMock = SubscriptionsFactory.mock.instances[0];

        new Network();
        networkMock = Network.mock.instances[0];
        networkMock.setProvider = jest.fn();

        providerMock = {send: jest.fn(), clearSubscriptions: jest.fn()};

        shh = new Shh(providerMock, methodFactory, subscriptionsFactoryMock, networkMock, {}, null);
    });

    it('constructor check', () => {
        expect(shh.subscriptionsFactory).toEqual(subscriptionsFactoryMock);

        expect(shh.net).toEqual(networkMock);
    });

    it('calls the subscribe method with the method string "messages" and it returns a object of type ShhMessagesSubscription', () => {
        const callback = jest.fn();

        subscriptionsFactoryMock.createShhMessagesSubscription = jest.fn();

        new AbstractSubscription();
        const shhMessagesSubscriptionMock = AbstractSubscription.mock.instances[0];

        shhMessagesSubscriptionMock.subscribe.mockReturnValueOnce(shhMessagesSubscriptionMock);

        subscriptionsFactoryMock.getSubscription.mockReturnValueOnce(shhMessagesSubscriptionMock);

        expect(shh.subscribe('messages', {}, callback)).toEqual(shhMessagesSubscriptionMock);

        expect(subscriptionsFactoryMock.getSubscription).toHaveBeenCalledWith(shh, 'messages', {});
    });

    it('calls the subscribe method with a unknown method string and it throws an error', () => {
        subscriptionsFactoryMock.getSubscription = jest.fn(() => {
            throw new Error('ERROR');
        });

        expect(() => {
            shh.subscribe('error', {}, () => {});
        }).toThrow('ERROR');
    });

    it('sets the defaultGasPrice property', () => {
        shh.defaultGasPrice = 10;

        expect(shh.defaultGasPrice).toEqual(10);
    });

    it('sets the defaultGas property', () => {
        shh.defaultGas = 10;

        expect(shh.defaultGas).toEqual(10);
    });

    it('sets the transactionBlockTimeout property', () => {
        shh.transactionBlockTimeout = 10;

        expect(shh.transactionBlockTimeout).toEqual(10);
    });

    it('sets the transactionConfirmationBlocks property', () => {
        shh.transactionConfirmationBlocks = 10;

        expect(shh.transactionConfirmationBlocks).toEqual(10);
    });

    it('sets the transactionPollingTimeout property', () => {
        shh.transactionPollingTimeout = 10;

        expect(shh.transactionPollingTimeout).toEqual(10);
    });

    it('sets the defaultAccount property', () => {
        Utils.toChecksumAddress.mockReturnValue('0x2');

        shh.defaultAccount = '0x1';

        expect(shh.defaultAccount).toEqual('0x2');
        expect(networkMock.defaultAccount).toEqual('0x2');
    });

    it('sets the defaultBlock property', () => {
        shh.defaultBlock = 10;

        expect(shh.defaultBlock).toEqual(10);
    });

    it('calls clearSubscriptions with a non-socket based provider and returns true', async () => {
        await expect(shh.clearSubscriptions()).resolves.toEqual(true);
    });

    it('calls setProvider and returns true', () => {
        networkMock.setProvider.mockReturnValueOnce(true);

        expect(shh.setProvider(providerMock, 'net')).toEqual(true);

        expect(networkMock.setProvider).toHaveBeenCalledWith(providerMock, 'net');
    });
});

import {formatters} from 'web3-core-helpers';
import PromiEvent from '../../../../lib/PromiEvent';
import AbstractTransactionObserver from '../../../../lib/observers/AbstractTransactionObserver';
import AbstractObservedTransactionMethod from '../../../../lib/methods/transaction/AbstractObservedTransactionMethod';

// Mocks
jest.mock('web3-core-helpers');
jest.mock('../../../../lib/observers/AbstractTransactionObserver');

/**
 * AbstractObservedTransactionMethod test
 */
describe('AbstractObservedTransactionMethodTest', () => {
    let method,
        beforeExecutionMock,
        afterExecutionMock,
        moduleInstanceMock,
        providerMock,
        transactionObserverMock,
        observableMock,
        transactionHashCallback,
        confirmationCallback;

    beforeEach(() => {
        providerMock = {send: jest.fn()};

        moduleInstanceMock = {};
        moduleInstanceMock.currentProvider = providerMock;

        observableMock = {subscribe: ''};

        transactionHashCallback = jest.fn();
        confirmationCallback = jest.fn();

        new AbstractTransactionObserver();
        transactionObserverMock = AbstractTransactionObserver.mock.instances[0];
        transactionObserverMock.observe.mockReturnValue(observableMock);

        beforeExecutionMock = jest.fn();
        afterExecutionMock = jest.fn((value) => {
            return value;
        });

        method = new AbstractObservedTransactionMethod(
            'rpcMethod',
            5,
            {},
            formatters,
            moduleInstanceMock,
            transactionObserverMock
        );
        method.beforeExecution = beforeExecutionMock;
        method.afterExecution = afterExecutionMock;
    });

    it('constructor check', () => {
        expect(AbstractObservedTransactionMethod.Type).toEqual('observed-transaction-method');

        expect(method.rpcMethod).toEqual('rpcMethod');

        expect(method.parametersAmount).toEqual(5);

        expect(method.moduleInstance).toEqual(moduleInstanceMock);

        expect(method.transactionObserver).toEqual(transactionObserverMock);

        expect(method.promiEvent).toBeInstanceOf(PromiEvent);

        expect(method.Type).toEqual('observed-transaction-method');
    });

    it('calls execute with event listeners and is emitting the expected values', (done) => {
        providerMock.send.mockReturnValueOnce(Promise.resolve('transactionHash'));

        formatters.outputTransactionFormatter.mockReturnValue({status: false});

        observableMock.subscribe = jest.fn((next, error, complete) => {
            next({confirmations: 0, receipt: {status: true}});

            complete();
        });

        const promiEvent = method.execute();
        promiEvent.on('transactionHash', transactionHashCallback);
        promiEvent.on('confirmation', confirmationCallback);
        promiEvent.on('receipt', (receipt) => {
            expect(receipt).toEqual({status: true});

            expect(providerMock.send).toHaveBeenCalledWith('rpcMethod', []);

            expect(beforeExecutionMock).toHaveBeenCalledWith(moduleInstanceMock);

            expect(afterExecutionMock).toHaveBeenCalledWith({status: true});

            expect(transactionHashCallback).toHaveBeenCalledWith('transactionHash');

            expect(confirmationCallback).toHaveBeenCalledWith(0, {status: false});

            expect(formatters.outputTransactionFormatter).toHaveBeenNthCalledWith(1, {status: true});

            expect(formatters.outputTransactionFormatter).toHaveBeenCalledTimes(1);

            done();
        });
    });

    it('calls execute with event listeners and is emitting a error', (done) => {
        providerMock.send.mockReturnValueOnce(Promise.resolve('transactionHash'));

        observableMock.subscribe = jest.fn((next, error, complete) => {
            error('FAILED');
        });

        method.execute().on('error', (error, receipt, count) => {
            expect(error).toEqual('FAILED');

            expect(receipt).toEqual(undefined);

            expect(count).toEqual(undefined);

            expect(providerMock.send).toHaveBeenCalledWith('rpcMethod', []);

            expect(beforeExecutionMock).toHaveBeenCalledWith(moduleInstanceMock);

            done();
        });
    });

    it('calls execute and returns with the expected resolved Promise', async () => {
        providerMock.send.mockReturnValueOnce(Promise.resolve('transactionHash'));

        observableMock.subscribe = jest.fn((next, error, complete) => {
            next({count: 0, receipt: {status: true}});

            complete();
        });

        await expect(method.execute()).resolves.toEqual({status: true});

        expect(providerMock.send).toHaveBeenCalledWith('rpcMethod', []);

        expect(beforeExecutionMock).toHaveBeenCalledWith(moduleInstanceMock);

        expect(afterExecutionMock).toHaveBeenCalledWith({status: true});
    });

    it('calls execute and returns with the expected rejected Promise', async () => {
        providerMock.send.mockReturnValueOnce(Promise.resolve('transactionHash'));

        observableMock.subscribe = jest.fn((next, error, complete) => {
            error('FAILED');
        });

        await expect(method.execute()).rejects.toEqual('FAILED');

        expect(providerMock.send).toHaveBeenCalledWith('rpcMethod', []);

        expect(beforeExecutionMock).toHaveBeenCalledWith(moduleInstanceMock);
    });

    it('calls execute and returns a rejected Promise because of EVM error', async () => {
        providerMock.send.mockReturnValueOnce(Promise.resolve('transactionHash'));

        observableMock.subscribe = jest.fn((next, error, complete) => {
            next({count: 0, receipt: {status: false, gasUsed: 1}});

            complete();
        });

        method.parameters = [{gas: 0}];

        await expect(method.execute()).rejects.toThrow(
            `Transaction has been reverted by the EVM:\n${JSON.stringify({status: false, gasUsed: 1}, null, 2)}`
        );

        expect(providerMock.send).toHaveBeenCalledWith('rpcMethod', method.parameters);
    });

    it('calls execute and returns a rejected Promise because the transaction ran out of gas', async () => {
        providerMock.send.mockReturnValueOnce(Promise.resolve('transactionHash'));

        observableMock.subscribe = jest.fn((next, error, complete) => {
            next({count: 0, receipt: {status: false, gasUsed: 1}});

            complete();
        });

        method.parameters = [{gas: 1}];

        await expect(method.execute()).rejects.toThrow(
            `Transaction ran out of gas. Please provide more gas:\n${JSON.stringify(
                {status: false, gasUsed: 1},
                null,
                2
            )}`
        );

        expect(providerMock.send).toHaveBeenCalledWith('rpcMethod', method.parameters);
    });

    it('calls execute and calls the given callback with the transaction hash', (done) => {
        providerMock.send.mockReturnValueOnce(Promise.resolve('transactionHash'));

        method.callback = jest.fn((error, transactionHash) => {
            expect(error).toEqual(false);

            expect(transactionHash).toEqual('transactionHash');

            expect(providerMock.send).toHaveBeenCalledWith('rpcMethod', method.parameters);

            expect(beforeExecutionMock).toHaveBeenCalledWith(moduleInstanceMock);

            done();
        });

        method.execute();
    });

    it('calls execute and the provider send method throws an error', async () => {
        providerMock.send.mockReturnValueOnce(Promise.reject(new Error('ERROR')));

        await expect(method.execute()).rejects.toThrow('ERROR');

        expect(providerMock.send).toHaveBeenCalledWith('rpcMethod', []);

        expect(beforeExecutionMock).toHaveBeenCalledWith(moduleInstanceMock);
    });

    it('calls execute with event listeners and the provider send method throws an error', (done) => {
        providerMock.send.mockReturnValueOnce(Promise.reject(new Error('ERROR')));

        const promiEvent = method.execute();

        promiEvent.on('error', (error) => {
            expect(error).toEqual(new Error('ERROR'));

            expect(providerMock.send).toHaveBeenCalledWith('rpcMethod', []);

            expect(beforeExecutionMock).toHaveBeenCalledWith(moduleInstanceMock);

            done();
        });
    });

    it('calls execute with a callback and the provider send method throws an error', (done) => {
        providerMock.send.mockReturnValueOnce(Promise.reject(new Error('ERROR')));

        method.callback = jest.fn((error, receipt) => {
            expect(error).toEqual(new Error('ERROR'));

            expect(receipt).toEqual(null);

            expect(providerMock.send).toHaveBeenCalledWith('rpcMethod', []);

            expect(beforeExecutionMock).toHaveBeenCalledWith(moduleInstanceMock);

            done();
        });

        method.execute();
    });
});

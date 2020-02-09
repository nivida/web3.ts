import {ChainIdMethod, EstimateGasMethod, GetTransactionCountMethod} from 'web3-core-method';
import * as Utils from 'web3-utils';
import {formatters} from 'web3-core-helpers';
import {AbiCoder} from 'web3-eth-abi';

import MethodFactory from '../../../src/factories/MethodFactory';
import ContractModuleFactory from '../../../src/factories/ContractModuleFactory';
import CallContractMethod from '../../../src/methods/CallContractMethod';
import SendContractMethod from '../../../src/methods/SendContractMethod';
import ContractDeployMethod from '../../../src/methods/ContractDeployMethod';
import PastEventLogsMethod from '../../../src/methods/PastEventLogsMethod';
import AllPastEventLogsMethod from '../../../src/methods/AllPastEventLogsMethod';

// Mocks
jest.mock('web3-utils');
jest.mock('web3-core-helpers');
jest.mock('web3-eth-abi');
jest.mock('web3-core-method');
jest.mock('../../../src/factories/ContractModuleFactory');
jest.mock('../../../src/methods/CallContractMethod');
jest.mock('../../../src/methods/SendContractMethod');
jest.mock('../../../src/methods/ContractDeployMethod');
jest.mock('../../../src/methods/PastEventLogsMethod');
jest.mock('../../../src/methods/AllPastEventLogsMethod');

/**
 * MethodFactory test
 */
describe('MethodFactoryTest', () => {
    let methodFactory, contractModuleFactoryMock, abiCoderMock, contract;

    beforeEach(() => {
        contract = {currentProvider: {supportsSubscriptions: jest.fn()}};

        new ContractModuleFactory({}, {}, {});
        contractModuleFactoryMock = ContractModuleFactory.mock.instances[0];

        new AbiCoder();
        abiCoderMock = AbiCoder.mock.instances[0];

        methodFactory = new MethodFactory(Utils, formatters, contractModuleFactoryMock, abiCoderMock);
    });

    it('constructor check', () => {
        expect(methodFactory.utils).toEqual(Utils);

        expect(methodFactory.formatters).toEqual(formatters);

        expect(methodFactory.contractModuleFactory).toEqual(contractModuleFactoryMock);
    });

    it('calls createMethodByRequestType with requestType call', () => {
        expect(methodFactory.createMethodByRequestType({}, contract, 'call')).toBeInstanceOf(CallContractMethod);

        expect(CallContractMethod).toHaveBeenCalledWith(Utils, formatters, contract, abiCoderMock, {});
    });

    it('calls createMethodByRequestType with requestType send', () => {
        contract.currentProvider.supportsSubscriptions.mockReturnValueOnce(false);

        expect(methodFactory.createMethodByRequestType({}, contract, 'send')).toBeInstanceOf(SendContractMethod);

        expect(SendContractMethod).toHaveBeenCalled();

        expect(ChainIdMethod).toHaveBeenCalledWith(Utils, formatters, contract);

        expect(GetTransactionCountMethod).toHaveBeenCalledWith(Utils, formatters, contract);

        expect(contract.currentProvider.supportsSubscriptions).toHaveBeenCalled();
    });

    it('calls createMethodByRequestType with requestType send and a socket based provider', () => {
        contract.currentProvider.supportsSubscriptions.mockReturnValueOnce(true);

        expect(methodFactory.createMethodByRequestType({}, contract, 'send')).toBeInstanceOf(SendContractMethod);

        expect(contract.currentProvider.supportsSubscriptions).toHaveBeenCalled();

        expect(SendContractMethod).toHaveBeenCalled();

        expect(ChainIdMethod).toHaveBeenCalledWith(Utils, formatters, contract);

        expect(GetTransactionCountMethod).toHaveBeenCalledWith(Utils, formatters, contract);
    });

    it('calls createMethodByRequestType with requestType estimate', () => {
        expect(methodFactory.createMethodByRequestType({}, contract, 'estimate')).toBeInstanceOf(EstimateGasMethod);

        expect(EstimateGasMethod).toHaveBeenCalledWith(Utils, formatters, contract);
    });

    it('calls createMethodByRequestType with requestType contract-deployment', () => {
        contract.currentProvider.supportsSubscriptions.mockReturnValueOnce(false);

        expect(methodFactory.createMethodByRequestType({}, contract, 'contract-deployment')).toBeInstanceOf(
            ContractDeployMethod
        );

        expect(contract.currentProvider.supportsSubscriptions).toHaveBeenCalled();

        expect(ContractDeployMethod).toHaveBeenCalled();

        expect(ChainIdMethod).toHaveBeenCalledWith(Utils, formatters, contract);

        expect(GetTransactionCountMethod).toHaveBeenCalledWith(Utils, formatters, contract);
    });

    it('calls createMethodByRequestType with unknown requestType', () => {
        expect(() => {
            methodFactory.createMethodByRequestType({}, contract, 'nope');
        }).toThrow('RPC call not found with requestType: "nope"');
    });

    it('calls createPastEventLogsMethod and returns PastEventLogsMethod object', () => {
        contractModuleFactoryMock.createEventLogDecoder.mockReturnValueOnce({});

        contractModuleFactoryMock.createEventOptionsMapper.mockReturnValueOnce({});

        expect(methodFactory.createPastEventLogsMethod({}, contract)).toBeInstanceOf(PastEventLogsMethod);

        expect(contractModuleFactoryMock.createEventLogDecoder).toHaveBeenCalled();

        expect(contractModuleFactoryMock.createEventOptionsMapper).toHaveBeenCalled();

        expect(PastEventLogsMethod).toHaveBeenCalledWith(Utils, formatters, contract, {}, {}, {});
    });

    it('calls createAllPastEventLogsMethod and returns AllPastEventLogsMethod object', () => {
        contractModuleFactoryMock.createAllEventsLogDecoder.mockReturnValueOnce({});

        contractModuleFactoryMock.createAllEventsOptionsMapper.mockReturnValueOnce({});

        expect(methodFactory.createAllPastEventLogsMethod({}, contract)).toBeInstanceOf(AllPastEventLogsMethod);

        expect(contractModuleFactoryMock.createAllEventsLogDecoder).toHaveBeenCalled();

        expect(contractModuleFactoryMock.createAllEventsOptionsMapper).toHaveBeenCalled();

        expect(AllPastEventLogsMethod).toHaveBeenCalledWith(Utils, formatters, contract, {}, {}, {});
    });

    it('calls createCallContractMethod and returns CallContractMethod object', () => {
        expect(methodFactory.createCallContractMethod({}, contract)).toBeInstanceOf(CallContractMethod);

        expect(CallContractMethod).toHaveBeenCalledWith(Utils, formatters, contract, abiCoderMock, {});
    });

    it('calls createSendContractMethod and returns SendContractMethod object', () => {
        contract.currentProvider.supportsSubscriptions.mockReturnValueOnce(false);

        expect(methodFactory.createSendContractMethod(contract)).toBeInstanceOf(SendContractMethod);

        expect(contract.currentProvider.supportsSubscriptions).toHaveBeenCalled();

        expect(contractModuleFactoryMock.createAllEventsLogDecoder).toHaveBeenCalled();

        expect(SendContractMethod).toHaveBeenCalled();

        expect(ChainIdMethod).toHaveBeenCalledWith(Utils, formatters, contract);

        expect(GetTransactionCountMethod).toHaveBeenCalledWith(Utils, formatters, contract);
    });

    it('calls createContractDeployMethod and returns ContractDeployMethod object', () => {
        contract.currentProvider.supportsSubscriptions.mockReturnValueOnce(false);

        expect(methodFactory.createContractDeployMethod(contract)).toBeInstanceOf(ContractDeployMethod);

        expect(contract.currentProvider.supportsSubscriptions).toHaveBeenCalled();

        expect(ContractDeployMethod).toHaveBeenCalled();

        expect(ChainIdMethod).toHaveBeenCalledWith(Utils, formatters, contract);

        expect(GetTransactionCountMethod).toHaveBeenCalledWith(Utils, formatters, contract);
    });

    it('calls createEstimateGasMethod and returns EstimateGasMethod object', () => {
        expect(methodFactory.createEstimateGasMethod(contract)).toBeInstanceOf(EstimateGasMethod);

        expect(EstimateGasMethod).toHaveBeenCalledWith(Utils, formatters, contract);
    });

    it('calls createSendContractMethod with a socket based provider and returns SendContractMethod object', () => {
        contract.currentProvider.supportsSubscriptions.mockReturnValueOnce(true);

        expect(methodFactory.createSendContractMethod(contract)).toBeInstanceOf(SendContractMethod);

        expect(contract.currentProvider.supportsSubscriptions).toHaveBeenCalled();

        expect(contractModuleFactoryMock.createAllEventsLogDecoder).toHaveBeenCalled();

        expect(SendContractMethod).toHaveBeenCalled();

        expect(ChainIdMethod).toHaveBeenCalledWith(Utils, formatters, contract);

        expect(GetTransactionCountMethod).toHaveBeenCalledWith(Utils, formatters, contract);
    });
});

import * as Utils from 'web3-utils';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import SetBlockProfileRateMethod from '../../../../src/methods/debug/SetBlockProfileRateMethod';

// Mocks
jest.mock('web3-utils');

/**
 * SetBlockProfileRateMethod test
 */
describe('SetBlockProfileRateMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new SetBlockProfileRateMethod(Utils, {}, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('debug_setBlockProfileRate');

        expect(method.parametersAmount).toEqual(1);
    });

    it('calls beforeExecution and maps the given number to a hex string', () => {
        Utils.numberToHex.mockReturnValueOnce('0x1');

        method.parameters = [1];

        method.beforeExecution();

        expect(method.parameters[0]).toEqual('0x1');

        expect(Utils.numberToHex).toHaveBeenCalledWith(1);
    });
});

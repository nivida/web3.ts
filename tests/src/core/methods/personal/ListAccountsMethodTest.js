import * as Utils from 'web3-utils';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import ListAccountsMethod from '../../../../src/methods/personal/ListAccountsMethod';

// Mocks
jest.mock('web3-utils');

/**
 * ListAccountsMethod test
 */
describe('ListAccountsMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new ListAccountsMethod(Utils, null, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('personal_listAccounts');

        expect(method.parametersAmount).toEqual(0);

        expect(method.utils).toEqual(Utils);

        expect(method.formatters).toEqual(null);
    });

    it('afterExecution should map the response', () => {
        Utils.toChecksumAddress.mockReturnValueOnce('0x0');

        expect(method.afterExecution(['0x0'])[0]).toEqual('0x0');

        expect(Utils.toChecksumAddress).toHaveBeenCalledWith('0x0');
    });
});

import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import ListeningMethod from '../../../../src/methods/network/ListeningMethod';

/**
 * ListeningMethod test
 */
describe('ListeningMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new ListeningMethod(null, null, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('net_listening');

        expect(method.parametersAmount).toEqual(0);

        expect(method.utils).toEqual(null);

        expect(method.formatters).toEqual(null);
    });
});

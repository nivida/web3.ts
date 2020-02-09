
/**
 * @file Iban.js
 *
 * Details: https://github.com/ethereum/wiki/wiki/ICAP:-Inter-exchange-Client-Address-Protocol
 *
 * @author Marek Kotewicz <marek@parity.io>
 * @date 2015
 */

import Hex from "../../../../core/src/utility/Hex";
import Address from './Address';
import BN from 'bn.js';

export default class Iban {
    /**
     * @param {String} iban
     *
     * @constructor
     */
    constructor(iban) {
        this._iban = iban;
    }

    /**
     * This method should be used to create an ethereum address from a direct iban address
     *
     * @method toAddress
     *
     * @param {String} iban
     *
     * @returns {String}
     */
    static toAddress(iban) {
        iban = new Iban(iban);

        if (!iban.isDirect()) {
            throw new Error("IBAN is indirect and can't be converted");
        }

        return iban.toAddress();
    }

    /**
     * This method should be used to create iban address from an ethereum address
     *
     * @method toIban
     *
     * @param {String} address
     *
     * @returns {String} the IBAN address
     */
    static toIban(address) {
        return Iban.fromAddress(address).toString();
    }

    /**
     * This method should be used to create iban object from an ethereum address
     *
     * @method fromAddress
     *
     * @param {String} address
     *
     * @returns {Iban} the IBAN object
     */
    static fromAddress(address) {
        let padded = new BN(Hex.stripPrefix(new Address(address).toString()), 16).toString(36);

        while (padded.length < 15 * 2) {
            padded = `0${padded}`;
        }

        return Iban.fromBban(padded.toUpperCase());
    }

    /**
     * Convert the passed BBAN to an IBAN for this country specification.
     * Please note that <i>"generation of the IBAN shall be the exclusive responsibility of the bank/branch servicing the account"</i>.
     * This method implements the preferred algorithm described in http://en.wikipedia.org/wiki/International_Bank_Account_Number#Generating_IBAN_check_digits
     *
     * @method fromBban
     *
     * @param {String} bban the BBAN to convert to IBAN
     *
     * @returns {Iban} the IBAN object
     */
    static fromBban(bban) {
        const countryCode = 'XE';

        const remainder = Iban.module9710(Iban.iso13616Prepare(`${countryCode}00${bban}`));
        const checkDigit = `0${98 - remainder}`.slice(-2);

        return new Iban(countryCode + checkDigit + bban);
    }

    /**
     * Should be used to create IBAN object for given institution and identifier
     *
     * @method createIndirect
     *
     * @param {Object} options, required options are "institution" and "identifier"
     *
     * @returns {Iban} the IBAN object
     */
    static createIndirect(options) {
        return Iban.fromBban(`ETH${options.institution}${options.identifier}`);
    }

    /**
     * This method should be used to check if given string is valid iban object
     *
     * @method isValid
     *
     * @param {String} iban string
     *
     * @returns {Boolean} true if it is valid IBAN
     */
    static isValid(iban) {
        const i = new Iban(iban);
        return i.isValid();
    }

    /**
     * Should be called to check if iban is correct
     *
     * @method isValid
     *
     * @returns {Boolean} true if it is, otherwise false
     */
    isValid() {
        return (
            /^XE\d{2}(ETH[0-9A-Z]{13}|[0-9A-Z]{30,31})$/.test(this._iban) &&
            Iban.module9710(Iban.iso13616Prepare(this._iban)) === 1
        );
    }

    /**
     * Should be called to check if iban number is direct
     *
     * @method isDirect
     *
     * @returns {Boolean} true if it is, otherwise false
     */
    isDirect() {
        return this._iban.length === 34 || this._iban.length === 35;
    }

    /**
     * Should be called to check if iban number if indirect
     *
     * @method isIndirect
     *
     * @returns {Boolean} true if it is, otherwise false
     */
    isIndirect() {
        return this._iban.length === 20;
    }

    /**
     * Should be called to get iban checksum
     * Uses the mod-97-10 checksumming protocol (ISO/IEC 7064:2003)
     *
     * @method checksum
     *
     * @returns {String} checksum
     */
    checksum() {
        return this._iban.substr(2, 2);
    }

    /**
     * Should be called to get institution identifier
     * eg. XREG
     *
     * @method institution
     *
     * @returns {String} institution identifier
     */
    institution() {
        return this.isIndirect() ? this._iban.substr(7, 4) : '';
    }

    /**
     * Should be called to get client identifier within institution
     * eg. GAVOFYORK
     *
     * @method client
     *
     * @returns {String} client identifier
     */
    client() {
        return this.isIndirect() ? this._iban.substr(11) : '';
    }

    /**
     * Should be called to get client direct address
     *
     * @method toAddress
     *
     * @returns {String} ethereum address
     */
    toAddress() {
        if (this.isDirect()) {
            return Address.toChecksum(new BN(this._iban.substr(4), 36).toString(16));
        }

        return '';
    }

    /**
     * Returns the Iban address as normal string.
     *
     * @method toString
     *
     * @returns {String}
     */
    toString() {
        return this._iban;
    }

    /**
     * Calculates the MOD 97 10 of the passed IBAN as specified in ISO7064.
     *
     * @method mod9710
     *
     * @param {String} iban
     *
     * @returns {Number}
     */
    static module9710(iban) {
        let remainder = iban;
        let block;

        while (remainder.length > 2) {
            block = remainder.slice(0, 9);
            remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
        }

        return parseInt(remainder, 10) % 97;
    }

    /**
     * Calculates the MOD 97 10 of the passed IBAN as specified in ISO7064.
     *
     * @method mod9710
     *
     * @param {String} iban
     *
     * @returns {Number}
     */
    module9710(iban) {
        return Iban.module9710(iban);
    }

    /**
     * Prepare an IBAN for mod 97 computation by moving the first 4 chars to the end and transforming the letters to
     * numbers (A = 10, B = 11, ..., Z = 35), as specified in ISO13616.
     *
     * @method iso13616Prepare
     *
     * @param {String} iban the IBAN
     *
     * @returns {String} the prepared IBAN
     */
    static iso13616Prepare(iban) {
        const A = 'A'.charCodeAt(0);
        const Z = 'Z'.charCodeAt(0);

        iban = iban.toUpperCase();
        iban = iban.substr(4) + iban.substr(0, 4);

        return iban
            .split('')
            .map((n) => {
                const code = n.charCodeAt(0);
                if (code >= A && code <= Z) {
                    // A = 10, B = 11, ... Z = 35
                    return code - A + 10;
                } else {
                    return n;
                }
            })
            .join('');
    }

    /**
     * Prepare an IBAN for mod 97 computation by moving the first 4 chars to the end and transforming the letters to
     * numbers (A = 10, B = 11, ..., Z = 35), as specified in ISO13616.
     *
     * @method iso13616Prepare
     *
     * @param {String} iban the IBAN
     *
     * @returns {String} the prepared IBAN
     */
    iso13616Prepare(iban) {
        return Iban.iso13616Prepare(iban);
    }
}

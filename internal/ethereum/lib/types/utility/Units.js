/**
 * @file Units.js
 * @author Samuel Furter
 * @date 2020
 */

import isString from 'lodash/isString';
import BN from 'bn.js';
import {BigNumber} from '@ethersproject/bignumber';
import * as ethjsUnit from 'ethjs-unit';

export default class Units {
    /**
     * Returns value of unit in Wei
     *
     * @method getUnitValue
     *
     * @param {String} unit - The unit to convert to, default ether
     *
     * @returns {BN} value of the unit (in Wei)
     * @throws Error - if the unit is not correct
     */
    static getUnitValue(unit = 'ether') {
        unit = unit.toLowerCase();

        if (!ethjsUnit.unitMap[unit]) {
            throw new Error(
                `This unit "${unit}" doesn't exist, please use the one of the following units${JSON.stringify(
                    ethjsUnit.unitMap,
                    null,
                    2
                )}`
            );
        }

        return unit;
    }

    /**
     * Takes a number of wei and converts it to any other ether unit.
     *
     * Possible units are:
     *   SI Short   SI Full        Effigy       Other
     * - kwei       femtoether     babbage
     * - mwei       picoether      lovelace
     * - gwei       nanoether      shannon      nano
     * - --         microether     szabo        micro
     * - --         milliether     finney       milli
     * - ether      --             --
     * - kether                    --           grand
     * - mether
     * - gether
     * - tether
     *
     * @method fromWei
     *
     * @param {String|BN|BigNumber} number - Can be a BigNumber, number string or a HEX of a decimal
     * @param {String} unit - The unit to convert to, default ether
     *
     * @returns {String|BigNumber} Returns a string
     */
    static fromWei(number, unit) {
        unit = Units.getUnitValue(unit);

        if (BigNumber.isBigNumber(number) || BN.isBN(number)) {
            return BigNumber.from(ethjsUnit.fromWei(number, unit).toString(10));
        }

        if (isString(number)) {
            return ethjsUnit.fromWei(number, unit).toString(10);
        }

        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
    }

    /**
     * Takes a number of a unit and converts it to wei.
     *
     * Possible units are:
     *   SI Short   SI Full        Effigy       Other
     * - kwei       femtoether     babbage
     * - mwei       picoether      lovelace
     * - gwei       nanoether      shannon      nano
     * - --         microether     szabo        micro
     * - --         microether     szabo        micro
     * - --         milliether     finney       milli
     * - ether      --             --
     * - kether                    --           grand
     * - mether
     * - gether
     * - tether
     *
     * @method toWei
     *
     * @param {String|BN|BigNumber} number - Can be a number, number string or a HEX of a decimal
     * @param {String} unit - The unit to convert from, default ether
     *
     * @returns {String|BigNumber} When given a BN object it returns one as well, otherwise a string
     */
    static toWei(number, unit) {
        unit = Units.getUnitValue(unit);

        if (BigNumber.isBigNumber(number) || BN.isBN(number)) {
            return BigNumber.from(ethjsUnit.toWei(number, unit).toString(10));
        }

        if (isString(number)) {
            return ethjsUnit.toWei(number, unit).toString(10);
        }

        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
    }
}

import {MyanmarNumbers, myanmarNumbers} from './MyanmarNumbers';
import {OperatorRegex, operatorRegex} from './OperatorRegex';
import {Operators, operators} from './Operators';
import {NetworkType, networkType} from './NetworkType';

export interface MyanmarPhoneNumber {
    OPERATOR_REGEX: OperatorRegex;
    OPERATORS: Operators;
    NETWORK_TYPE: NetworkType;
    sanitizeInput(phoneNumber: string): string;
    normalizeInput(phoneNumber: string): string;
    isValidMMPhoneNumber(phoneNumber: string): boolean;
    getTelecomName(phoneNumber: string): string;
    getPhoneNetworkType(phoneNumber: string): string;
}

export const myanmarPhoneNumber: MyanmarPhoneNumber = {
    OPERATOR_REGEX: operatorRegex,
    OPERATORS: operators,
    NETWORK_TYPE: networkType,

    sanitizeInput(phoneNumber: string) {
        if (!phoneNumber) {
            throw Error('Please include phoneNumber parameter.');
        }

        phoneNumber = phoneNumber.trim();

        if (phoneNumber.length === 0) {
            throw Error('Phone number is empty.');
        }

        phoneNumber = phoneNumber.replace(/[- )(]/g, '');

        const countryCodeRe = /^\+?950?9\d+$/;

        if (countryCodeRe.test(phoneNumber)) {
            const doubleCountryCodeRe = /^\+?95950?9\d{7,9}$/;
            if (doubleCountryCodeRe.test(phoneNumber)) {
                phoneNumber = phoneNumber.replace(/9595/, '95');
            }
            const zeroBeforeAreaCodeRe = /^+?9509\d{7,9}$/;
            if (zeroBeforeAreaCodeRe.test(phoneNumber)) {
                phoneNumber = phoneNumber.replace(/9509/, '959');
            }
        }
        return phoneNumber;
    },
    normalizeInput(phoneNumber: string) {
        const sanitizedNumber = this.sanitizeInput(phoneNumber);
        const possibleCases = /^((09-)|(\+959)|(09\s)|(959)|(09\.))/;

        if (possibleCases.test(sanitizedNumber)) {
            return sanitizedNumber.replace(possibleCases, '09');
        }

        if (/[၀-၉]/.test(sanitizedNumber)) {
            return sanitizedNumber
                .split('')
                .map(function (num) {
                    return myanmarNumbers[num];
                })
                .join('')
                .replace(possibleCases, '09');
        }

        return sanitizedNumber;
    },

    isValidMMPhoneNumber(phoneNumber: string) {
        phoneNumber = this.normalizeInput(phoneNumber);
        const myanmarPhoneRe = /^(09|\+?950?9|\+?95950?9)\d{7,9}$/;
        return myanmarPhoneRe.test(phoneNumber);
    },

    getTelecomName(phoneNumber: string) {
        const operators = this.OPERATORS;
        const operatorRe = this.OPERATOR_REGEX;
        let operatorName = operators.UNKNOWN;

        if (phoneNumber && this.isValidMMPhoneNumber(phoneNumber)) {
            phoneNumber = this.normalizeInput(phoneNumber);
            if (operatorRe.ooredoo.test(phoneNumber)) {
                operatorName = operators.OOREDOO;
            } else if (operatorRe.atom.test(phoneNumber)) {
                operatorName = operators.ATOM;
            } else if (operatorRe.mpt.test(phoneNumber)) {
                operatorName = operators.MPT;
            } else if (operatorRe.mec.test(phoneNumber)) {
                operatorName = operators.MEC;
            } else if (operatorRe.mytel.test(phoneNumber)) {
                operatorName = operators.MYTEL;
            } else {
                operatorName = operators.UNKNOWN;
            }
        }
        return operatorName;
    },

    getPhoneNetworkType(phoneNumber: string) {
        let networkType = this.NETWORK_TYPE.UNKNOWN;
        const operatorRe = this.OPERATOR_REGEX;

        if (phoneNumber && this.isValidMMPhoneNumber(phoneNumber)) {
            phoneNumber = this.normalizeInput(phoneNumber);
            if (
                operatorRe.ooredoo.test(phoneNumber) ||
                operatorRe.atom.test(phoneNumber) ||
                operatorRe.mytel.test(phoneNumber)
            ) {
                networkType = this.NETWORK_TYPE.GSM;
            } else if (operatorRe.mpt.test(phoneNumber) || operatorRe.mec.test(phoneNumber)) {
                const wcdmaRe = /^(09|\+?959)(55\d{5}|25[2-4]\d{6}|26\d{7}|4(4|5|6)\d{7})$/;
                const cdma450Re = /^(09|\+?959)(8\d{6}|6\d{6}|49\d{6})$/;
                const cdma800Re = /^(09|\+?959)(3\d{7}|73\d{6}|91\d{6})$/;

                if (wcdmaRe.test(phoneNumber)) {
                    networkType = this.NETWORK_TYPE.WCDMA;
                } else if (cdma450Re.test(phoneNumber)) {
                    networkType = this.NETWORK_TYPE.CDMA_450;
                } else if (cdma800Re.test(phoneNumber)) {
                    networkType = this.NETWORK_TYPE.CDMA_800;
                } else {
                    networkType = this.NETWORK_TYPE.GSM;
                }
            }
        }
        return networkType;
    },

};


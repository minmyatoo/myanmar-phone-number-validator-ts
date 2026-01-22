import { myanmarPhoneNumber } from '../src/MyanmarPhoneNumber';
import { operators } from '../src/Operators';
import { networkType } from '../src/NetworkType';

describe('MyanmarPhoneNumber Library', () => {
    describe('isValidMMPhoneNumber', () => {
        test('should return true for valid Ooredoo numbers', () => {
            expect(myanmarPhoneNumber.isValidMMPhoneNumber('09970000000')).toBe(true);
            expect(myanmarPhoneNumber.isValidMMPhoneNumber('+959970000000')).toBe(true);
        });

        test('should return true for valid Atom (Telenor) numbers', () => {
            expect(myanmarPhoneNumber.isValidMMPhoneNumber('09790000000')).toBe(true);
            expect(myanmarPhoneNumber.isValidMMPhoneNumber('09780000000')).toBe(true);
        });

        test('should return true for valid MPT numbers', () => {
            expect(myanmarPhoneNumber.isValidMMPhoneNumber('095000000')).toBe(true);
            expect(myanmarPhoneNumber.isValidMMPhoneNumber('09420000000')).toBe(true);
        });

        test('should return true for valid Mytel numbers', () => {
            expect(myanmarPhoneNumber.isValidMMPhoneNumber('09690000000')).toBe(true);
        });

        test('should return true for valid MEC numbers', () => {
            expect(myanmarPhoneNumber.isValidMMPhoneNumber('0930000000')).toBe(true);
        });

        test('should return false for invalid numbers', () => {
            expect(myanmarPhoneNumber.isValidMMPhoneNumber('09123')).toBe(false); // Too short
            expect(myanmarPhoneNumber.isValidMMPhoneNumber('09123456789012')).toBe(false); // Too long
            expect(myanmarPhoneNumber.isValidMMPhoneNumber('invalid')).toBe(false);
        });

        test('should throw error for empty input', () => {
            expect(() => myanmarPhoneNumber.isValidMMPhoneNumber('')).toThrow(
                'Please include phoneNumber parameter.',
            );
        });

        test('should handle Myanmar digits', () => {
            expect(myanmarPhoneNumber.isValidMMPhoneNumber('၀၉၉၇၀၀၀၀၀၀၀')).toBe(true);
        });
    });

    describe('getTelecomName', () => {
        test('should identify Ooredoo', () => {
            expect(myanmarPhoneNumber.getTelecomName('09970000000')).toBe(operators.OOREDOO);
        });

        test('should identify Atom', () => {
            expect(myanmarPhoneNumber.getTelecomName('09790000000')).toBe(operators.ATOM);
        });

        test('should identify MPT', () => {
            expect(myanmarPhoneNumber.getTelecomName('095123456')).toBe(operators.MPT);
        });

        test('should identify Mytel', () => {
            expect(myanmarPhoneNumber.getTelecomName('09690000000')).toBe(operators.MYTEL);
        });

        test('should identify MEC', () => {
            expect(myanmarPhoneNumber.getTelecomName('0931234567')).toBe(operators.MEC);
        });

        test('should return Unknown for unknown operators', () => {
            expect(myanmarPhoneNumber.getTelecomName('0912345678')).toBe(operators.UNKNOWN);
        });
    });

    describe('getPhoneNetworkType', () => {
        test('should identify GSM', () => {
            expect(myanmarPhoneNumber.getPhoneNetworkType('09970000000')).toBe(networkType.GSM); // Ooredoo
            expect(myanmarPhoneNumber.getPhoneNetworkType('09790000000')).toBe(networkType.GSM); // Atom
            expect(myanmarPhoneNumber.getPhoneNetworkType('09690000000')).toBe(networkType.GSM); // Mytel
        });

        test('should identify WCDMA (MPT)', () => {
            // Based on regex in MyanmarPhoneNumber.ts: /^(09|\+?959)(55\d{5}|25[2-4]\d{6}|26\d{7}|4(4|5|6)\d{7})$/
            expect(myanmarPhoneNumber.getPhoneNetworkType('095500000')).toBe(networkType.WCDMA);
        });

        test('should identify CDMA 450 (MPT)', () => {
            // Based on regex: /^(09|\+?959)(8\d{6}|6\d{6}|49\d{6})$/
            expect(myanmarPhoneNumber.getPhoneNetworkType('098000000')).toBe(networkType.CDMA_450);
        });

        test('should identify CDMA 800 (MPT)', () => {
            // Based on regex: /^(09|\+?959)(3\d{7}|73\d{6}|91\d{6})$/
            expect(myanmarPhoneNumber.getPhoneNetworkType('0973123456')).toBe(networkType.CDMA_800);
        });
    });

    describe('Sanitization and Normalization', () => {
        test('should sanitize input', () => {
            expect(myanmarPhoneNumber.sanitizeInput(' 09-970-000-000 ')).toBe('09970000000');
            expect(myanmarPhoneNumber.sanitizeInput('+959-970000000')).toBe('+959970000000');
        });

        test('should fix double country code', () => {
            // Logic: phoneNumber = phoneNumber.replace(/9595/, '95');
            // Regex: /^\+?95950?9\d{7,9}$/
            expect(myanmarPhoneNumber.sanitizeInput('9595970000000')).toBe('95970000000');
        });

        test('should fix zero before area code (The Bug Fix Check)', () => {
            // Logic: phoneNumber = phoneNumber.replace(/9509/, '959');
            // Regex: /^\+?9509\d{7,9}$/
            expect(myanmarPhoneNumber.sanitizeInput('9509970000000')).toBe('959970000000');
        });

        test('should normalize input', () => {
            expect(myanmarPhoneNumber.normalizeInput('+959970000000')).toBe('09970000000');
            expect(myanmarPhoneNumber.normalizeInput('959970000000')).toBe('09970000000');
        });
    });
});

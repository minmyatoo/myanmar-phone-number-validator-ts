# Myanmar Phone Number Validator

A TypeScript library to validate and extract information from Myanmar phone numbers.
It is based on the original JavaScript library created by [Kaung Myat Lwin](https://github.com/kaungmyatlwin/myanmar-phonenumber), which has been adapted and enhanced to support TypeScript.
## Installation

To install the package, run:

```shell
npm install myanmar-phone-number-validator
```

## Usage

The package exports a `myanmarPhoneNumber` object with the following functions:

`isValidMMPhoneNumber(phoneNumber: string): boolean`

Returns true if the input string is a valid Myanmar phone number, false otherwise.

```typescript
import {myanmarPhoneNumber} from 'myanmar-phone-number-validator';

const phoneNumber = '0949880111';
if (myanmarPhoneNumber.isValidMMPhoneNumber(phoneNumber)) {
    // Valid phone number
} else {
    // Invalid phone number
}
```

`getTelecomName(phoneNumber: string): string`

Returns the name of the telecom operator for the given phone number, or "Unknown" if the operator cannot be determined.

```typescript
import {myanmarPhoneNumber} from 'myanmar-phone-number-validator';

const phoneNumber = '0949880111';
const telecomName = myanmarPhoneNumber.getTelecomName(phoneNumber);
```

`getPhoneNetworkType(phoneNumber: string): string`

Returns the network type of the given phone number, or "Unknown" if the network type cannot be determined.

```typescript
import {myanmarPhoneNumber} from 'myanmar-phone-number-validator';

const phoneNumber = '0949880111';
const networkType = myanmarPhoneNumber.getPhoneNetworkType(phoneNumber);

```

## License

This project is licensed under the MIT License.

## Credit
This library is based on the original JavaScript library created by [Kaung Myat Lwin](https://github.com/kaungmyatlwin/myanmar-phonenumber). Thank you for your contribution bro!

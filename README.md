📞 **Myanmar Phone Number Validator** 🇲🇲

Validate and decode Myanmar phone numbers with ease using this TypeScript library! It's an evolution of the original JavaScript library by [Kaung Myat Lwin](https://github.com/kaungmyatlwin/myanmar-phonenumber), now enhanced to fully support TypeScript. 🚀

## Installation 📦

To install this package, simply run:

```shell
npm install myanmar-phone-number-validator
```

## Usage 🛠️

This package offers a `myanmarPhoneNumber` object packed with helpful functions:

- `isValidMMPhoneNumber(phoneNumber: string): boolean`: Verifies if a string is a valid Myanmar phone number, returning `true` for valid and `false` for invalid numbers.

```typescript
import { myanmarPhoneNumber } from 'myanmar-phone-number-validator';

const phoneNumber = '0949880111';
if (myanmarPhoneNumber.isValidMMPhoneNumber(phoneNumber)) {
    // It's a valid phone number!
} else {
    // Oops, invalid phone number!
}
```

- `getTelecomName(phoneNumber: string): string`: Retrieves the name of the telecom operator associated with a phone number, or "Unknown" if it can't be determined.

```typescript
import { myanmarPhoneNumber } from 'myanmar-phone-number-validator';

const phoneNumber = '0949880111';
const telecomName = myanmarPhoneNumber.getTelecomName(phoneNumber);
```

- `getPhoneNetworkType(phoneNumber: string): string`: Determines the network type of a phone number, returning "Unknown" if it can't be determined.

```typescript
import { myanmarPhoneNumber } from 'myanmar-phone-number-validator';

const phoneNumber = '0949880111';
const networkType = myanmarPhoneNumber.getPhoneNetworkType(phoneNumber);
```

## License 📜

This project operates under the MIT License.

## Credit 🙌

Huge thanks to [Kaung Myat Lwin](https://github.com/kaungmyatlwin/myanmar-phonenumber) for creating the original JavaScript library that inspired this one! 👏

import { myanmarPhoneNumber } from './MyanmarPhoneNumber';

const phoneNumber = '09750097500';

if (myanmarPhoneNumber.isValidMMPhoneNumber(phoneNumber)) {
    const networkType = myanmarPhoneNumber.getPhoneNetworkType(phoneNumber);
    const telecomName = myanmarPhoneNumber.getTelecomName(phoneNumber);
    console.log(`The phone number ${phoneNumber} is on the ${networkType} network and belongs to ${telecomName}.`);
} else {
    console.log(`Invalid phone number: ${phoneNumber}`);
}

import ValidatorRegex from '@/js/ValidatorRegex';
import Validator from '@/js/Validator';

export default {
    POSTAL_CODE: new Validator(ValidatorRegex.postalCode, true),
    EMAIL: new Validator(ValidatorRegex.email, true),
    NOT_EMPTY_STRING: new Validator(ValidatorRegex.nonEmptyString, true),
    NOT_EMPTY_STRING_NOT_REQUIRED: new Validator(ValidatorRegex.postalCode, false),
    NUMBER_REQUIRED: new Validator(ValidatorRegex.number, true),
    NUMBER_NOT_REQUIRED: new Validator(ValidatorRegex.number, false),
    PHONE_NUMBER: new Validator(ValidatorRegex.phoneNumber, true),
};
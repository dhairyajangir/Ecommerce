"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertArrayToObject = exports.compare = exports.defaultKeyToCompare = exports.findStateByCodeAndCountryCode = exports.findEntryByCode = void 0;
const findEntryByCode = (source, code) => {
    if (code && source != null) {
        const codex = source.findIndex((c) => {
            return c.isoCode === code;
        });
        return codex !== -1 ? source[codex] : undefined;
    }
    return undefined;
};
exports.findEntryByCode = findEntryByCode;
const findStateByCodeAndCountryCode = (source, code, countryCode) => {
    if (code && countryCode && source != null) {
        const codex = source.findIndex((c) => {
            return c.isoCode === code && c.countryCode === countryCode;
        });
        return codex !== -1 ? source[codex] : undefined;
    }
    return undefined;
};
exports.findStateByCodeAndCountryCode = findStateByCodeAndCountryCode;
function defaultKeyToCompare(entity) {
    return entity.name;
}
exports.defaultKeyToCompare = defaultKeyToCompare;
const compare = (a, b, 
// eslint-disable-next-line no-unused-vars
keyToCompare = defaultKeyToCompare) => {
    if (keyToCompare(a) < keyToCompare(b))
        return -1;
    if (keyToCompare(a) > keyToCompare(b))
        return 1;
    return 0;
};
exports.compare = compare;
const convertArrayToObject = (keys, arr) => {
    const result = arr.map((subArr) => {
        return Object.fromEntries(keys.map((key, index) => [key, subArr[index]]));
    });
    return result;
};
exports.convertArrayToObject = convertArrayToObject;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStateByCode = exports.getStateByCodeAndCountry = exports.getStatesOfCountry = exports.getAllStates = void 0;
const state_json_1 = __importDefault(require("./assets/state.json"));
const utils_1 = require("./utils");
// Get a list of all states.
function getAllStates() {
    return state_json_1.default;
}
exports.getAllStates = getAllStates;
// Get a list of states belonging to a specific country.
function getStatesOfCountry(countryCode = '') {
    if (!countryCode)
        return [];
    // get data from file or cache
    const states = state_json_1.default.filter((value) => {
        return value.countryCode === countryCode;
    });
    return states.sort(utils_1.compare);
}
exports.getStatesOfCountry = getStatesOfCountry;
function getStateByCodeAndCountry(stateCode, countryCode) {
    if (!stateCode)
        return undefined;
    if (!countryCode)
        return undefined;
    return (0, utils_1.findStateByCodeAndCountryCode)(state_json_1.default, stateCode, countryCode);
}
exports.getStateByCodeAndCountry = getStateByCodeAndCountry;
// to be deprecate
function getStateByCode(isoCode) {
    // eslint-disable-next-line no-console
    console.warn(`WARNING! 'getStateByCode' has been deprecated, please use the new 'getStateByCodeAndCountry' function instead!`);
    if (!isoCode)
        return undefined;
    return (0, utils_1.findEntryByCode)(state_json_1.default, isoCode);
}
exports.getStateByCode = getStateByCode;
function sortByIsoCode(countries) {
    return countries.sort((a, b) => {
        return (0, utils_1.compare)(a, b, (entity) => {
            return `${entity.countryCode}-${entity.isoCode}`;
        });
    });
}
exports.default = {
    getAllStates,
    getStatesOfCountry,
    getStateByCodeAndCountry,
    getStateByCode,
    sortByIsoCode,
};

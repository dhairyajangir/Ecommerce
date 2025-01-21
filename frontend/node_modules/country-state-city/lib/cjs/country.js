"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const country_json_1 = __importDefault(require("./assets/country.json"));
const utils_1 = require("./utils");
// Get a country by isoCode.
function getCountryByCode(isoCode) {
    if (!isoCode)
        return undefined;
    return (0, utils_1.findEntryByCode)(country_json_1.default, isoCode);
}
// Get a list of all countries.
function getAllCountries() {
    return country_json_1.default;
}
function sortByIsoCode(countries) {
    return countries.sort((a, b) => {
        return (0, utils_1.compare)(a, b, (entity) => {
            return entity.isoCode;
        });
    });
}
exports.default = {
    getCountryByCode,
    getAllCountries,
    sortByIsoCode,
};

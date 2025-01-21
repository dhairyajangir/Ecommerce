"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const city_json_1 = __importDefault(require("./assets/city.json"));
const utils_1 = require("./utils");
const KEYS = [
    "name",
    "countryCode",
    "stateCode",
    "latitude",
    "longitude"
];
let convertedCityList = [];
// Get a list of all cities.
function getAllCities(keys = KEYS) {
    if (convertedCityList.length) {
        return convertedCityList;
    }
    const cityJSON = city_json_1.default;
    convertedCityList = (0, utils_1.convertArrayToObject)(keys !== null && keys !== void 0 ? keys : KEYS, cityJSON);
    return convertedCityList;
}
// Get a list of cities belonging to a specific state and country.
function getCitiesOfState(countryCode, stateCode) {
    if (!stateCode)
        return [];
    if (!countryCode)
        return [];
    const cityList = getAllCities();
    const cities = cityList.filter((value) => {
        return value.countryCode === countryCode && value.stateCode === stateCode;
    });
    return cities.sort(utils_1.compare);
}
// Get a list of cities belonging to a specific country.
function getCitiesOfCountry(countryCode) {
    if (!countryCode)
        return [];
    const cityList = getAllCities();
    const cities = cityList.filter((value) => {
        return value.countryCode === countryCode;
    });
    return cities.sort(utils_1.compare);
}
function sortByStateAndName(cities) {
    return cities.sort((a, b) => {
        const result = (0, utils_1.compare)(a, b, (entity) => {
            return `${entity.countryCode}-${entity.stateCode}`;
        });
        if (result !== 0)
            return result;
        return (0, utils_1.compare)(a, b);
    });
}
exports.default = {
    getAllCities,
    getCitiesOfState,
    getCitiesOfCountry,
    sortByStateAndName,
};

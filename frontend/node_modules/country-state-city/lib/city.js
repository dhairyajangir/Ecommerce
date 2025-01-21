import cityList from './assets/city.json';
import { compare, convertArrayToObject } from './utils';
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
    const cityJSON = cityList;
    convertedCityList = convertArrayToObject(keys !== null && keys !== void 0 ? keys : KEYS, cityJSON);
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
    return cities.sort(compare);
}
// Get a list of cities belonging to a specific country.
function getCitiesOfCountry(countryCode) {
    if (!countryCode)
        return [];
    const cityList = getAllCities();
    const cities = cityList.filter((value) => {
        return value.countryCode === countryCode;
    });
    return cities.sort(compare);
}
function sortByStateAndName(cities) {
    return cities.sort((a, b) => {
        const result = compare(a, b, (entity) => {
            return `${entity.countryCode}-${entity.stateCode}`;
        });
        if (result !== 0)
            return result;
        return compare(a, b);
    });
}
export default {
    getAllCities,
    getCitiesOfState,
    getCitiesOfCountry,
    sortByStateAndName,
};

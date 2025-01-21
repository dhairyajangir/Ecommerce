import stateList from './assets/state.json';
import { findEntryByCode, findStateByCodeAndCountryCode, compare } from './utils';
// Get a list of all states.
export function getAllStates() {
    return stateList;
}
// Get a list of states belonging to a specific country.
export function getStatesOfCountry(countryCode = '') {
    if (!countryCode)
        return [];
    // get data from file or cache
    const states = stateList.filter((value) => {
        return value.countryCode === countryCode;
    });
    return states.sort(compare);
}
export function getStateByCodeAndCountry(stateCode, countryCode) {
    if (!stateCode)
        return undefined;
    if (!countryCode)
        return undefined;
    return findStateByCodeAndCountryCode(stateList, stateCode, countryCode);
}
// to be deprecate
export function getStateByCode(isoCode) {
    // eslint-disable-next-line no-console
    console.warn(`WARNING! 'getStateByCode' has been deprecated, please use the new 'getStateByCodeAndCountry' function instead!`);
    if (!isoCode)
        return undefined;
    return findEntryByCode(stateList, isoCode);
}
function sortByIsoCode(countries) {
    return countries.sort((a, b) => {
        return compare(a, b, (entity) => {
            return `${entity.countryCode}-${entity.isoCode}`;
        });
    });
}
export default {
    getAllStates,
    getStatesOfCountry,
    getStateByCodeAndCountry,
    getStateByCode,
    sortByIsoCode,
};

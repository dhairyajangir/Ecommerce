import countryList from './assets/country.json';
import { compare, findEntryByCode } from './utils';
// Get a country by isoCode.
function getCountryByCode(isoCode) {
    if (!isoCode)
        return undefined;
    return findEntryByCode(countryList, isoCode);
}
// Get a list of all countries.
function getAllCountries() {
    return countryList;
}
function sortByIsoCode(countries) {
    return countries.sort((a, b) => {
        return compare(a, b, (entity) => {
            return entity.isoCode;
        });
    });
}
export default {
    getCountryByCode,
    getAllCountries,
    sortByIsoCode,
};

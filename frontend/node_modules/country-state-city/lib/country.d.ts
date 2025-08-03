import { ICountry } from './interface';
declare function getCountryByCode(isoCode: string): ICountry | undefined;
declare function getAllCountries(): ICountry[];
declare function sortByIsoCode(countries: ICountry[]): ICountry[];
declare const _default: {
    getCountryByCode: typeof getCountryByCode;
    getAllCountries: typeof getAllCountries;
    sortByIsoCode: typeof sortByIsoCode;
};
export default _default;

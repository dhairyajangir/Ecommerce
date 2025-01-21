import { ICity } from './interface';
declare function getAllCities(keys?: string[]): ICity[];
declare function getCitiesOfState(countryCode: string, stateCode: string): ICity[];
declare function getCitiesOfCountry(countryCode: string): ICity[] | undefined;
declare function sortByStateAndName(cities: ICity[]): ICity[];
declare const _default: {
    getAllCities: typeof getAllCities;
    getCitiesOfState: typeof getCitiesOfState;
    getCitiesOfCountry: typeof getCitiesOfCountry;
    sortByStateAndName: typeof sortByStateAndName;
};
export default _default;

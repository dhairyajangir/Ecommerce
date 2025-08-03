import { ICountry, IState, ICity } from '../interface';
export declare const findEntryByCode: (source: any, code: string) => any;
export declare const findStateByCodeAndCountryCode: (source: any, code: string, countryCode: string) => any;
export declare function defaultKeyToCompare<T extends ICountry | IState | ICity>(entity: T): string;
export declare const compare: <T extends ICountry | IState | ICity>(a: T, b: T, keyToCompare?: (entity: T) => string) => 0 | 1 | -1;
export declare const convertArrayToObject: (keys: string[], arr: string[][]) => ICity[];

import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
    var Ziggy: ZiggyConfig;

    interface ObjectConstructor {
        groupBy<Item, Key extends PropertyKey>(
            items: Iterable<Item>,
            keySelector: (item: Item, index: number) => Key,
        ): Record<Key, Item[]>;
        keys<T>(item:T):(keyof T)[];
        values<T>(item:T):(T[keyof T])[];
        entries<T>(item:T):[keyof T,T[keyof T]][];
    }
}

type PlainObject = { [key: string | number]: string | number | boolean | undefined | null | PlainObject; };
type DotKeyOf<T extends object, Parent extends string = ""> = keyof T
    | (T[keyof T] extends object
        ? keyof T extends string
        ? keyof T[keyof T] extends string
        ? `${Parent}${keyof T}.${keyof T[keyof T]}`
        : `${Parent}${keyof T}`
        : never
        : never)
    | (T[keyof T] extends object
        ? keyof T extends string
            ? keyof T[keyof T] extends string
                ? T[keyof T][keyof (T[keyof T])] extends object
                    ? DotKeyOf<T[keyof T][keyof (T[keyof T])], `${Parent}${keyof T}.${keyof T[keyof T]}.`>
                    : 5
                : 4
            : 3
        : never);


type A = {
    a: {
        b1: { c1: 6; };
        b2: { c2: 6; };
    };
};
type B = DotKeyOf<A>;

export namespace InCompat {
    let str: string = "Hello";
    let num: number = 123;

    str = num; // ERROR: `number` is not assignable to `string`
    num = str; // ERROR: `string` is not assignable to `number`
}

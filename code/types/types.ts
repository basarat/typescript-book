export module typeannotations {
    var num: number = 123;
    function identity(num: number): number {
        return num;
    }
}

export module m1 {
    var num: number;
    var str: string;
    var bool: boolean;

    num = 123;
    num = 123.456;
    num = '123'; // Error

    str = '123';
    str = 123; // Error

    bool = true;
    bool = false;
    bool = 'false'; // Error
}

export module m2 {
    var boolArray: boolean[];

    boolArray = [true, false];
    console.log(boolArray[0]); // true
    console.log(boolArray.length); // 2
    boolArray[1] = true;
    boolArray = [false, false];

    boolArray[0] = 'false'; // Error!
    boolArray = 'false'; // Error!
    boolArray = [true, 'false']; // Error!
}

export module m3 {
    interface Name {
        first: string;
        second: string;
    }

    var name: Name;
    name = {
        first: 'John',
        second: 'Doe'
    };

    name = {           // Error : `second` is missing
        first: 'John'
    };
    name = {           // Error : `second` is the wrong type
        first: 'John',
        second: 1337
    };
}

export module m4 {
    var name: {
        first: string;
        second: string;
    };
    name = {
        first: 'John',
        second: 'Doe'
    };

    name = {           // Error : `second` is missing
        first: 'John'
    };
    name = {           // Error : `second` is the wrong type
        first: 'John',
        second: 1337
    };
}

module any {
    var power: any;

    // Takes any and all types
    power = '123';
    power = 123;

    // Is compatible with all types
    var num: number;
    power = num;
    num = power;
}

module null_undefined {
    var num: number;
    var str: string;

    // These literals can be assigned to anything
    num = null;
    str = undefined;

    // However they don't have a dedicated annotation
    foo: Null; // Error
    bar: Undefined; // Error
}

module void_ {
    function log(message): void {
        console.log(message);
    }
}

module generics {
    function reverse<T>(items: T[]): T[] {
        var toreturn = [];
        for (let i = items.length - 1; i >= 0; i--) {
            toreturn.push(items[i]);
        }
        return toreturn;
    }

    var sample = [1, 2, 3];
    var reversed = reverse(sample);
    console.log(reversed); // 3,2,1

    // Safety!
    reversed[0] = '1';     // Error!
    reversed = ['1', '2']; // Error!

    reversed[0] = 1;       // Okay
    reversed = [1, 2];     // Okay

    //////////////////////

    var strArr = ['1', '2'];
    var reversedStrs = reverse(strArr);

    reversedStrs = [1, 2]; // Error!

    ///
    var numArr = [1, 2];
    var reversedNums = numArr.reverse();

    reversedNums = ['1', '2']; // Error!
}

module union {
    function formatCommandline(command: string[]|string) {
        var line = '';
        if (typeof command === 'string') {
            line = command.trim();
        } else {
            line = command.join(' ').trim();
        }

        // Do stuff with line:string
    }
}

module tuple {
    var nameNumber: [string, number];

    // Okay
    nameNumber = ['Jenny', 8675309];

    // Error!
    nameNumber = ['Jenny', '867-5309'];

    var [name, num] = nameNumber;
}

module getset {

    var _value;
    function getOrSet(value) {
        if (value === undefined) {
            return _value;
        } else {
            _value = value;
        }
    }

    getOrSet(1); // set : 1
    console.log(getOrSet()); // get : 1
}

module getset_ {

    var _value;
    function getOrSet(): number;
    function getOrSet(value: number);
    function getOrSet(value?: number) {
        if (value === undefined) {
            return _value;
        } else {
            _value = value;
        }
    }

    getOrSet(1); // set : 1
    console.log(getOrSet()); // get : 1
}


module overload {

    function callMe(): number;
    function callMe(v1: number);
    function callMe(v1: string, v2: number);
    function callMe(v1?: any, v2?: any): any {
        // Implementation body goes here
    }

    // Allowed calls
    callMe();
    callMe(1);
    callMe('jenny', 5309);

    // ERROR: invalid calls:
    callMe('jenny');
    callMe('jenny', '5309');
}

module alias {
    type StrOrNum = string|number;

    var sample: StrOrNum;
    sample = 123;
    sample = '123';

    // Safety
    sample = true; // Error!
}

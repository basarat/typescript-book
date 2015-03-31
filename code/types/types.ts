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

    reversedStr = [1, 2]; // Error!
    
    /// 
    var numArr = [1, 2];
    var reversedNums = numArr.reverse();
    
    reversedNums = ['1', '2']; // Error!
}


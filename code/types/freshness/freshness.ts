export var foo = 123;


module first {
    function logName(something: { name: string }) {
        console.log(something.name);
    }

    var person = { name: 'matt', job: 'being awesome' };
    var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };
    var random = { note: `I don't have a name property` };

    logName(person); // okay
    logName(animal); // okay
    logName(random); // Error : property `name` is missing
}

module second {
    function logName(something: { name: string }) {
        console.log(something.name);
    }

    logName({ name: 'matt' }); // okay
    logName({ name: 'matt', job: 'being awesome' }); // Error: object literals must only specify known properties. `job` is excessive here.
}


module second {
    function logIfHasName(something: { name?: string }) {
        if (something.name) {
            console.log(something.name);
        }
    }
    var person = { name: 'matt', job: 'being awesome' };
    var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };
    var random = { note: `I don't have a name property` };

    logIfHasName(person); // okay
    logIfHasName(animal); // okay
    logIfHasName(random); // okay
    logIfHasName({neme: 'I just misspelled name to neme'}); // Error: object literals must only specify known properties. `neme` is excessive here.
}

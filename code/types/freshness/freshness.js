exports.foo = 123;
var first;
(function (first) {
    function logName(something) {
        console.log(something.name);
    }
    var person = { name: 'matt', job: 'being awesome' };
    var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };
    var random = { note: "I don't have a name property" };
    logName(person);
    logName(animal);
    logName(random);
})(first || (first = {}));
var second;
(function (second) {
    function logName(something) {
        console.log(something.name);
    }
    logName({ name: 'matt' });
    logName({ name: 'matt', job: 'being awesome' });
})(second || (second = {}));
var second;
(function (second) {
    function logIfHasName(something) {
        if (something.name) {
            console.log(something.name);
        }
    }
    var person = { name: 'matt', job: 'being awesome' };
    var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };
    var random = { note: "I don't have a name property" };
    logIfHasName(person);
    logIfHasName(animal);
    logIfHasName(random);
    logIfHasName({ neme: 'I just misspelled name to neme' });
})(second || (second = {}));

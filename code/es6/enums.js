"use strict";
exports.foo = 123;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var Color;
(function (Color) {
    Color[Color["DarkRed"] = 3] = "DarkRed";
    Color[Color["DarkGreen"] = 4] = "DarkGreen";
    Color[Color["DarkBlue"] = 5] = "DarkBlue";
})(Color || (Color = {}));
var col = Color.Red;
col = 0;
var Tristate;
(function (Tristate) {
    Tristate[Tristate["False"] = 0] = "False";
    Tristate[Tristate["True"] = 1] = "True";
    Tristate[Tristate["Unknown"] = 2] = "Unknown";
})(Tristate || (Tristate = {}));
var lie = Tristate.False;
var AnimalFlags;
(function (AnimalFlags) {
    AnimalFlags[AnimalFlags["None"] = 0] = "None";
    AnimalFlags[AnimalFlags["HasClaws"] = 1] = "HasClaws";
    AnimalFlags[AnimalFlags["CanFly"] = 2] = "CanFly";
})(AnimalFlags || (AnimalFlags = {}));
function printAnimalAbilities(animal) {
    var animalFlags = animal.flags;
    if (animalFlags & AnimalFlags.HasClaws) {
        console.log('animal has claws');
    }
    if (animalFlags & AnimalFlags.CanFly) {
        console.log('animal can fly');
    }
    if (animalFlags == AnimalFlags.None) {
        console.log('nothing');
    }
}
var animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal);
animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal);
animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal);
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal);
var EnumsWithStatics;
(function (EnumsWithStatics) {
    var Weekday;
    (function (Weekday) {
        Weekday[Weekday["Monday"] = 0] = "Monday";
        Weekday[Weekday["Tuesday"] = 1] = "Tuesday";
        Weekday[Weekday["Wednesday"] = 2] = "Wednesday";
        Weekday[Weekday["Thursday"] = 3] = "Thursday";
        Weekday[Weekday["Friday"] = 4] = "Friday";
        Weekday[Weekday["Saturday"] = 5] = "Saturday";
        Weekday[Weekday["Sunday"] = 6] = "Sunday";
    })(Weekday || (Weekday = {}));
    var Weekday;
    (function (Weekday) {
        function isBusinessDay(day) {
            switch (day) {
                case Weekday.Saturday:
                case Weekday.Sunday:
                    return false;
                default:
                    return true;
            }
        }
        Weekday.isBusinessDay = isBusinessDay;
    })(Weekday || (Weekday = {}));
    var mon = Weekday.Monday;
    var sun = Weekday.Sunday;
    console.log(Weekday.isBusinessDay(mon));
    console.log(Weekday.isBusinessDay(sun));
})(EnumsWithStatics || (EnumsWithStatics = {}));

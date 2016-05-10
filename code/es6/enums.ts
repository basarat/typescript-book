export var foo = 123;

enum Color {
    Red,
    Green,
    Blue
}

enum Color {
    DarkRed = 3,
    DarkGreen,
    DarkBlue
}

var col = Color.Red;
col = 0; // Effectively same as Color.Red


enum Tristate {
    False,
    True,
    Unknown
}

var lie = Tristate.False;

/*enum AnimalFlags {
    None           = 0,
    HasClaws       = 1 << 0,
    CanFly         = 1 << 1,
    EatsFish       = 1 << 2,
    Endangered     = 1 << 3
}*/

enum AnimalFlags {
    None           = 0,
    HasClaws       = 1 << 0,
    CanFly         = 1 << 1,
}

function printAnimalAbilities(animal) {
    var animalFlags = animal.flags;
    if (animalFlags & AnimalFlags.HasClaws) {
        console.log('animal has claws');
    }
    if (animalFlags & AnimalFlags.CanFly) {
        console.log('animal can fly');
    }
    if (animalFlags == AnimalFlags.None){
        console.log('nothing');
    }
}

var animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal); // animal has claws
animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal); // animal has claws, animal can fly


namespace EnumsWithStatics {
    enum Weekday {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    }
    namespace Weekday {
        export function isBusinessDay(day: Weekday) {
            switch (day) {
                case Weekday.Saturday:
                case Weekday.Sunday:
                    return false;
                default:
                    return true;
            }
        }
    }

    const mon = Weekday.Monday;
    const sun = Weekday.Sunday;
    console.log(Weekday.isBusinessDay(mon)); // true
    console.log(Weekday.isBusinessDay(sun)); // false
}

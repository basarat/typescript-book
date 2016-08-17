export namespace InCompat {
    let str: string = "Hello";
    let num: number = 123;

    str = num; // ERROR: `number` is not assignable to `string`
    num = str; // ERROR: `string` is not assignable to `number`
}

export namespace FunctionArgsCount {
    let iTakeSomethingAndPassItAnErr
        = (x: (err: Error, data: any) => void) => { /* do something */ };

    iTakeSomethingAndPassItAnErr(() => null) // Okay
    iTakeSomethingAndPassItAnErr((err) => null) // Okay
    iTakeSomethingAndPassItAnErr((err, data) => null) // Okay

    // ERROR: function may be called with `more` not being passed in
    iTakeSomethingAndPassItAnErr((err, data, more) => null)
}

export namespace FunctionReturnCo {
    /** Type Heirarchy */
    interface Point2D { x: number; y: number; }
    interface Point3D { x: number; y: number; z: number; }

    /** Two sample functions */
    let iMakePoint2D = (): Point2D => ({ x: 0, y: 0 });
    let iMakePoint3D = (): Point3D => ({ x: 0, y: 0, z: 0 });

    /** Assignment */
    iMakePoint2D = iMakePoint3D; // Okay
    iMakePoint3D = iMakePoint2D; // ERROR: Point2D is not assignable to Point3D
}

export namespace FunctionRest {
    let foo = (x:number, y: number) => { /* do something */ }
    let bar = (x?:number, y?: number) => { /* do something */ }
    let bas = (...args: number[]) => { /* do something */ }

    foo = bar = bas;
    bas = bar = foo;
}

export namespace FunctionArgsBi {
    /** Type Heirarchy */
    interface Point2D { x: number; y: number; }
    interface Point3D { x: number; y: number; z: number; }

    /** Two sample functions */
    let iTakePoint2D = (point: Point2D) => { /* do something */ }
    let iTakePoint3D = (point: Point3D) => { /* do something */ }

    iTakePoint3D = iTakePoint2D; // Okay : Reasonalble
    iTakePoint2D = iTakePoint3D; // Okay : WHAT
}

namespace NominalClassMemebers {
    /** A class hierarchy */
    class Animal { protected feet: number; }
    class Cat extends Animal { }

    let animal: Animal;
    let cat: Cat;

    animal = cat; // OKAY
    cat = animal; // OKAY

    /** Looks just like Animal */
    class Size { protected feet: number; }

    let size: Size;

    animal = size; // ERROR
    size = animal; // ERROR
}


export namespace invariance {
    /** Heirarchy */
    class Animal { constructor(public name: string){} }
    class Cat extends Animal { meow() { } }

    /** An item of each */
    var animal = new Animal("animal");
    var cat = new Cat("cat");

    /**
     * Demo : polymorphism 101
     * Animal <= Cat
     */
    animal = cat; // Okay
    cat = animal; // ERROR: cat extends animal

    /** Array of each to demonstrate variance */
    let animalArr: Animal[] = [animal];
    let catArr: Cat[] = [cat];

    /**
     * Obviously Bad : Contravariance
     * Animal <= Cat
     * Animal[] >= Cat[]
     */
    catArr = animalArr; // Okay if contravariant
    catArr[0].meow(); // Allowed but BANG 🔫 at runtime


    /**
     * Also Bad : covariance
     * Animal <= Cat
     * Animal[] <= Cat[]
     */
    animalArr = catArr; // Okay if covariant
    animalArr.push(new Animal('another animal')); // Just pushed an animal into catArr too!
    catArr.forEach(c => c.meow()); // Allowed but BANG 🔫 at runtime

}

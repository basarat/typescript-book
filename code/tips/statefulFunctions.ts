export var foo = 123;

class Called {
    count = 0;
    called = () => {
        this.count++;
        console.log(`Called : ${this.count}`);
    }
}

let {called} = new Called();

called(); // Called : 1
called(); // Called : 2

var Component = (function () {
    function Component(name) {
        this.name = name;
    }
    return Component;
}());
var Frame = (function () {
    function Frame(name, components) {
        this.name = name;
        this.components = components;
        this.pointer = 0;
    }
    Frame.prototype.next = function () {
        if (this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            };
        }
        else
            return {
                done: true
            };
    };
    return Frame;
}());
var frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
var iteratorResult1 = frame.next();
var iteratorResult2 = frame.next();
var iteratorResult3 = frame.next();
var iteratorResult4 = frame.next();
var iteratorResult5 = frame.next();
var component = iteratorResult1.value;

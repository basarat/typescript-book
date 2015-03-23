### Classes
The reason why its important to have classes in JavaScript as a first class item is that: 
1. People like to use classes
1. Provides a consistent way for developers to use classes instead of every framework (emberjs,reactjs etc) coming up with their own version.

```ts
class Point {
    constructor(public x: number, public y: number) {
    }
    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}

var p1 = new Point(0, 10);
var p2 = new Point(10, 20);
var p3 = p1.add(p2); // {x:10,y:30}
```

Finally JavaScript developers can *have class* :bowtie:. 

[](Classes support inheritance)
[](modifiers : public, private, protected)
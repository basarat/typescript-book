export var destructuring = true;


module m1 {
    var x = 1, y = 2;
    [x, y] = [y, x];
    console.log(x, y); // 1,2
}

module m2 {
    var rect = { x: 0, y: 10, width: 15, height: 20 };
    var {x, y, width, height} = rect;
    console.log(x, y, width, height); // 0,10,15,20
}

module m3 {
    var [x, y, ...remaining] = [1, 2, 3, 4];
    console.log(x, y, remaining); // 1, 2, [3,4]
}

module m3 {
    var [x, , ...remaining] = [1, 2, 3, 4];
    console.log(x, remaining); // 1, [3,4]
}

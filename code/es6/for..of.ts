export var forof = true;

module m0 {
    var someArray = [9, 2, 5];
    for (var item in someArray) {
        console.log(item);
    }
}

module m1 {
    var someArray = [9, 2, 5];
    for (var item of someArray) {
        console.log(item);
    }
}

module m2 {
    var hello = "is it me you're looking for?";
    for (var char of hello) {
        console.log(char); // is it me you're looking for?
    }
}

module m2 {
    let articleParagraphs = document.querySelectorAll("article > p");
    // Error: Nodelist is not an array type or a string type
    for (let paragraph of articleParagraphs) { 
        paragraph.classList.add("read");
    }
}
export module rest {
    function iTakeItAll(first, second, ...allOthers) {
        console.log(allOthers);
    }
    iTakeItAll('foo', 'bar'); // []
    iTakeItAll('foo', 'bar', 'bas', 'qux'); // ['bas','qux']    
}
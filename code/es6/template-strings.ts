export var templateStrings = '123';

module m1 {
    var lyrics = "Never gonna give you up \
\nNever gonna let you down";
    console.log(lyrics);
}

module m2 {
    var lyrics = `Never gonna give you up
Never gonna let you down`;
    console.log(lyrics);
}

module m3 {
    var lyrics = 'Never gonna give you up';
    var html = '<div>' + lyrics + '</div>';
}

module m4 {
    var lyrics = 'Never gonna give you up';
    var html = `<div>${lyrics}</div>`;
}

module m5 {
    console.log(`1 and 1 one make ${1 + 1}`);
}

module m6 {
    var say = "a bird in hand > two in the bush";
    var html = htmlEscape `<div> I would just like to say : ${say}</div>`
    
    // a sample tag function
    function htmlEscape(literals, ...placeholders) {
        let result = "";

        // Interleave the literals with the placeholders
        for (let i = 0; i < placeholders.length; i++) {
            result += literals[i];
            result += placeholders[i]
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        }

        // add the last literal
        result += literals[literals.length - 1];
        return result;
    }
    console.log(html);
}
export namespace Simple {
    let Tristate = {
        False: '',
        True: '',
        Unknown: ''
    };

    // make values same as keys
    Object.keys(Tristate).map((key) => Tristate[key] = key);


    /**
     * Usage
     */

    // Assigning
    let state = Tristate.True;

    // Checking if it matches
    if (state === Tristate.True) {

    }
}


export namespace Fancy {
    type TriState = 'False' | 'True' | 'Unknown';

    let state: TriState;
    state = 'False';
}


function myApp() {
    import(/* webpackChunkName: "momentjs" */ "moment")
        .then((moment) => {
            // lazyModule has all of the proper types, autocomplete works,
            // type checking works, code references work \o/
            const time = moment().format();
            console.log("TypeScript >= 2.4.0 Dynamic Import Expression:");
            console.log(time);
        })
        .catch((err) => {
            console.log("Failed to load moment", err);
        });
}

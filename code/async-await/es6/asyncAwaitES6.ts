function delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
            setTimeout(() => {
                resolve(count);
            }, milliseconds);
        });
}

// async function always return a Promise
async function dramaticWelcome(): Promise<void> {
    console.log("Hello");

    for (let i = 0; i < 5; i++) {
        // await is converting Promise<number> into number
        const count: number = await delay(500, i);
        console.log(count);
    }

    console.log("World!");
}

dramaticWelcome();
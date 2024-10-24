async function asyncMapper (array, asyncFunc, signal) {
    const promise = new Promise(async(resolve, reject) => {
        let count = 0
        const newArray = [];

        const counter = () => {
            count++;
            if (signal.aborted) {
                reject('aborted');
                return true;
            }
            if (count === array.length) {
                resolve(newArray);
            }
        }
        for (let i = 0; i < array.length; i++) {
            const value = await asyncFunc(array[i]);
            newArray[i] = value;
            if(counter()) return;
        }
    })
    const result = await promise.then((array) => {
        const errors = array.filter(result => result instanceof Error);
        if (errors.length > 0) {
            throw new AggregateError(errors, "MESSAGE");
        }
        return array;
    })
    return result
}

async function asyncDoubler (arg) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const isError = parseInt(Math.random() * 1.1);
            if (isError) resolve(new Error("number of isError is bigger than 0"));
            else resolve(arg * 2);
        }, Math.random() * 2000)
    })
}

const myArray = [1, 3, 6, 2, 6, 55];

const controller = new AbortController();
const { signal } = controller;

setTimeout(() => {
    controller.abort();
}, 9000);

(async () => {
    const newArray = await asyncMapper(myArray, asyncDoubler, signal);
    console.log(newArray);
})();

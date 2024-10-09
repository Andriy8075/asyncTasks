async function asyncMapper (array, asyncFunc, signal) {
    return new Promise((resolve, reject) => {
        let count = 0
        const newArray = [];

        const counter = () => {
            count++;
            if (count === array.length) {
                if (signal.aborted) reject('aborted');
                resolve(newArray);
            }
        }
        for (let i = 0; i < array.length; i++) {
            asyncFunc(array[i]).then((value) => {
                newArray[i] = value;
                counter()
            })
        }
    })
}

async function asyncDoubler (arg) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(arg*2);
        }, Math.random() * 2000)
    })
}

const myArray = [1, 3, 6, 2, 6, 55];

const controller = new AbortController();
const { signal } = controller;

setTimeout(() => {
    controller.abort();
}, 1800);

(async () => {
    try {
        const newArray = await asyncMapper(myArray, asyncDoubler, signal);
        console.log(newArray);
    }
    catch (err) {
        console.log(err);
    }
})();

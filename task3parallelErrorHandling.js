async function asyncMapper(array, asyncFunc, signal) {
      const promises = array.map(async (item) => {
        const result = await asyncFunc(item);
        if (signal.aborted) {
            throw new Error('aborted');
        }
        return result;
    });
    const newArray = await Promise.allSettled(promises);

    const errors = newArray.filter(result =>result.status === 'rejected').map(error => error.reason);
    if (errors.length > 0) {
        throw new AggregateError(errors, "MESSAGE");
    }
    return newArray.map(item => item.value);
}

async function asyncDoubler(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isError = parseInt(Math.random() * 1.8);
            if (isError) reject(new Error("number of isError is bigger than 0"));
            else resolve(arg * 2);
        }, Math.random() * 2000);
    });
}

const myArray = [1, 3, 6, 2, 6, 55];

const controller = new AbortController();
const { signal } = controller;

setTimeout(() => {
    controller.abort();
}, 2000);

(async () => {
    const newArray = await asyncMapper(myArray, asyncDoubler, signal);
    console.log(newArray);
})();

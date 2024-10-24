const asyncMapper = (array, asyncFunc) => {
    return Promise.all(array.map((item) => {
        return asyncFunc(item).catch(error => error);
    }));
}

const asyncDoubler = (arg) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isError = parseInt(Math.random() * 1.8);
            if (isError) reject(new Error("number of isError is bigger than 0"));
            resolve(arg * 2);
        }, Math.random() * 2000);
    });
}

const myArray = [1, 3, 6, 2, 6, 55];

asyncMapper(myArray, asyncDoubler).then(console.log);

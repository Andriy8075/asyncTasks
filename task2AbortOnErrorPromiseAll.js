const asyncMapper = (array, asyncFunc) => {
    return Promise.all(array.map(item =>
        asyncFunc(item).catch(error => ({ error }))
    )).then(results => {
        const errors = results.filter(result => result.error);
        if (errors.length) {
            return Promise.reject(errors.map(errorObj => errorObj.error));
        }
        return results;
    });
};

const asyncDoubler = (arg) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isError = parseInt(Math.random() * 1.1);
            if (isError) reject(new Error("number of isError is bigger than 0"));
            else resolve(arg * 2);
        }, Math.random() * 2000);
    });
};

const myArray = [1, 3, 6, 2, 6, 55];

asyncMapper(myArray, asyncDoubler).then(console.log, console.log);

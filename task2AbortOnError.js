const asyncMapper = (array, asyncFunc) => {
    return new Promise((resolve, reject) => {
        let count = 0
        const newArray = [];
        const errors = [];

        const callbackAfterEach = () => {
            count++;
            if (count === array.length) {
                if(errors.length) reject(errors);
                else resolve(newArray);
            }
        }
        for (let i = 0; i < array.length; i++) {
            asyncFunc(array[i]).then((value) => {
                newArray[i] = value;
                callbackAfterEach();
            },
            (error) => {
                errors.push(error);
                callbackAfterEach();
            });
        }
    })
}

const asyncDoubler = (arg) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isError = parseInt(Math.random() * 1.1);
            if (isError) reject(new Error("number of isError is bigger than 0"));
            else resolve(arg*2);
        }, Math.random() * 2000)
    })
}

const myArray = [1, 3, 6, 2, 6, 55];

asyncMapper(myArray, asyncDoubler).then(console.log, console.log);
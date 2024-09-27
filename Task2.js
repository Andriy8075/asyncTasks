const asyncMapper = (array, asyncFunc) => {
    return new Promise((resolve) => {
        let count = 0
        const newArray = [];

        const counter = () => {
            count++;
            if (count === array.length) {
                resolve(newArray);
            }
        }
        for (let i = 0; i < array.length; i++) {
            asyncFunc(array[i]).then((value) => {
                newArray[i] = value;
                counter()
            });
        }
    })
}

const asyncDoubler = (arg) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(arg*2);
        }, Math.random() * 2000)
    })
}

const myArray = [1, 3, 6, 2, 6, 55];

asyncMapper(myArray, asyncDoubler).then(console.log);
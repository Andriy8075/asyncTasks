const asyncMapper = (array, asyncFunction, callbackAfterAll, ...callbackArgs) => {
    const arrayLength = array.length;
    let counter = 0;

    const newArray = [];

    const callbackAfterEach = (index) => (element) => {
        counter++;
        newArray[index] = element;
        if (counter === arrayLength) callbackAfterAll(newArray, ...callbackArgs);
    }

    const cashIndex = (index) => {
        return callbackAfterEach(index);
    }

    for (let index = 0; index < arrayLength; index++) {
        const callbackWithIndex = cashIndex(index)
        asyncFunction(array[index], callbackWithIndex);
    }
}

const asyncDoubler = (arg, callback) => {
    setTimeout(() => {
        callback(arg*2)
    }, Math.random() * 2000)
}

const myArray = [1, 3, 6, 2, 6, 55]

asyncMapper(myArray, asyncDoubler, console.log);

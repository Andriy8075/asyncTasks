const asyncMapper = (array, asyncFunction, callbackAfterAll, ...callbackArgs) => {
    const arrayLength = array.length;
    let counter = 0;

    const newArray = [];

    const callbackAfterEach = (index) => (error, element) => {
        counter++;
        if (error) {
            newArray[index] = error;
            return;
        }
        newArray[index] = element;
        if (counter === arrayLength) callbackAfterAll(newArray, ...callbackArgs);
    }

    for (let index = 0; index < arrayLength; index++) {
        const callbackWithIndex = callbackAfterEach(index);
        asyncFunction(array[index], callbackWithIndex);
    }
}

const asyncDoubler = (arg, callback) => {
    setTimeout(() => {
        const isError = parseInt(Math.random() * 1.8);
        if(isError) callback(new Error("error in callback"));
        else callback(null, arg*2);
    }, Math.random() * 2000);
}

const myArray = [1, 3, 6, 2, 6, 55];

asyncMapper(myArray, asyncDoubler, console.log);

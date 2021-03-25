'use strict'

function MyArray() {
    this.length = 0;
}

MyArray.prototype.push = function push(value) {
    this[this.length] = value;
    return ++this.length;
};
MyArray.prototype.foreach = function foreach(callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i]);
    }
};
MyArray.prototype.pop = function pop() {
    if (this.length < 1) {
        return;
    }
    const deletedElement = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return deletedElement;
};
MyArray.prototype.some = function some(callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return true;
        }
    }
    return false;
}

MyArray.prototype.every = function every(callback) {
    for (let i = 0; i < this.length; i++) {
        if (!callback(this[i], i, this)) {
            return false;
        }
    }
    return true;
}
MyArray.prototype.map = function map(callback) {
    const newArr = [];
    for (let i = 0; i < this.length; i++) {
        newArr[i] = callback(this[i], i, this);
    }
    return newArr;
}
// MyArray.prototype.reduce = function (callback, initialValue, index = 0) {
//     let accumulator = initialValue ?? this[index];
//     index = (initialValue === undefined) ? 1 : index;
//     if (index < this.length) {
//         accumulator = this.reduce(callback, callback(accumulator, this[index]), ++index);
//     }
//     return accumulator;
// }

MyArray.prototype.reduce = function reduce(callback, initialValue) {
    let accumulator = initialValue ?? this[0];
    for (let i = (initialValue === undefined) ? 1 : 0; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
}

MyArray.prototype.flat = function flat(depth = 1) {
    const arr = [];
    let index = 0;//индекс нового массива
    const add = (value) => {
        if (value !== undefined) {//удаляем пустые слоты
            arr[index++] = value;
        }
    };
    const rebuild = (property, depth) => {//объединение подмассивов в массив
        for (let i = 0; i < property.length; i++) {//записываем значения из вложенного массива
            if (Array.isArray(property[i]) && depth > 0) {
                rebuild(property[i], --depth);
            } else {
                add(property[i]);
            }
        }
    };
    rebuild(this, depth)
    return arr;
}

const numbers = new MyArray();
numbers.push(1);
numbers.push(2);

// numbers.foreach(function (item) {
//     console.log(item);
// })

//console.log('deleted:' + numbers.pop());
//console.log(numbers);
//
//console.log(numbers.some((value) => value % 2 === 0));
//
//console.log(numbers.every((value) => value > 1));
//
// console.log(numbers.map((value) => value * value));
//
//console.log(numbers.reduce((accumulator, currentValue) => accumulator + currentValue));
//
//numbers.push([3, 4, 5, 6, [7, 8, [10, 11, 12, 13, 14, 15]]]);
//numbers.push([16, 17, 18, 19, 20])
//console.log(numbers.flat(2));
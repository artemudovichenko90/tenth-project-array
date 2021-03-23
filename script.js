'use strict'

function MyArray() {
    this.length = 0;
    MyArray.prototype.flat = function (depth = 1) {
        const arr = [];
        let index = 0;//индекс нового массива
        const add = (value) => {
            if (value !== undefined) {//удаляем пустые слоты
                arr[index++] = value;
            }
        };
        const rebuild = (property, depth) => {//уменьшение мерности исходного массива
            for (let i = 0; i < property.length; i++) {//записываем значения из вложенного массива
                if (Array.isArray(property[i]) && depth > 1) {
                    rebuild(property[i], --depth);
                } else {
                    add(property[i]);
                }
            }
        };

        for (let i = 0; i < this.length; i++) {//объединение подмассивов в массив
            if (Array.isArray(this[i])) {
                rebuild(this[i], depth);
            } else {
                add(this[i])
            }
        }
        return arr;
    }

}

MyArray.prototype.push = function (value) {
    this[this.length] = value;
    return ++this.length;
};
MyArray.prototype.foreach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i]);
    }
};
MyArray.prototype.pop = function () {
    const deletedElement = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return deletedElement;
};
MyArray.prototype.some = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            return true;
        }
    }
    return false;
}

MyArray.prototype.every = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (!callback(this[i])) {
            return false;
        }
    }
    return true;
}
MyArray.prototype.map = function (callback) {
    const newArr = [];
    for (let i = 0; i < this.length; i++) {
        newArr[i] = callback(this[i]);
    }
    return newArr;
}

MyArray.prototype.reduce = function (callback, initialValue) {
    initialValue = initialValue ?? this[0];
    for (let i = 1; i < this.length; i++) {
        initialValue = callback(initialValue, this[i]);
    }
    return initialValue;
}

const numbers = new MyArray();
// numbers.push(1);
// numbers.push(2);
// numbers.push(3);

// numbers.foreach(function (item) {
//     console.log(item);
// })
//
// console.log('deleted:' + numbers.pop());
// console.log(numbers);
//
// console.log(numbers.some((value) => value % 2 === 0));
//
// console.log(numbers.every((value) => value > 1));
//
// console.log(numbers.map((value) => value * value));
//
// console.log(numbers.reduce((accumulator, currentValue) => accumulator * currentValue, undefined));
//

numbers.push(1);
numbers.push(2);
numbers.push([3, 4, 5, 6, [7, 8, [10, 11, 12, 13, 14, 15]]]);
numbers.push([16, 17, 18, 19, 20])
console.log(numbers.flat(2));
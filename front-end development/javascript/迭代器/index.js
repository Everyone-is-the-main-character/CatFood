let iterable = [99, 9, 9, 982]
let iterator = iterable[Symbol.iterator]()
console.log(iterator)

for (let result = iterator.next(); !result.done; result = iterator.next()) {
    console.log(result.value)
}

// for 循环允许使用 return 中断循环

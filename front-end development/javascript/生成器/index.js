function* one() {
    yield 0
    yield 1
    yield 2
    yield 3
}

let oneObject = one()

console.log(oneObject)
console.log([...one()])

console.log(oneObject.next().value)
console.log(oneObject.next().value)
console.log(oneObject.next().value)
console.log(oneObject.next().value)
console.log(oneObject.next().done)

console.log(oneObject[Symbol.iterator]())
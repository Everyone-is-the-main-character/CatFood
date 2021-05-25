// 可迭代
class Range {
    constructor(from, to) {
        this.from = from
        this.to = to
    }

    has(x) {
        return typeof x === 'number' && this.from <= x && x >= this.to
    }

    toString() {
        return `{ x | ${this.from} <= x <= ${this.to} }`
    }

    // 通过返回一个迭代器对象，让 Range 对象可迭代
    // 注意这个方法的名字是一个特殊符号，不是字符串
    [Symbol.iterator]() {
        console.log('==')
        // 每一个迭代器实例必须相互独立，互不影响的迭代自己的范围
        // 因此需要一个状态变量跟踪迭代的位置，从第一个大于等于 from 的整数开始
        let next = Math.ceil(this.from)
        let last = this.to
        return {
            // 这个 next() 方法是迭代器对象的标志
            // 他必须返回一个迭代器结果
            next() {
                return (next <= last) ? { value: next++ } : { done: true }
            },

            [Symbol.iterator]() {
                return this
            }
        }
    }
}

function test(from, to) {
    return {
        [Symbol.iterator]() {
            let next = Math.ceil(from)
            let last = to
            return {
                next() {
                    return (next <= last) ? { value: next++ } : { done: true }
                }
            }
        }
    }
}

// 返回一个可迭代的对象，迭代的结果是对传入的可迭代对象的每个值应用 f()
function map(iterable, f) {
    let iterator = iterable[Symbol.iterator]()
    return {
        [Symbol.iterator]() { return this },
        next() {
            let v = iterator.next()
            if (v.done) {
                return v
            } else {
                return {
                    value: f(v.value)
                }
            }
        }
    }
}

function filter(iterable, predicate) {
    let iterator = iterable[Symbol.iterator]()
    return {
        [Symbol.iterator]() { return this },
        next() {
            for(;;) {
                let v = iterator.next()
                if (v.done || predicate(v.value)) {
                    return v
                }
            }
        }
    }
}

for (let x of new Range(1, 5)) {
    console.log(x)
}

for (let j of test(11, 15)) {
    console.log(j)
}

console.log([...test(95, 100)])

console.log([...map(new Range(6, 10), x => x * x)])

console.log([...filter(new Range(7, 10), x => x % 2 === 0)])

function words(s) {
    const r = /\s+|$/g // 匹配一个或多个空格或末尾
    r.lastIndex = s.match(/[^ ]/).index // 开始匹配第一个非空格
    return { // 返回一个可迭代的迭代对象
        [Symbol.iterator]() { return this }, // 迭代对象必须
        next() { // 迭代对象必须
            let start = r.lastIndex
            if (start < s.length) {
                let match = r.exec(s) // 匹配下一个单词边界
                if (match) {
                    return {
                        value: s.substring(start, match.index)
                    }
                }
            }
            console.log('到达终点')
            return { done: true }
        }
    }
}

console.log([...words(" jack luck dong Happy-no!! ! ")])
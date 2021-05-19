// 最外层循环控制的是内容循环次数
// 每一次比较的内容都是相邻俩者之间的大小关系

let BubbleSort = function(
    arr: number[],
    flag: boolean = false
): number[] {
    let len: number = arr.length

    for(let i = 0; i < len - 1; i++) {
        for(let j = 0; j < len - i - 1; j ++) {
            if(arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }

    return flag ? arr.reverse() : arr
}

let arr: number[] = [0, -1, 9, 89, 782, 3, 7, 90, 9, 1]
const res = BubbleSort(arr)
console.log(res)
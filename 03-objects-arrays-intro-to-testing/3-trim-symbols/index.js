/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {

    if (typeof size !== 'number') {
        console.error('The second argument(size) is not a number')
        return string
    }

    if (typeof size === undefined) {
        console.error('The second argument(size) is not defined')
        return string
    }

    if (typeof string === undefined) {
        console.error('The string is not defined')
        return
    }

    let arr = string.split('')
    let newStr = ''
    const newArr = []

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] === arr[i + 1])
            (i < size) && (newStr += arr[i])

        else {
            (i < size) && (newStr += arr[i])
            newArr.push(newStr)
            arr = arr.splice(i + 1, arr.length + 1)
            i = -1
            newStr = ''
        }
    }

    return newArr.join('')
}
/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    let newArray = []
    const compareStrings = (a, b) =>
        a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper' })

    arr.sort(compareStrings)
    newArray = (param === 'asc')
        ? arr
        : arr.reverse()

    return newArray
}
/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {

    const newArray = [...arr]

    const compareStrings = (a, b) =>
        (param === 'asc')
            ? a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper' })
            : b.localeCompare(a, ['ru', 'en'], { caseFirst: 'upper' })

    return newArray.sort(compareStrings)
}
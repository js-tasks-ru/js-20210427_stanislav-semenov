/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {

    if (obj === undefined)
        return

    const newObj = {}
    const arrayEl = Object.entries({ ...obj })

    for (const [key, value] of arrayEl) {
        if (typeof value === 'object')
            return console.error('object properties cannot be objects')
        newObj[value] = key
    }
    return newObj

}

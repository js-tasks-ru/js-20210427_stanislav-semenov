/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {

    if (obj === undefined)
        return undefined
    else {
        const newObj = {}

        for (const [key, value] of Object.entries({ ...obj })) {
            if (typeof value === 'object')
                return console.error('object properties cannot be objects')
            else newObj[value] = key
        }
        return newObj
    }
}

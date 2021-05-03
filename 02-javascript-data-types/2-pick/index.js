/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {

    const newObj = {}
    const arrayData = [...Object.entries(obj)]

    for (let field of fields) {
        for (let key of arrayData) {
            if (field === key[0]) newObj[field] = key[1]
        }
    }

    return newObj
}


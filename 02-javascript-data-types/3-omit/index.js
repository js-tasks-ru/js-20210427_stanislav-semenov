/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {

    const newObj = {}
    const arrayData = Object.entries(obj)

    for (let field of fields) {
        for (let i = 0; i < arrayData.length; i++) {
            if (field === arrayData[i][0])
                arrayData.splice(i, 1)
        }
    }
    for (let key of arrayData)
        newObj[key[0]] = key[1]

    return newObj
}


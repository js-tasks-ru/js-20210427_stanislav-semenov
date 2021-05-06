/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
function isEmpty(obj) {

    if (Object.keys(obj).length) {
        console.error('Object is empty or no Object ')
        return true
    }
    return
}

export function createGetter(path) {

    if (path === undefined) {
        console.error('no Path')
        return () => { }
    }

    const arrayKeys = path.split('.')

    return (obj) => {

        let value
        if (isEmpty(obj)) {

            value = { ...obj }

            for (const key of arrayKeys) {

                if (isEmpty(value))
                    value = value[key]
            }
        }
        return value
    }
}
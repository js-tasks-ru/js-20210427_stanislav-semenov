/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
function isEmpty(obj) {

    if (obj === undefined) {
        console.error('no Object ')
        return true
    }
    else {
        for (let key in obj) {
            return false;
        }
        console.error('Object is empty')
        return true
    }
}

export function createGetter(path) {

    if (path === undefined) {
        console.error('no Path')
        return {}
    }
    else
        return (obj) => {
            let value
            if (!isEmpty(obj)) {

                value = { ...obj }

                for (const key of path.split('.')) {
                    if (!isEmpty(value))
                        value = value[key]
                }
            }
            return value
        }
}
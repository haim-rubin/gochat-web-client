export const getStorage = (namespace = '') => {
    const getKey = key => (
        namespace? `${namespace}_${key}`: key
    )

    return {

        get(key) {
            const value = localStorage.getItem(getKey(key))
            return value && JSON.parse(value)
        },

        set(key, value) {
            localStorage.setItem(getKey(key), typeof value === 'string'? value : JSON.stringify(value))
        }
    }
}
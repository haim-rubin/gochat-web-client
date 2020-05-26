export const getQueryURL = (query) => {
    query = query || window.location.search
    return (
        query
            .replace('?','')
            .split('&')
            .map(pair => pair.split('='))
            .reduce((obj, [key, value]) => ({...obj, [key]: value }), {})
    )
}
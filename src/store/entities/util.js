export const toNumber = value => (
    isNaN(value)
    ? 0
    : Number.parseInt(value)
)
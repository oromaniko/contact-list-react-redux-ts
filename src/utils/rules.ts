export const rules = {
    required: (min: number) => ({
        required: true,
        min,
    }),
    max: (max: number) => ({
        max,
    }),
}

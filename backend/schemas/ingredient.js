export default {
    name: 'ingredientAdmin',
    title: 'IngredientAdmin',
    type: 'document',
    fields: [
        {
            name: 'ingAdminName',
            title: 'IngAdminName',
            type: 'string',
        },
        {
            name: 'baseSize',
            title: 'BaseSize',
            type: 'array',
            of: [{ type: 'baseSize' }]
        }
    ]
};

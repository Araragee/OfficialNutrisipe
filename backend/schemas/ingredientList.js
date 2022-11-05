export default {
    name: 'ingredientList',
    title: 'IngredientList',
    type: 'document',
    fields: [
        {
            name: 'ingredientName',
            title: 'IngredientName',
            type: 'string',
        },
        {
            name: 'metric',
            title: 'BaseSize',
            type: 'string',
            
        },
        {
            name: 'amount',
            title: 'IngredientAmount',
            type: 'number',
        }
    ]
};

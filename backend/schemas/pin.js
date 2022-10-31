export default {
  name: 'pin',
  title: 'Pin',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'about',
      title: 'About',
      type: 'string',
    },
    {
      name: 'procedure',
      title: 'Procedure',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'userId',
      title: 'UserId',
      type: 'string',
    },
    {
      name: 'ingredient',
      title: 'Ingredient',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'ingredientVal',
      title: 'Ingredient Value',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'metric',
      title: 'Metric ',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy',
    },
    {
      name: 'save',
      title: 'Save',
      type: 'array',
      of: [{ type: 'save' }],
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{ type: 'comment' }],
    },
    {
      title: "Created At",
      name: "created_at",
      type: "datetime",
    },
  ],
};

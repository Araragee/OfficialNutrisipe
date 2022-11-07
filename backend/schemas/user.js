export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'UserName',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
    },
    {
       name: 'id',
       title: 'ID',
       type: 'string',
    },
    {
      title: "Following",
      name: "follow",
      type: "array",
      of: [
        {type: 'save'}
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: "Created At",
      name: "created_at",
      type: "datetime",
    },
    {
      name: "isAdmin",
      title: "IsAdmin",
      type: "boolean",
    },
  ],
};

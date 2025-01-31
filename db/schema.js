import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'accounts',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'cap', type: 'number'},
        { name: 'tap', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'users',
      columns: [
        { name: 'username', type: 'string' },
        { name: 'email', type: 'string'},
        { name: 'avatar', type: 'string' },
        { name: 'tutorial_completed', type: 'boolean'},
        { name: 'in_group', type: 'boolean' },
      ]
    }),
  ]
})
exports.seed = function(knex, Promise) {
  return knex('holidays').del()
    .then(() => knex('types').del())
    .then(() => {
      return Promise.all([
        knex('types').insert([
          {
          id: 1,
          type: 'activity'
          },
          {
            id: 2,
            type: 'drinking'
          },
          {
            id: 3,
            type: 'food'
          }], 'id')
        .then(type => {
          return knex('holidays').insert([
            {
              id: 1,
              name: 'National Relaxation Day',
              fullDate: 'August 15',
              month: 'August',
              type_id: type[0]
            },
            {
              id: 2,
              name: 'National Red Wine Day',
              fullDate: 'August 28',
              month: 'August',
              type_id: type[1]
            },
            {
              id: 3,
              name: 'National Taco Day',
              fullDate: 'October 4',
              month: 'October',
              type_id: type[2]
            },
            {
              id: 4,
              name: 'National Pasta Day',
              fullDate: 'October 17',
              month: 'October',
              type_id: type[2]
            },
            {
              id: 5,
              name: 'Halloween',
              fullDate: 'October 31',
              month: 'October',
              type_id: type[0]
            }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

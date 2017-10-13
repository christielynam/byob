const holidayData = require('../data/unofficial_holiday');

const mappedData = holidayData.map(el => {
  return Object.assign({}, {name: el[0], date: el[1], type: el[2]});
});

const typesArray = [
  'activity',
  'career',
  'cause',
  'drinking',
  'environmental',
  'ethnic',
  'family',
  'fashion',
  'food',
  'health',
  'historical',
  'pet',
  'pop-culture',
  'relationship',
  'shopping',
  'technology'
];

const createType = (knex, type) => {

  return knex('types').insert({
    type
  }, '*')
    .then(result => {
      let holidayPromises = [];

      let filteredHolidays = mappedData.filter(holiday => {
        return holiday.type === result[0].type;
      });

      filteredHolidays.forEach(holiday => {

        holidayPromises.push(
          createHoliday(knex, {
            name: holiday.name,
            fullDate: holiday.date,
            month: holiday.date.split(' ')[0],
            type_id: result[0].id
          })
        );
      });
      return Promise.all(holidayPromises);
    });
};

const createHoliday = (knex, holiday) => {
  return knex('holidays').insert(holiday);
};


exports.seed = (knex, Promise) => {
  return knex('holidays').del()
    .then(() => knex('types').del())
    .then( () => {

      let typePromises = [];

      typesArray.forEach(type => {
        typePromises.push(createType(knex, type));
      });

      return Promise.all(typePromises);

    })
    /* eslint-disable no-alert, no-console */
    .catch(error => console.log(`Error seeding data: ${error}`));
    /* eslint-enable no-alert, no-console */
};

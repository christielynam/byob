const holidayData = require('../../../unofficial_holiday');

const mappedData = holidayData.map(el => {
  return Object.assign({}, name: el[0], date: el[1], type: el[2])
})

const createDate = (knex, holiday) => {
  const month = holiday.date.split(' ')[0];
  const day = holiday.date.split(' ')[1];
  return knex('dates').insert({
    month: month,
    day: day
  }, 'id')
  .then(dateId => {
    let holidayPromises = [];
  })
}


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('holidays').del()
    .then(() => knex('dates').del())
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};

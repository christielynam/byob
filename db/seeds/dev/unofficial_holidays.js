const holidayData = require('../data/unofficial_holiday');

const mappedData = holidayData.map(el => {
  return Object.assign({}, {name: el[0], date: el[1], type: el[2]})
})

const createDate = (knex, date) => {
  const month = date.date.split(' ')[0];

  return knex('dates').insert({
    fullDate: date.date,
    month: month
  }, 'id')

  .then(dateId => {
    let datePromises = [];

    mappedData.forEach((holiday) => {

      datePromises.push(
        createHoliday(knex, {
          name: holiday.name,
          type: holiday.type,
          // date_id: dateId
        })
      )
    })
    return Promise.all(datePromises);
  })
};

const createHoliday = (knex, holiday) => {
  return knex('holidays').insert(holiday)
}


exports.seed = function(knex, Promise) {
  return knex('holidays').del()
    .then(() => knex('dates').del())
    .then( () => {

      let datePromises = []

      mappedData.forEach(date => {
        datePromises.push(createDate(knex, date))
      })

      return Promise.all(datePromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};

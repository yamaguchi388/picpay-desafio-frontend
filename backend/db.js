const { faker } = require('@faker-js/faker');

function generatePayments() {
  let payments = [];
  for (let i = 0; i < 20; i += 1) {
    payments.push({
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      title: faker.name.jobTitle(),
      value: faker.finance.amount(),
      date: faker.datatype.datetime(),
      isPayed: faker.datatype.boolean(),
    });
  }
  return payments;
}

generateDb = () => {
  let users = [{
    uuid: faker.datatype.uuid(),
    name: 'usuario',
    email: 'usuario@email.com',
    password: 'usuario',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c3VhcmlvMSIsInNlbmhhIjoiMTIzIn0.Pu_q8I5wAFYKMoRHx89SALV2zRE9YvfmF6WYthpDLbU'
  }];
  let payments = generatePayments();

  return { users, payments };
}

module.exports = generateDb;
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Participants', [
      {
        number: 1,
        name: 'Gonzalo',
        winner: false,
        phone: 123456789,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 1,
        name: 'Angela',
        winner: false,
        phone: 123456789,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 1,
        name: 'Dominga',
        winner: false,
        phone: 123456789,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 1,
        name: 'Prueba',
        winner: true,
        phone: 123456789,
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Participants', null, {})
};
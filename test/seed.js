module.exports = function seed(models) {
    return models.User.create({
      firstName: 'Jared',
      lastName: 'Palmer',
      email: 'jared@blah.com',
      password: 'pass1234'
    })
  .catch(e => console.log(e))
}
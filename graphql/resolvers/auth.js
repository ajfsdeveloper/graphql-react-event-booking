const bcrypt = require('bcryptjs')

const User = require('../../models/user')

module.exports = {
  createUser: async args => {
    try {
      const user = await User.findOne({ email: args.userInput.email })

      if (user) {
        throw new Error('User exists already!')
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)

      const userO = new User({
        email: args.userInput.email,
        password: hashedPassword
      })

      const result = await userO.save()
      return {
        ...result._doc,
        password: null,
        _id: result.id
      }
    }
    catch (err) {
      throw err
    }
  }
}

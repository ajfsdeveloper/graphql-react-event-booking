const Event = require('../../models/event')

const { transformEvent } = require('./merge')

module.exports = {
  events: async () => {
    try {
      const events = await Event.find()

      return events.map(event => {
        return transformEvent(event)
      })
    } catch (err) {
      throw err
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5c2879dfd1096625a8b5982e'
    })

    let createdEvent

    try {
      const result = await event.save()

      createdEvent = transformEvent(result)

      const userFetched = await User.findById('5c2879dfd1096625a8b5982e')

      if (!userFetched) {
        throw new Error('User not found!')
      }

      userFetched.createdEvents.push(event)

      userFetched.save()

      return createdEvent
    }
    catch (err) {
      throw err
    }
  }
}
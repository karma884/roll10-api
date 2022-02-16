const bcrypt = require("bcrypt");

class Users {
  constructor(collection) {
    this.collection = collection;
  }
  async findById(_id) {
    try {
      await this.collection.findOne({ _id: _id.toString() });
      return { _id: _id.toString() };
    } catch (error) {
      return { error };
    }
  }

  async create(user) {
    try {
      user.password = await bcrypt.hash(user.password, 10);

      const result = await this.collection.insertOne(user);

      const { name, _id } = await this.collection.findOne({
        _id: result.insertedId,
      });

      return { name, _id: _id.toString() };
    } catch (error) {
      return { error };
    }
  }
}

module.exports = { Users };

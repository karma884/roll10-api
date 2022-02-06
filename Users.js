class User {
  constructor(collection) {
    this.collection = collection;
  }
  async create(user) {
    try {
      user.password = await bcrypt.hash(user.password, 10);

      await collection.insertOne(user);

      return "success yay";
    } catch {
      return "failure noo";
    }
  }
}

module.exports = { Users };

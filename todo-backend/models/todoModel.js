const connection = require("../config/connection");
const { ObjectId } = require("mongodb");

const getAll = async () =>
  connection().then((db) => db.collection("todos").find().toArray());

const create = async (props) => {
  const { task, completed, deleted, date } = props;
  const insertTask = await connection().then((db) =>
    db.collection("todos").insertOne({ task, completed, deleted, date })
  );

  return { _id: insertTask.insertedId, task, date };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) =>
    db.collection("todos").findOne(ObjectId(id))
  );
};

const update = async ({ id, task, completed, deleted, date }) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection().then((db) =>
    db
      .collection("todos")
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { task, completed, deleted, date } }
      )
  );
  return result;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection().then((db) =>
    db.collection("todos").deleteOne({ _id: ObjectId(id) })
  );
  return result;
};

const excludeTasks = async () => {
  const result = await connection().then((db) =>
    db.collection("todos").remove({ deleted: true })
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  excludeTasks,
};

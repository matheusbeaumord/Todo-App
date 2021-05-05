const Todo = require("../models/todoModel");

const getAllTasks = async (_req, res) => {
	try {
		const results = await Todo.getAll();

		res.status(200).json(results);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

const createTask = async (req, res) => {
	try {
		const task = req.body;
		const result = await Todo.create(task);

		res.status(201).json(result);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

const getTaskById = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Todo.getById(id);
		console.log(result);

		res.status(200).json(result);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

const updateTask = async (req, res) => {
	try {
		const { task, completed, deleted, date } = req.body;
		const { id } = req.params;

		const result = await Todo.update({ id, task, completed, deleted, date });
		if (!result) {
			res.status(404).json({ message: "Tarefa não encontrada :(" });
			return;
		}

		res.status(200).json({ id, task, completed, deleted, date });
	} catch (e) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

const deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Todo.exclude(id);

		res.status(204).end();
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

const removeTasks = async (req, res) => {
	try {
		// const {deleted} = req.body;
		await Todo.excludeTasks();
		res.status(204).end();
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	getAllTasks,
  createTask,
	getTaskById,
	updateTask,
	deleteTask,
	removeTasks
};
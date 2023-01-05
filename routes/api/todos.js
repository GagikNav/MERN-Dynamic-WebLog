const express = require('express');
const router = express.Router();
const app = express();
const { check, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const Filter = require('bad-words');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// filter for bad words
filter = new Filter();

//  middleware for limiting requests
const speedLimiter = slowDown({
	windowMs: 1 * 60 * 1000, // ********************
	delayAfter: 50, // ********************
	delayMs: 500, // ********************
});
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // ********************
	max: 1000, // ********************
});

// Accessing to db models
const Todos = require('../models/Todos');

// Middleware
app.set('trust proxy');
app.set('trust proxy', 1);
app.use(express.json());

// @route       Get api/todos
// @desc        Getting all todos
// @access      Public

router.get('/', limiter, speedLimiter, async (req, res) => {
	try {
		const todos = await Todos.find().sort('-date').limit(10);
		return res.json(todos);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error getting todos');
	}
});

// @route       Get api/todos
// @desc        Getting last todos
// @access      Public

router.get('/lts', limiter, speedLimiter, async (req, res) => {
	try {
		const item = await Todos.find().sort('-date').limit(1);

		console.log(req.params);
		res.json(item);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error getting todos');
	}
});

// @route       Get api/todos
// @desc        Getting Specific todos
// @access      Public

router.get('/:id', limiter, speedLimiter, async (req, res) => {
	try {
		const item = await todos.findById(req.params.id);
		if (item === null)
			return res.status(404).json({ msg: `todos with id of ${req.params.id} not found` });
		res.json(item);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error getting todos');
	}
});

// @route       Delete api/todos
// @desc        Delete Specific todos and //! Delete !//
// @access      Public

router.delete('/:id', limiter, speedLimiter, async (req, res) => {
	try {
		const item = await Todos.findByIdAndDelete(req.params.id);
		if (item === null)
			return res.status(404).json({ msg: `todos with id of ${req.params.id} not found` });
		return res.status(204).json({ msg: `todos with id of ${req.params.id} deleted` });
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error getting todos');
	}
});

// @route       todos api/todos
// @desc       Adding a todos
// @access   Public

router.post(
	'/',
	[check('title', 'Title is required').not().isEmpty()],
	limiter,
	speedLimiter,

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { title, completed } = req.body;
		try {
			let todos = new Todos({
				title: filter.clean(DOMPurify.sanitize(title)),
				completed: false,
			});
			await todos.save();
			return res.status(200).json({ msg: 'todos added' });
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error adding todos');
		}
	}
);

// @route       PATCH api/todos
// @desc       Editing a todos
// @access   Public

router.patch(
	'/:id',
	limiter,
	speedLimiter,
	[
		check('title', 'Title is required').not().isEmpty(),
		check('completed', 'completed field is required').isBoolean(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { title, completed } = req.body;
		try {
			let updatedItem = await Todo.updateOne(
				{ _id: req.params.id },
				{
					$set: {
						title: filter.clean(DOMPurify.sanitize(title)),
						completed,
					},
				}
			);
			return res.status(200).json({ msg: `todos with id of ${req.params.id} updated` });
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error updating todos');
		}
	}
);
module.exports = router;


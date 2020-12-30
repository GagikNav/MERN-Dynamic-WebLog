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

//  middlewares for limiting requests
const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000,  // ********************
  delayAfter: 50,           // ********************
  delayMs: 500,             // ********************
});
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // ********************
  max: 1000,                // ********************                      
});

// Accessing to db models
const Posts = require('../models/Posts');

// Middleware
app.set('trust proxy');
app.set('trust proxy', 1);
app.use(express.json());

// @route       Get api/posts
// @desc        Getting all posts
// @access      Public

router.get('/', limiter, speedLimiter, async (req, res) => {
  try {
    const posts = await Posts.find().sort('-date').limit(10);
    return res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error getting posts');
  }
});

// @route       Get api/posts
// @desc        Getting last post
// @access      Public

router.get('/lts', limiter, speedLimiter, async (req, res) => {
  try {
    const item = await Posts.find().sort('-date').limit(1);
    
    console.log(req.params);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error getting posts');
  }
});

// @route       Get api/posts
// @desc        Getting Specific post
// @access      Public

router.get('/:id', limiter, speedLimiter, async (req, res) => {
  try {
    const item = await Posts.findById(req.params.id);
    console.log(req.params);

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error getting posts');
  }
});

// @route       Delete api/posts
// @desc        Delete Specific post and //! Delete !//
// @access      Public

router.delete('/:id', limiter, speedLimiter, async (req, res) => {
  try {
    const item = await Posts.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ msg: `post ${item} with id of ${req.params.id} deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error getting posts');
  }
});

// @route       POST api/posts
// @desc       Adding a posts
// @access   Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('postTitle', 'Title is required at least 10 characters').isLength({
      min: 5,
      max: 1000,
    }),
    check('postBody', 'Text is required at least 30 characters').isLength({
      min: 5,
      max: 5000,
    }),
    check('imgIndex').not().isEmpty(),
  ],
  limiter,
  speedLimiter,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, postTitle, postBody, imgIndex } = req.body;
    try {
      let posts = new Posts({
        name: filter.clean(DOMPurify.sanitize(name)),
        postTitle: filter.clean(DOMPurify.sanitize(postTitle)),
        postBody: filter.clean(DOMPurify.sanitize(postBody)),
        imgIndex: imgIndex,
      });
      await posts.save();
      return res.status(200).json({ msg: 'post added' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error adding post');
    }
  },
);

// @route       PATCH api/posts
// @desc       Editing a posts
// @access   Public

router.patch(
  '/:id',
  limiter,
  speedLimiter,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('postTitle', 'Title is required at least 10 characters').isLength({
      min: 5,
      max: 1000,
    }),
    check('postBody', 'Text is required at least 30 characters').isLength({
      min: 5,
      max: 5000,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, postTitle, postBody, imgIndex } = req.body;
    try {
      let updatedItem = await Posts.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: filter.clean(DOMPurify.sanitize(name)),
            postTitle: filter.clean(DOMPurify.sanitize(postTitle)),
            postBody: filter.clean(DOMPurify.sanitize(postBody)),

          },
        },
      );
      return res
        .status(200)
        .json({ msg: `post with id of ${req.params.id} updated` });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error updating post');
    }
  },
);
module.exports = router;

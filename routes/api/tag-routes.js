const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          through: ProductTag,
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          through: ProductTag,
        },
      ],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// PUT update a tag's name by ID
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE a tag by its ID
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Tag deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

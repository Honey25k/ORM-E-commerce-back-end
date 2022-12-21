const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    res.status(200).json(allTags);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Failed to get all tags." });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const { id } = req.params;
    const singleTag = await Tag.findByPk(id, {
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    if (!singleTag) {
      res.status(404).json({ message: "No tag found with this id." });
    }
    res.status(200).json(singleTag);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to get tag." });
  }
  
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const { tag_name } = req.body;
    const newTag = await Tag.create({ tag_name });

    if (!newTag) {
      res
        .status(404)
        .json({ message: "No tag with this id. Please provide a tag name." });
    }

    res
      .status(200)
      .json({ message: "A new tag has been successfully created." });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Failed to create tag. Please try again later." });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const { tag_name } = req.body;
    const { id } = req.params;

    const updateTagName = await Tag.update({ tag_name }, { where: { id } });

    if (!updateTagName) {
      res
        .status(404)
        .json({ message: "No tag found. Please provide a correct tag name." });
    }
    res.status(200).json({ message: "Successfully updated tag." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update tag. Please try again later" });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const { id } = req.params;

    const deleteTag = await Tag.destroy({
      where: { id },
    });

    if (!deleteTag) {
      res.status(404).json({ error: "Tag does not exist" });
    }

    res.status(200).json({ message: "Successfully deleted tag." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tag" });
  }
});

module.exports = router;

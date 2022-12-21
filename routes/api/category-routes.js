const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    return res.json(allCategories);
  } catch (error) {
    console.log(`[ERROR] - ${error.message}`);
    return res.status(500).json({ error: "Failed to get categories." });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["product_name", "price", "stock"],
        },
      ],
    

    });
    
    if (!singleCategory) {
      return res.status(404).json({
        error: "No category found with this id.",
      });
    }

    return res.status(200).json(singleCategory);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to get category.",
    });
  }
});



router.post('/', async (req, res) => {
  // create a new category
  try {
    
    const { category_name } = req.body;

    const newCategory = await Category.create({
      category_name,
    });
    res
      .status(200)
      .json({ message: "New category has been successfully created." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to create category." });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const { id } = req.params;
    const { category_name } = req.body;
    const category = await Category.update(
      { category_name },
      { where: { id } }
    );
    res.status(200).json({ message: "Updated category successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error. Your category couldn't be updated." });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ message: "Category deleted." });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to delete category.",
    });
  }
});

module.exports = router;

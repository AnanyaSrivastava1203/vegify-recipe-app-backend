const Category = require("../model/categoryModel");
const Item = require("../model/ItemModel");

const getCategory = async (req, res) => {
  const { category } = req.params;
//   console.log(req.params);

  try {
    // Find the category by its name
    const categoryData = await Category.findOne({ name: category });
    console.log("Category Data:", categoryData);
    
    if (!categoryData) {
        // If the category itself doesn't exist
        return res.status(404).json({ message: "Category not found!" });
      }
    
    // Fetch all items for the given category
    const items = await Item.find({ category: { $regex: categoryData.name, $options: 'i' } });
    console.log("Items Found:", items);
    console.log("Total Items Count:", items.length);

    if (items.length === 0) {
      // If no items are associated with the category
      return res.status(200).json({ message: "No items found for this category!" });
    }

  

    // Respond with all items for the category
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching category data:", error);
    res.status(500).json({ message: "Server error occurred!" });
  }
};

module.exports = {
  getCategory,
};

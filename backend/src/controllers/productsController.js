const { readData } = require('../utils/storage');

const getProducts = async (req, res) => {
  try {
    let products = await readData('products.json', []);
    const { category, search, sort, limit, minPrice, maxPrice } = req.query;

    if (category && category !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase().trim();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.desc && p.desc.toLowerCase().includes(q)) ||
        (p.notes && p.notes.toLowerCase().includes(q)) ||
        (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q))
      );
    }

    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        products = products.filter(p => p.price >= min);
      }
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        products = products.filter(p => p.price <= max);
      }
    }

    if (sort) {
      switch (sort) {
        case 'price-low':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => b.stars - a.stars);
          break;
        case 'name':
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }

    if (limit) {
      const num = parseInt(limit, 10);
      if (!isNaN(num) && num > 0) {
        products = products.slice(0, num);
      }
    }

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Error retrieving products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const products = await readData('products.json', []);
    const id = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Fragrance not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching fragrance:', error);
    res.status(500).json({ success: false, message: 'Error retrieving fragrance details' });
  }
};

module.exports = {
  getProducts,
  getProductById
};

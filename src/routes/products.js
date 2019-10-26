const express = require('express');
const ProductService = require('../services/index');

const platziProductsStore = (app) => {
  const router = express.Router();
  app.use('/api/products', router);

  const productService = new ProductService();

  router.get('/', async function(req, res, next) {
    const { tags } = req.query;
    try {
      const products = await productService.getProducts({ tags });
      res.status(200).json({
        data: products,
        message: 'Products listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    try {
      const product = await productService.getProduct({ productId });
      res.status(200).json({
        product: product,
        message: product.length > 0 ? 'Product retrive' : `Product ${productId} not exist`
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async function(req, res, next) {
    const { body: product } = req;
    try {
      const createProductId = await productService.createProduct({ product })
      res.status(201).json({
        data: createProductId,
        message: 'Product created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    const { body: product } = req;
    try {
      const updatedProductId = await productService.updateProduct({ product, productId })
      res.status(200).json({
        data: updatedProductId,
        message: updatedProductId.length > 0 ? 'Product updated' : `Product ${productId} not exist`
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    try {
      const deletedProductId = await productService.deleteProduct({ productId })
      res.status(200).json({
        data: deletedProductId,
        message: deletedProductId.length > 0 ? 'Product deleted' : `Product ${productId} not exist`
      });
    } catch (err) {
      next(err);
    }
  });

}

module.exports = platziProductsStore;
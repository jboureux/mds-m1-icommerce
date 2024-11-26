import express from 'express';
import * as categoryController from '../controllers/category.controller';

const router = express.Router();

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.delete('/:id', categoryController.deleteCategory);
router.put('/:id', categoryController.updateCategory);

export default router;

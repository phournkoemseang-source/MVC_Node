import express from 'express';
import UserController from '../controllers/UserController.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const router = express.Router();
const userController = new UserController();


router.get('/users', asyncHandler(userController.getUsers.bind(userController)));
router.get('/users/:id', asyncHandler(userController.getUserById.bind(userController)));
router.post('/users', asyncHandler(userController.createUser.bind(userController)));
router.put('/users/:id', asyncHandler(userController.updateUser.bind(userController)));
router.delete('/users/:id', asyncHandler(userController.deleteUser.bind(userController)));

export default router;

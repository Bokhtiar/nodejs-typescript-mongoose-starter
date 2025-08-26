"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
// Basic health check route
router.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
// TODO: Add your actual routes here
// Example:
// router.use('/users', userRoutes);
// router.use('/tasks', taskRoutes);
exports.AppRouter = router;

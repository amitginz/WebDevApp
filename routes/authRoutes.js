const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/register", (req, res) => authController.showRegister(req, res));
router.post("/register", (req, res) => authController.register(req, res));

router.get("/login", (req, res) => authController.showLogin(req, res));
router.post("/login", (req, res) => authController.login(req, res));

router.post("/logout", (req, res) => authController.logout(req, res));

const favoriteController = require("../controllers/favoriteController");
const requireAuth = require("../middleware/requireAuth");

router.get("/youtube", requireAuth, (req, res) => favoriteController.showPage(req, res));
router.post("/favorites/add", requireAuth, (req, res) => favoriteController.add(req, res));
router.post("/favorites/delete/:id", requireAuth, (req, res) => favoriteController.delete(req, res));

module.exports = router;

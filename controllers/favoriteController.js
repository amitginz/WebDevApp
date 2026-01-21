const favoriteService = require("../services/favoriteService");

class FavoriteController {
    async showPage(req, res) {
        try {
            // שליפת המועדפים מהדאטה-בייס
            const favorites = await favoriteService.getByUser(req.session.user.id);

            // רינדור הדף עם המפתח מה-ENV
            res.render("youtube", {
                favorites: favorites,
                user: req.session.user,
                apiKey: process.env.YOUTUBE_API_KEY // וודא ש-dotenv טעון ב-app.js
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error loading favorites");
        }
    }
    // ... שאר הפונקציות
}

module.exports = new FavoriteController();
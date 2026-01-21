const favoriteService = require("../services/favoriteService");


class FavoriteController {
    async showPage(req, res) {
        try {
            // וודא ש-req.session.user קיים (מנוהל ע"י sessionMiddleware) [cite: 239]
            const favorites = await favoriteService.getByUser(req.session.user.id);
            res.render("youtube", {
                favorites,
                user: req.session.user,
                apiKey: process.env.YOUTUBE_API_KEY
            });
        } catch (err) {
            res.status(500).send("שגיאה בטעינת המועדפים");
        }
    }
}

module.exports = new FavoriteController();
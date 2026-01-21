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
    async add(req, res) {
        try {
            const { videoId, title, thumbnail } = req.body;
            const userId = req.session.user.id; // שימוש במזהה מהסשן הקיים 

            await favoriteService.addFavorite({
                userId,
                videoId,
                title,
                thumbnail
            });

            res.redirect("/youtube"); // חזרה לדף לאחר השמירה
        } catch (err) {
            console.error("שגיאה בשמירת מועדף:", err);
            res.status(500).send("Internal Server Error: לא ניתן לשמור את הסרטון");
        }
    }
    // מחיקת מועדף
    async delete(req, res) {
        try {
            await favoriteService.removeFavorite(req.params.id, req.session.user.id);
            res.redirect("/youtube");
        } catch (err) {
            res.status(500).send("שגיאה במחיקה");
        }
    }
}

module.exports = new FavoriteController();
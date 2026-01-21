const favoriteRepo = require("../repositories/favoriteRepository");

class FavoriteService {
    async addFavorite({ userId, videoId, title, thumbnail }) {
        // לוגיקה עסקית - למשל בדיקה אם הסרטון כבר קיים במועדפים
        return await favoriteRepo.add({ userId, videoId, title, thumbnail });
    }

    async getByUser(userId) {
        return await favoriteRepo.getByUser(userId);
    }

    async removeFavorite(id, userId) {
        return await favoriteRepo.delete(id, userId);
    }
}

module.exports = new FavoriteService();
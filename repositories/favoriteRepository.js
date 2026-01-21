const db = require("../config/db");

class FavoriteRepository {
    async add({ userId, videoId, title, thumbnail }) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO Favorites (userId, videoId, title, thumbnail) VALUES (?, ?, ?, ?)`,
                [userId, videoId, title, thumbnail],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    async getByUser(userId) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM Favorites WHERE userId = ?`, [userId], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    async delete(id, userId) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM Favorites WHERE id = ? AND userId = ?`, [id, userId], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

module.exports = new FavoriteRepository();
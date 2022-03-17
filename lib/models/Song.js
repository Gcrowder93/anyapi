const pool = require('../utils/pool');

module.exports = class Song {
  id;
  title;
  artist;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.artist = row.artist;
  }

  static async insert({ title, artist }) {
    const { rows } = await pool.query(
      'INSERT INTO songs(title, artist) VALUES ($1, $2) RETURNING *;',
      [title, artist]
    );

    return new Song(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM songs;');
    return rows.map((row) => new Song(row));
    console.log(rows);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM songs WHERE id=$1;', [id]);
    if (!rows[0]) return null;
    return new Song(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingSong = await Song.getById(id);
    const updatedAttributes = { ...existingSong, ...attributes };
    const { title, artist } = updatedAttributes;

    const { rows } = await pool.query(
      'UPDATE songs SET title=$2, artist=$3 WHERE id=$1 RETURNING *;',
      [id, title, artist]
    );

    if (!rows[0]) return null;
    return new Song(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM songs WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new Song(rows[0]);
  }
};

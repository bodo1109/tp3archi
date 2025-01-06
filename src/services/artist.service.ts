import { pool } from '../config/database';
import { Artist } from '../types/artist';
import { DatabaseError } from '../utils/errors';

export class ArtistService {
  async findAll(): Promise<Artist[]> {
    try {
      const result = await pool.query('SELECT * FROM artists ORDER BY "createdAt" DESC');
      return result.rows;
    } catch (error) {
      throw new DatabaseError('Error fetching artists');
    }
  }

  async findById(id: string): Promise<Artist> {
    try {
      const result = await pool.query('SELECT * FROM artists WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        throw new Error('Artist not found');
      }
      return result.rows[0];
    } catch (error) {
      throw new DatabaseError('Error fetching artist');
    }
  }

  async updateRating(id: string, rating: number): Promise<Artist> {
    try {
      const result = await pool.query(
        'UPDATE artists SET rating = $1 WHERE id = $2 RETURNING *',
        [rating, id]
      );
      if (result.rows.length === 0) {
        throw new Error('Artist not found');
      }
      return result.rows[0];
    } catch (error) {
      throw new DatabaseError('Error updating artist rating');
    }
  }
}
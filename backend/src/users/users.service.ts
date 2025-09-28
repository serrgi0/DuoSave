import { Injectable } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private pool: Pool;

  constructor() {
    this.pool = createPool({
      host: 'localhost',
      user: 'duosave_user',
      password: 'duosavepass',
      database: 'duosave',
    });
  }
  
  // Create user
  async create(dto: CreateUserDto) {
  const [result] = await this.pool.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [dto.username, dto.email, dto.password],
  );

  console.log('Insert result:', result); // 👈 Debug

  return { id: (result as any).insertId, ...dto };
  }

  // Update user
  async update(id: number, dto: UpdateUserDto) {
    await this.pool.query(
      'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
      [dto.username, dto.email, dto.password, id],
    );
    return { id, ...dto };
  }

  // Delete user
  async delete(id: number) {
    await this.pool.query('DELETE FROM users WHERE id = ?', [id]);
    return { message: `User ${id} deleted` };
  }

  // Find user by ID
  async findUserById(id: number) {
    const [rows] = await this.pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return (rows as any)[0] ?? null;
  }

  // Find all users
  async findAllUsers() {
    const [rows] = await this.pool.query('SELECT * FROM users');
    return rows;
  }
}

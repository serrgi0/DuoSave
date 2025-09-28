import { Injectable } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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
    // Hash para la contraseña (cifrado con bcrypt)
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const [result] = await this.pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [dto.username, dto.email, hashedPassword],
    );

    return { id: (result as any).insertId, userName: dto.username, email: dto.email };
  }

  //buscar ususario por email
  async findByEmail(email: string) {
    const [rows] = await this.pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return (rows as any)[0] ?? null;
  }

  //validad Login
  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;
    return { id: user.id, username: user.username, email: user.email };
  }

  // Update user
  async update(id: number, dto: UpdateUserDto) {

    let hashedPassword = dto.password;
    if (dto.password) {
      hashedPassword = await bcrypt.hash(dto.password, 10);
    }

    await this.pool.query(
      'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
      [dto.username, dto.email, hashedPassword ?? dto.password, id],
    );
    return { id, username: dto.username, email: dto.email };
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

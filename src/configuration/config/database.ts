import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: '12345',
  username: 'lebron',
  password: '3456',
}));

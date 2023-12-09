import { registerAs } from '@nestjs/config';

export default registerAs('user', () => ({
  username: 'kyrie irving',
  firstName: 'kyrie',
  lastName: 'irving',
}));

import { Controller, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}
  @Get('player-list')
  getPlayerList() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwiaWQiOjEyMywiaWF0IjoxNzA1ODA4MDM0fQ.Z241K01e9MUvqyKsQE9ba76sSqohjLjjPxpCt8JMkuI';
    const payload = this.jwtService.verify(token, {
      secret: 'hello',
    });
    console.log(payload);
    return ['hello', 'world'];
  }
  @Get('login')
  handleLogin() {
    const token = this.jwtService.sign(
      { username: 'hello', id: 123 },
      {
        secret: 'hello',
      },
    );
    return {
      token,
    };
  }
  @Get('token')
  createToken() {
    /*     const token = jwt.sign({ name: '你好生活' }, 'secret');
    jwt.sign(
      { message: 'hello world' },
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      (err, data) => {
        console.log('callback token', data);
      },
    ); */
    const token = jwt.sign({ name: 'hello123456' }, '你好生活', {
      expiresIn: '1 days',
      // algorithm: 'RS256',
      noTimestamp: true,
      subject: 'hello world',
    });
    console.log(token);
    return 'created';
  }
  @Get('verify')
  verifyToken() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGVsbG8xMjM0NTYiLCJleHAiOjE3MDU4OTY0ODUsInN1YiI6ImhlbGxvIHdvcmxkIn0.ON-u72BhbeSw40jg9ihD8txS6YPAYOiDl0KSEgpzNPc';
    const data = jwt.verify(token, '你好生活');
    console.log(data);
    jwt.verify(token, '你好生活', (err, data) => {
      console.log(data);
    });
    const decode = jwt.decode(token);
    console.log('decode', decode);
    console.log(
      jwt.decode(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.ApBif7okSFiI7Lejh4uKYCxvSRLhKRBmbLEN4UW1wyQ',
      ),
    );
    return '解码成功';
  }
}

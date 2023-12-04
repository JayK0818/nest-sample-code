import 'dotenv/config';
import * as dotenv from 'dotenv';

console.log(process.env);
/**
 * {
 *    SECRET: 'hello world',
      PASSWORD: '你好生活' 
 * }
*/

// ------------ parsing ------------
const buffer = Buffer.from('BASIC=basic');
const config = dotenv.parse(buffer);
console.log(config, typeof config);
/**
 * { BASIC: 'basic' } object
 */

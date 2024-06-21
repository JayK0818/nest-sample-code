import * as argon from 'argon2'

const password = '123456';

(function () {
  async function set_password() {
    const hash1 = await argon.hash(password)
    const hash2 = await argon.hash(password)

    console.log(hash1, hash2, hash1 === hash2)

    const verify1 = await argon.verify(hash1, password)
    const verify2 = await argon.verify(hash2, password)
    console.log(verify1, verify2) // true true
  }
  set_password()
})()
import { IsString, IsNumber, ValidateNested, validate, IsNotEmpty } from 'class-validator'
import { plainToInstance } from 'class-transformer'

(function () {
  class UserProfile {
    @IsString()
    age: string;

    @IsString()
    address: string;
  }
  class User {
    @IsNumber()
    id: string;

    @IsString()
    name: string;

    @ValidateNested()
    @IsNotEmpty()
    user_profile: UserProfile;
  }

  const user = plainToInstance(User, {
    id: 1,
    name: 'hello',
    user_profile: {
      age: '123',
      address: 22211,
    },
  });

  async function validateUser() {
    let errors: any[] = await validate(user)
    for (const key in user) {
      const v = user[key]
      if (typeof v === 'object') {
        const e = await validate(plainToInstance(UserProfile, v))
        errors = errors.concat(e)
      }
    }
    console.log('------------------ errors -------------------', errors)
  }
  validateUser()
})()
import { IsString, IsNumber, ValidateNested, validate, IsNotEmpty } from 'class-validator'
import { plainToInstance, Type } from 'class-transformer'
// ------- 一个demo ------------
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
    @Type(() => UserProfile)
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
  // validateUser()

  console.log('----------------------------')
  async function validateNestUser() {
    const user = plainToInstance(User, {
      id: 1,
      name: 'hello',
      user_profile: {
        age: '12',
        address: 1111
      }
    })
    const errors = await validate(user)
    console.log('----------user-errors:------------', errors, JSON.stringify(errors))
  }
  validateNestUser()
})()
import { Controller } from "@nestjs/common";
import { UserService } from './user.service';

@Controller('typeorm')
export class UserController {
  constructor(readonly userService: UserService) {}
}
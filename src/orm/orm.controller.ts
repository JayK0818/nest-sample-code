import { Controller } from '@nestjs/common';
import { OrmService } from './orm.service';

@Controller('orm')
export class OrmController {
  constructor(private ormService: OrmService) {}
}

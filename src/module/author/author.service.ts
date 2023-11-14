import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthorService {
  getAllAuthorList () {
    return ['鲁迅', '巴金', '老舍']
  }
}
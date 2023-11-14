import { Injectable } from '@nestjs/common'

@Injectable()
export class CatsService {
  private readonly cats: string[] = []
  findAll (): string[] {
    return this.cats
  }
  create (name: string) {
    this.cats.push(name)
  }
}
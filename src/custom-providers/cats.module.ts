import { Module } from '@nestjs/common';
import { CustomProviderCatService } from './cats.service';
import { CustomProviderController } from './cats.controller';
// import { CatsMockService } from './cats-mock.service';
import { DevelopmentCatService } from './cats.development.service';
import { PlayerObject } from './no-class-object';

/* const CatsMockService = {
  getPlayerList() {
    return ['詹姆斯'];
  },
}; */

/* @Module({
  controllers: [CustomProviderController],
  providers: [
    {
      provide: CustomProviderCatService,
      // useClass: CustomProviderCatService,
      useValue: CatsMockService,
    },
  ],
}) */

// 使用 non-class (未实现)
/* @Module({
  controllers: [CustomProviderController],
  providers: [
    {
      useValue: CustomProviderCatService,
      provide: 'cat_service',
    },
  ],
}) */

// useClass
/* @Module({
  controllers: [CustomProviderController],
  providers: [
    {
      provide: CustomProviderCatService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? CustomProviderCatService
          : DevelopmentCatService,
    },
  ],
}) */

// useFactory
/* @Module({
  controllers: [CustomProviderController],
  providers: [
    DevelopmentCatService,
    {
      provide: CustomProviderCatService,
      useFactory(a) {
        console.log('a', a, a.getPlayerList());
        return a;
      },
      inject: [DevelopmentCatService],
    },
  ],
}) */

@Module({
  controllers: [CustomProviderController],
  providers: [
    CustomProviderCatService,
    /*     {
      provide: 'cat_service',
      useValue: PlayerObject,
    }, */
  ],
})
export class CustomProviderModule {}

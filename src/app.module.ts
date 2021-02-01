import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './config/typeorm.config';
import { LanguagesModule } from './languages/languages.module';
import { GroupsModule } from './groups/groups.module';
import { FeaturesModule } from './features/features.module';
import { RulesModule } from './rules/rules.module';
import { BedsModule } from './beds/beds.module';
import { DestinationsModule } from './destinations/destinations.module';
import { ConfigModule } from '@nestjs/config';
import { ListingsModule } from './listings/listings.module';
import { AvailabilitiesModule } from './availabilities/availabilities.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env.dev',
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfig,
    }),
    LanguagesModule,
    GroupsModule,
    FeaturesModule,
    RulesModule,
    BedsModule,
    DestinationsModule,
    ListingsModule,
    AvailabilitiesModule,
    AuthModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

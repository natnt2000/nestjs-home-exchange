import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LanguagesModule } from './languages/languages.module';
import { GroupsModule } from './groups/groups.module';
import { FeaturesModule } from './features/features.module';
import { RulesModule } from './rules/rules.module';
import { BedsModule } from './beds/beds.module';
import { DestinationsModule } from './destinations/destinations.module';
import { ListingsModule } from './listings/listings.module';
import { AvailabilitiesModule } from './availabilities/availabilities.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.dev' }),
    TypeOrmModule.forRoot(typeOrmConfig),
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

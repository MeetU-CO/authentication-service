import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { MissingEnvVariablesException } from '../../../../domain/exception/missing-env-variables.exception';
import throwExpression from '../../../../domain/utils/throw-expression';
import { MongoUrlBuilder } from './mongo-url-builder.config';
import { MongoConnectionParameters } from './parameters.config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private static mongooseModuleOptions: MongooseModuleOptions;
  private mongoUrlBuilder: MongoUrlBuilder;
  constructor(private configService: ConfigService) {
    this.mongoUrlBuilder = new MongoUrlBuilder();
    MongooseConfigService.mongooseModuleOptions?.uri ?? this.setup();
  }

  createMongooseOptions(): MongooseModuleOptions {
    return this.getMongooseOptions();
  }

  getMongooseOptions(): MongooseModuleOptions {
    return MongooseConfigService.mongooseModuleOptions;
  }

  setup() {
    const mongoConfig =
      this.configService.get<MongoConnectionParameters>('mongoose');
    if (mongoConfig?.urlConnection !== undefined) {
      MongooseConfigService.mongooseModuleOptions = {
        uri: mongoConfig.urlConnection,
      };
      return;
    }

    const url = this.mongoUrlBuilder
      .setUsername(
        mongoConfig?.rootUsername ??
          throwExpression(new MissingEnvVariablesException('mongodb username')),
      )
      .setPassword(
        mongoConfig?.rootPassword ??
          throwExpression(new MissingEnvVariablesException('mongodb password')),
      )
      .setHostname(
        mongoConfig?.hostname ??
          throwExpression(new MissingEnvVariablesException('mongodb hostname')),
      )
      .setPort(
        mongoConfig?.port ??
          throwExpression(new MissingEnvVariablesException('mongodb port')),
      )
      .setDatabaseName(
        mongoConfig?.databaseName ??
          throwExpression(
            new MissingEnvVariablesException('mongodb database name'),
          ),
      )
      .build();

    MongooseConfigService.mongooseModuleOptions = { uri: url };
  }
}

import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const getSequelizeConfig = async (
  configService: ConfigService,
): Promise<SequelizeModuleOptions> => {
  return {
    dialect: configService.get('DB_DIALECT'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    synchronize: true,
    autoLoadModels: true,
    models: [],
  };
};

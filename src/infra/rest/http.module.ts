import { HttpModule as BaseHttpModule, HttpService } from '@nestjs/axios';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import chalk from 'chalk';

@Module({
  imports: [
    BaseHttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('CAT_API_URL'),
        headers: {
          'x-api-key': configService.get<string>('CAT_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [BaseHttpModule],
})
export class HttpModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  public onModuleInit(): any {
    const logger = new Logger('Axios');

    const axios = this.httpService.axiosRef;
    axios.interceptors.request.use(function (config) {
      config['metadata'] = { ...config['metadata'], startDate: new Date() };
      return config;
    });
    axios.interceptors.response.use(
      (response) => {
        const { config } = response;
        config['metadata'] = { ...config['metadata'], endDate: new Date() };
        const duration =
          config['metadata'].endDate.getTime() -
          config['metadata'].startDate.getTime();

        const method = chalk
          .hex('#87e8de')
          .bold(`${config.method.toUpperCase()}`);
        const url = chalk.hex('#87e8de').bold(`${config.url}`);

        logger.debug(
          `🏯  ${method} » ${url} » ${chalk
            .hex('#87e8de')
            .bold(`${duration}ms`)}`,
        );

        return response;
      },
      (err) => {
        logger.error(err);

        return Promise.reject(err);
      },
    );
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

// Endpoint URL
const endpointUrl = 'https://api.openai.com/v1/models';

@Injectable()
export class AppService {
  constructor(public configService: ConfigService) {}

  async getModel() {
    try {
      const bodyParameters = {
        key: 'value',
      };

      const response = await axios.get(
        endpointUrl,
        this.getHeaderParameters(this.configService),
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  getHeaderParameters(configService: ConfigService) {
    const config = {
      headers: {
        Authorization: `Bearer ${configService.get<string>('SECRET_KEY')}`,
      },
    };
    return config;
  }
}

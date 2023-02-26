import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

// Endpoint URL
const endpointUrl = {
  models: 'https://api.openai.com/v1/models',
  completions: 'https://api.openai.com/v1/completions',
};

@Injectable()
export class AppService {
  constructor(public configService: ConfigService) {}

  async getModel() {
    try {
      const response = await axios.get(
        endpointUrl.models,
        this.getHeaderParameters(this.configService),
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }


  async createCompletion() {
    try {
      const bodyParameters = JSON.stringify({
        model: "text-davinci-002",
        prompt: "Write about artificial intelligence.",
        temperature: 0.9
      });
      const response = await axios.post(
        endpointUrl.completions,
        bodyParameters,
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
        "Content-Type": "application/json"
      },
    };
    return config;
  }
}

import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RandomService {
  generateRandomText(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateRandomTextAndNumber(textLength: number, numMin: number, numMax: number): string {
    const randomText = this.generateRandomText(textLength);
    const randomNumber = this.generateRandomNumber(numMin, numMax);
    return `${randomText}${randomNumber}`;
  }

  generateRandomUUID(): string {
    const newUUID = uuidv4();
    return newUUID;
  }
}
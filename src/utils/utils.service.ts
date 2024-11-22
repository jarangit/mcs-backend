import { Injectable } from "@nestjs/common";

@Injectable()
export class UtilsService {
  [x: string]: any;
  removeKeysObj({
    obj,
    keysToRemove,
  }: {
    obj: Record<string, any>;
    keysToRemove: string[];
  }): Record<string, any> {
    const newObj = { ...obj };
    keysToRemove.forEach((key) => {
      delete newObj[key];
    });
    return newObj;
  }
  getRandomImg(data: string[]): string {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }
}

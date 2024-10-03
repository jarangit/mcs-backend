import { Injectable } from "@nestjs/common";

@Injectable()
export class UtilsService {
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
}

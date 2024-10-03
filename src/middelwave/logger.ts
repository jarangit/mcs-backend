import { LoggerService } from "@nestjs/common";
import "colors";

export class EmojiLogger implements LoggerService {
  log(message: string) {
    this.writeToFile("📢 " + message.green);
  }

  error(message: string, trace: string) {
    this.writeToFile("❌ " + message.red);
    this.writeToFile("🔍 Stack Trace: " + trace);
  }

  warn(message: string) {
    this.writeToFile("⚠️ " + message.yellow);
  }

  debug(message: string) {
    this.writeToFile("🐞 " + message.blue);
  }

  private writeToFile(message: string) {
    // Implement the logic to write logs to a file here.
    console.log(message); // For demonstration purposes, we'll just log to the console.
  }
}

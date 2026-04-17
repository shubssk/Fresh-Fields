import { Color, blue, red } from "colorette";

export class Logger {
  constructor(private tag: string) {}

  /** Use for debug logging only */
  static log(tag: string, ...messages: any[]) {
    Logger.print(tag, messages, blue);
  }

  /** Use for debug logging only */
  log(...messages: any[]) {
    Logger.log(this.tag, ...messages);
  }

  static info(tag: string, ...messages: any[]) {
    Logger.print(tag, messages, blue);
  }

  info(...messages: any[]) {
    Logger.info(this.tag, ...messages);
  }

  static error(tag: string, ...messages: any[]) {
    Logger.print(tag, messages, red);
  }

  error(...messages: any[]) {
    Logger.error(this.tag, ...messages);
  }

  private static isObject(obj: any) {
    return typeof obj === "object" && obj !== null;
  }

  private static isUndefinedOrNull(obj: any) {
    return obj === undefined || obj === null;
  }

  private static isError(obj: any) {
    return obj instanceof Error;
  }

  // TODO: fix omitting 1st character in jest output
  private static print(tag: string, messages: any[], color: Color) {
    // print tag first
    process.stdout.write(color("[" + tag + "] "));
    // then print messages
    for (const message of messages) {
      if (Logger.isError(message)) {
        console.error(message);
      } else if (Logger.isUndefinedOrNull(message)) {
        process.stdout.write(message + "");
      } else if (Logger.isObject(message)) {
        process.stdout.write(JSON.stringify(message, null, 2));
      } else {
        process.stdout.write(message);
      }
      process.stdout.write(" ");
    }
    process.stdout.write("\n");
  }
}

import { ObjectUtils } from "./object.utils";
import { NumberUtils } from "./number.utils";
import { StringUtils } from "..";

export class DateUtils {
  private static timeFormatRegex = /yyyy|yy|MM|M|dd|d|HH|mm|ss|SSS/g;

  public static dateToTimestamp(date: Date): number {
    if (ObjectUtils.isNullOrUndefined(date)) {
      return 0;
    }
    return Math.round(date.getTime() / 1000);
  }

  public static timestampToDate(timestamp: number): Date {
    if (!NumberUtils.isSafeInteger(timestamp)) {
      return null;
    }

    if (timestamp > 1000000000000) {
      return new Date(timestamp);
    } else {
      return new Date(timestamp * 1000);
    }
  }

  public static toString(date: Date, format: string): string {
    const result = format.replace(
      this.timeFormatRegex,
      // tslint:disable-next-line:trailing-comma
      matched => this.getTimeFormat(false, date, matched)
    );
    return result;
  }

  public static toUTCString(date: Date, format: string): string {
    const result = format.replace(
      this.timeFormatRegex,
      // tslint:disable-next-line:trailing-comma
      matched => this.getTimeFormat(true, date, matched)
    );
    return result;
  }

  private static getTimeFormat(
    isUTC: boolean,
    date: Date,
    formatKey: string
  ): string {
    switch (formatKey) {
      case "yyyy":
        return (isUTC ? date.getUTCFullYear() : date.getFullYear()).toString();
      case "yy":
        return (isUTC ? date.getUTCFullYear() : date.getFullYear())
          .toString()
          .substr(1);
      case "MM":
        const month = isUTC ? date.getUTCMonth() + 1 : date.getMonth() + 1;
        return month >= 10 ? month.toString() : `0${month}`;
      case "M":
        return (isUTC
          ? date.getUTCMonth() + 1
          : date.getMonth() + 1
        ).toString();
      case "dd":
        const day = isUTC ? date.getUTCDate() : date.getDate();
        return day >= 10 ? day.toString() : `0${day}`;
      case "d":
        return (isUTC ? date.getUTCDate() : date.getDate()).toString();
      case "HH":
        const hour = isUTC ? date.getUTCHours() : date.getHours();
        return hour >= 10 ? hour.toString() : `0${hour}`;
      case "mm":
        const min = isUTC ? date.getUTCMinutes() : date.getMinutes();
        return min >= 10 ? min.toString() : `0${min}`;
      case "ss":
        const seconds = isUTC ? date.getUTCSeconds() : date.getSeconds();
        return seconds >= 10 ? seconds.toString() : `0${seconds}`;
      case "SSS":
        return (isUTC
          ? date.getUTCMilliseconds()
          : date.getMilliseconds()
        ).toString();
      default:
        return "";
    }
  }
}

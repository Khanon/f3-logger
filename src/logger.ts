/**
 * Logger static class.
 * Log support for Node applications.
 *
 * TODO: Possibility to add Graylog support in the future.
 */

import process from 'process';

import { LoggerLevels } from './logger-levels';

export class Logger {
    private static level: LoggerLevels = LoggerLevels.DEBUG;

    static setLevel(level: LoggerLevels): void {
        this.level = level;
    }

    static debug(msg: string, ...params: any[]): void {
        if (this.level <= LoggerLevels.DEBUG) {
            console.debug(this.msgParams(msg, params));
        }
    }

    static info(msg: string, ...params: any[]): void {
        if (this.level <= LoggerLevels.INFO) {
            console.log(this.msgParams(msg, params));
        }
    }

    static warn(msg: string, ...params: any[]): void {
        if (this.level <= LoggerLevels.WARNING) {
            console.warn(this.msgParams(msg, params));
        }
    }

    static error(msg: string, ...params: any[]): void {
        if (this.level <= LoggerLevels.ERROR) {
            console.error(this.msgParams(msg, params));
        }
    }

    private static msgParams(msg: string, params: any[]): string {
        params.forEach((param) => {
            msg += ' ' + param;
        });
        return msg;
    }
}

// Set Logger.level from .env var F3_LOGGER_LEVEL
(function () {
    if (process.env.F3_LOGGER_LEVEL) {
        Logger.setLevel(Number(process.env.F3_LOGGER_LEVEL))
    }
})();
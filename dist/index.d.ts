import { Module } from 'magnet-core/module';
export default class MagnetEventstore extends Module {
    readonly moduleName: string;
    readonly defaultConfig: string;
    setup(): Promise<void>;
}

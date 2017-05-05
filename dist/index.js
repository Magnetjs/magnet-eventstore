"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("magnet-core/module");
const eventstore = require("eventstore");
const _promise = require("bluebird");
class MagnetEventstore extends module_1.Module {
    get moduleName() { return 'eventstore'; }
    get defaultConfig() { return __dirname; }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.insert(eventstore(this.config));
            _promise.promisifyAll(this.app.eventstore);
            this.app.eventstore.on('connect', () => {
                this.log.info('storage connected');
            });
            this.app.eventstore.on('disconnect', () => {
                this.log.error('connection to storage is gone');
            });
            yield this.app.eventstore.initAsync();
        });
    }
}
exports.default = MagnetEventstore;
//# sourceMappingURL=index.js.map
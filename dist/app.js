"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const db_1 = require("./db/db");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
class App {
    constructor(controllers, port) {
        this.expressApp = express_1.default();
        this.port = port;
        this.initMiddleware();
        this.initControllers(controllers);
    }
    initMiddleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(errorMiddleware_1.errorMiddleware);
    }
    initControllers(controllers) {
        controllers.forEach(element => {
            this.expressApp.use('/', element.router);
        });
    }
    initDb() {
        db_1.connect();
    }
    listen() {
        this.expressApp.listen(this.port, () => {
            console.log('Listening on port ' + this.port);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map
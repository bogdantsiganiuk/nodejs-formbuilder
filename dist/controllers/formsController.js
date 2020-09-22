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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsController = void 0;
const express = __importStar(require("express"));
const form_1 = require("../models/form");
const validator_1 = require("../middleware/validator");
class FormsController {
    constructor(formService) {
        this.path = '/forms';
        this.router = express.Router();
        this.initRoutes();
        if (!formService)
            throw new Error("FormService is null");
        this.formService = formService;
    }
    initRoutes() {
        this.router.get(this.path, (req, res) => { this.getAllForms(req, res); });
        this.router.post(this.path + '/create', validator_1.validationMiddleware(form_1.Form), (req, res) => { this.createForm(req, res); });
    }
    async getAllForms(req, res) {
        const forms = await this.formService.getAllForms();
        res.send(forms);
    }
    async createForm(req, res) {
        const data = req.body;
        const form = new form_1.Form();
        form.formName = data.formName;
        form.formFields = [];
        form.formFields = data.formFields.slice();
        const status = await this.formService.createNewForm(form);
        if (status) {
            res.status(200);
            res.send('Success');
        }
        else {
            res.status(500);
            res.send('Creation failed, internal error');
        }
    }
}
exports.FormsController = FormsController;
//# sourceMappingURL=formsController.js.map
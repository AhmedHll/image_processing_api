"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharpResize_1 = __importDefault(require("./sharpResize"));
const dotenv = __importStar(require("dotenv"));
require("dotenv/config");
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// app.get('/', (_req: Request, res: Response) => {
//   res.json({ msg: `Hello from the server` });
// });
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, width, height } = req.query;
    if (!name || !width || !height || +width <= 0 || +height <= 0)
        return res.status(400).json({ msg: "wrong input" });
    const { data, error } = yield (0, sharpResize_1.default)(name, width, height);
    if (error.message)
        return res.status(400).json({ msg: error.message });
    res.sendFile(data);
}));
app.listen(port, () => {
    console.log(`server is online at http://localhost:${port}`);
});
exports.default = app;

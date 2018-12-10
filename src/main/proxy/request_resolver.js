"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
// tslint:disable-next-line:no-implicit-dependencies
var body_parser_1 = require("body-parser");
var textParser = body_parser_1.text({
    type: "*/*"
});
// tslint:disable-next-line:no-implicit-dependencies
var content_type_1 = require("content-type");
// tslint:disable-next-line:no-var-requires
var Busboy = require("busboy");
exports["default"] = (function (req) { return __awaiter(_this, void 0, void 0, function () {
    var contentSize, Ctype, bodyString, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                contentSize = req.headers["content-length"];
                Ctype = { type: "", parameters: {} };
                if (req.headers["content-type"]) {
                    Ctype = content_type_1.parse(req);
                }
                console.log(Ctype);
                bodyString = "";
                if (!(Ctype.type === "multipart/form-data" ||
                    Ctype.type === "application/x-www-form-urlencoded")) return [3 /*break*/, 2];
                return [4 /*yield*/, parseMultiPart(req)];
            case 1:
                bodyString = _a.sent();
                return [3 /*break*/, 5];
            case 2:
                if (!(contentSize / 100000 > 5)) return [3 /*break*/, 3];
                bodyString = "";
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, wrapParserPromise(textParser, req)];
            case 4:
                bodyString = _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/, bodyString];
            case 6:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, error_1];
            case 7: return [2 /*return*/];
        }
    });
}); });
function wrapParserPromise(parser, req) {
    return new Promise(function (resolve, reject) {
        parser(req, null, function () {
            resolve(req.body);
        });
    });
}
function parseMultiPart(req) {
    var busboy = new Busboy({
        headers: req.headers
    });
    return new Promise(function (resolve, reject) {
        var form = {};
        busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
            file.on("data", function (data) {
                // Handle files
            });
            file.on("end", function () {
                // Handle files
            });
        });
        busboy.on("field", function (fieldname, val, fieldnameTruncated, valTruncated) {
            form[fieldname] = val;
        });
        busboy.on("finish", function () {
            resolve(form);
        });
        req.pipe(busboy);
    });
}
//# sourceMappingURL=request_resolver.js.map
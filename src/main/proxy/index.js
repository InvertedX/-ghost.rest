"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var crypto = require("crypto");
// tslint:disable-next-line:no-implicit-dependencies
var express = require("express");
var jetPack = require("fs-jetpack");
var path = require("path");
var request_resolver_1 = require("./request_resolver");
// tslint:disable-next-line:no-var-requires
// tslint:disable-next-line:no-var-requires
var proxyLib = require("./proxy");
var app = express();
exports.proxy = function (options, basePath) {
    var optionsWithHooks = setUpHooks(app, options, basePath);
    var proxyIns = proxyLib(__assign({ changeOrigin: true }, optionsWithHooks), null);
    app.use(proxyIns);
    return app;
};
// tslint:disable-next-line:no-shadowed-variable
function setUpHooks(app, options, basePath) {
    jetPack.dir(basePath);
    function onError(err, req, res) {
        console.log(err);
    }
    function onProxyRes(proxyRes, req, res) {
        var body = Buffer.from("");
        proxyRes.on("data", function (data) {
            body = Buffer.concat([body, data]);
        });
        proxyRes.on("end", function () {
            var bodyString = body.toString();
            saveResponseFile(bodyString, req.id).then(function () {
                var request = createModel(req, req.id);
                options.onProxyResponse(request);
                console.log("response saved");
            });
        });
    }
    function onProxyReq(proxyReq, req, res) {
        var id = crypto.randomBytes(8).toString("hex");
        req.id = id;
        saveRequestFile(req, id)
            .then(function (data) {
            console.log("reqest saved");
            var request = createModel(req, id);
            options.onProxyRequest(request);
        })["catch"](function (error) {
            console.log(error);
        });
    }
    function saveRequestFile(req, id) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, parsedBody, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log("Save Respone,");
                        filePath = path.join(basePath, id + ".request");
                        return [4 /*yield*/, request_resolver_1["default"](req)];
                    case 1:
                        parsedBody = _a.sent();
                        return [4 /*yield*/, jetPack.writeAsync(filePath, parsedBody)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, ""];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1.message);
                        return [2 /*return*/, ""];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function saveResponseFile(body, id) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        filePath = path.join(basePath, id + ".response");
                        console.log(filePath);
                        return [4 /*yield*/, jetPack.writeAsync(filePath, body)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    options.onProxyRes = onProxyRes;
    options.onProxyReq = onProxyReq;
    options.onError = onError;
    return options;
}
function createModel(req, id) {
    return {
        headers: req.headers,
        id: id,
        method: req.method,
        size: req.headers["content-length"],
        status: req.statusCode,
        url: req.url
    };
}
//# sourceMappingURL=index.js.map
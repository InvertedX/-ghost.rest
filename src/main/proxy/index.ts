import crypto = require("crypto");
// tslint:disable-next-line:no-implicit-dependencies
import { Application, Request, Response } from "express";
// tslint:disable-next-line:no-implicit-dependencies
import express = require("express");
import jetPack = require("fs-jetpack");
import path = require("path");
import { IRequest, IResponse } from "../../shared/models";
import resolver from "./request_resolver";

// tslint:disable-next-line:no-var-requires
// tslint:disable-next-line:no-var-requires
const proxyLib:any = require("./proxy");

const app:Application = express();

interface IProxyRequest extends Request {
  id:string;
}

export interface IProxyOptions {
  target:string;
  onProxyRequest:(request:IRequest) => void;
  onProxyResponse:(response:IResponse) => void;
  onError:() => void;
}

export const proxy = (
  options:IProxyOptions,
  basePath:string,
):Application => {
  const optionsWithHooks = setUpHooks(app, options, basePath);
  const proxyIns = proxyLib(
    {
      changeOrigin: true,
      ...optionsWithHooks,
    },
    null,
  );
  app.use(proxyIns);
  return app;
};

// tslint:disable-next-line:no-shadowed-variable
function setUpHooks(app:Application, options:any, basePath:string) {
  jetPack.dir(basePath);

  function onError(err:any, req:any, res:any) {
    console.log(err);
  }

  function onProxyRes(proxyRes:any, req:IRequest, res:any):any {
    let body = Buffer.from("");
    proxyRes.on("data", (data:any) => {
      body = Buffer.concat([body, data]);
    });
    proxyRes.on("end", () => {
      const bodyString = body.toString();
      saveResponseFile(bodyString, req.id).then(() => {
        const request = createModel(req, req.id);
        options.onProxyResponse(request);
        console.log("response saved");
      });
    });
  }

  function onProxyReq(
    proxyReq:IProxyRequest,
    req:IProxyRequest,
    res:Response,
  ) {
    const id = crypto.randomBytes(8).toString("hex");
    req.id = id;
    saveRequestFile(req, id)
      .then((data:any) => {
        console.log("reqest saved");
        const request = createModel(req, id);
        options.onProxyRequest(request);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function saveRequestFile(req:any, id:any):Promise<string> {
    try {
      console.log("Save Respone,");
      const filePath = path.join(basePath, `${id}.request`);
      const parsedBody = await resolver(req);
      await jetPack.writeAsync(filePath, parsedBody);
      return "";
    } catch (e) {
      console.log(e.message);
      return "";
    }
  }

  async function saveResponseFile(body:any, id:any):Promise<void> {
    try {
      const filePath = path.join(basePath, `${id}.response`);
      console.log(filePath);
      await jetPack.writeAsync(filePath, body);
    } catch (e) {
      console.log(e.message);
    }
  }

  options.onProxyRes = onProxyRes;
  options.onProxyReq = onProxyReq;
  options.onError = onError;

  return options;
}

function createModel(req:Request, id:any):any {
  return {
    headers: req.headers,
    id,
    method: req.method,
    size: req.headers["content-length"],
    status: req.statusCode,
    url: req.url,
  };
}

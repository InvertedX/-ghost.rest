// tslint:disable-next-line:no-implicit-dependencies
import { Request, Response } from "express";

export interface IRequest extends Request {
  id:string;
  size:string;
  method:string;
  status:number;
  url:string;
}
export interface IResponse extends Response {
  id:string;
  method:string;
  size:string;
  url:string;
}
export interface IServerOptions {
  url:string;
  port:number;
}

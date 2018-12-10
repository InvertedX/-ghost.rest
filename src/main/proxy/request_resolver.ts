// tslint:disable-next-line:no-implicit-dependencies
import { text } from "body-parser";
const textParser = text({
  type: "*/*",
});
// tslint:disable-next-line:no-implicit-dependencies
import { parse as ParseContentType, ParsedMediaType } from "content-type";

// tslint:disable-next-line:no-var-requires
const Busboy = require("busboy");

export default async (req) => {
  try {
    const contentSize = req.headers["content-length"];
    let Ctype:ParsedMediaType = { type: "", parameters: {} };
    if (req.headers["content-type"]) {
      Ctype = ParseContentType(req);
    }
    console.log(Ctype);
    let bodyString:any = "";
    if (
      Ctype.type === "multipart/form-data" ||
      Ctype.type === "application/x-www-form-urlencoded"
    ) {
      bodyString = await parseMultiPart(req);
    } else {
      if (contentSize / 100000 > 5) {
        bodyString = "";
      } else {
        bodyString = await wrapParserPromise(textParser, req);
      }
    }
    return bodyString;
  } catch (error) {
    console.log(error);
    return error;
  }
};

function wrapParserPromise(parser, req) {
  return new Promise((resolve, reject) => {
    parser(req, null, () => {
      resolve(req.body);
    });
  });
}

function parseMultiPart(req) {
  const busboy = new Busboy({
    headers: req.headers,
  });

  return new Promise((resolve, reject) => {
    const form = {};

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      file.on("data", (data) => {
        // Handle files
      });

      file.on("end", () => {
        // Handle files
      });
    });

    busboy.on("field", (fieldname, val, fieldnameTruncated, valTruncated) => {
      form[fieldname] = val;
    });
    busboy.on("finish", () => {
      resolve(form);
    });
    req.pipe(busboy);
  });
}

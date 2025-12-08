const packageJson = require("../package.json");
const currentFullVersion = packageJson.version;
const currentMajorVersion = currentFullVersion.split(".")[0];

function getAskedApiVersion(req) {
  const apiVersionHeader =
    req.headers["x-api-version"] ??
    req.headers["X-API-VERSION"] ??
    currentMajorVersion;

  return apiVersionHeader;
}

module.exports = getAskedApiVersion;

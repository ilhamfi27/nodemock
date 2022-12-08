const config = require('../../../mock/config.json');

function setHeaders(mock, w) {
  const headers = mock.httpResponse.headers;
  for (const key in headers) {
    w.header(key, headers[key]);
  }
}

function acceptBody(mock, r) {
  let mockBody = mock.httpRequest.body;
  const reqBody = {};
  for (const key in mockBody) {
    if (!r.body[key]) {
      return undefined;
    }
    if (
      mockBody[key][0] &&
      !new RegExp(mockBody[key][0], mockBody[key][1]).test(r.body[key])
    ) {
      return undefined;
    }
    reqBody[`$body.${key}`] = r.body[key];
  }
  return reqBody;
}

function acceptParams(mock, r) {
  const mockParams = mock.httpRequest.queryStringParameters;
  const params = {};
  for (const key in mockParams) {
    params[`$params.${key}`] = r.query[key];
  }
  return params;
}

function execGetMethod(mock, r, w) {
  setHeaders(mock, w);
  const params = acceptParams(mock, r);
  w.status(mock.httpResponse.statusCode);
  w.send(mock.httpResponse.body);
}

function execPostMethod(mock, r, w) {
  setHeaders(mock, w);
  const body = acceptBody(mock, r);
  if (!body) {
    execBadRequest(w);
    return w;
  }
  w.status(mock.httpResponse.statusCode);
  w.send(mock.httpResponse.body);
}

function execNotFound(w) {
  w.status(404);
  w.send({
    message: 'config not found',
  });
}

function execBadRequest(w) {
  w.status(400);
  w.send({
    message: 'bad request',
  });
}

exports.index = async function index(r, w, n) {
  const originalUrl = r.originalUrl.split('?')[0];
  const methodUsed = r.method.toUpperCase();
  const mustMock = config.find(
    (d) =>
      d.httpRequest.path === originalUrl && d.httpRequest.method === methodUsed
  );
  if (!mustMock) {
    execNotFound(w);
    return w;
  }
  switch (methodUsed) {
    case 'GET':
      execGetMethod(mustMock, r, w);
      break;
    case 'POST':
    case 'PUT':
    case 'PATCH':
      execPostMethod(mustMock, r, w);
      break;
    default:
      execNotFound(w);
      break;
  }
};

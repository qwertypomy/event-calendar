const APIError = require('./APIError');

function soapReject(text, status) {
  throw {
    Fault: {
      Code: {
        Value: 'soap:Sender',
        Subcode: { value: 'rpc:BadArguments' }
      },
      Reason: { Text: text },
      statusCode: status
    }
  };
}

function expressReject(next) {
  return (text, status) => {
    const err = new APIError(text, status, true);
    return next(err);
  };
}

function soapHandler(controller) {
  return (args, callback) => {
    controller(args, callback, soapReject);
  };
}

function expressHandler(controller) {
  return ({ body, params, user }, res, next) => {
    controller({ ...params, ...body, user }, data => res.json(data), expressReject(next));
  };
}

module.exports = {
  soapReject,
  expressReject,
  soapHandler,
  expressHandler
};

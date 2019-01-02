const { soapHandler } = require('../helpers/reqHandler');

const { checkAuthSOAP: checkAuth } = require('../helpers/checkAuth');
const authCtrl = require('../auth/auth.controller');
const userCtrl = require('../user/user.controller');
const eventCtrl = require('../event/event.controller');

const service = {
  EventCalendar_Service: {
    EventCalendar_Port: {
      googleLogin: soapHandler(authCtrl.googleLogin),
      profile(args, callback, headers) {
        checkAuth(args, headers, () => {
          soapHandler(userCtrl.profile)(args, callback);
        });
      },
      createEvent(args, callback, headers) {
        checkAuth(args, headers, () => {
          soapHandler(eventCtrl.createEvent)(args, callback);
        });
      },
      deleteEvent(args, callback, headers) {
        checkAuth(args, headers, () => {
          soapHandler(eventCtrl.deleteEvent)(args, callback);
        });
      }
    }
  }
};

module.exports = service;

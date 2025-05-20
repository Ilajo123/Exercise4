const whitelist = require('./whitelist');

const corsOption = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by Cors'));
    }
  },
  optionsSuccessStatus:200
}

module.exports = corsOption;
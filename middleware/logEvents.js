const {v4:uuid} = require('uuid');
const {format} = require('date-fns');
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const logEvents = async (message,filename) => {
  const dateNow = format(new Date(),'yyyy/MM/dd HH/mm/ss');
  const logs = `${dateNow} -\t${uuid()} -\t${message} \n`;
  try {
    if (!fs.existsSync(path.join(__dirname,'..','logs'))) {
      await fsPromise.mkdir(path.join(__dirname,'..','logs'));
    }
    await fsPromise.appendFile(path.join(__dirname,'../logs',filename), logs)
  }catch(err) {
    console.error(err);
  }
}

module.exports = logEvents;
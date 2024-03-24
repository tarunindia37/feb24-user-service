import fs from 'fs';

const logger = (loggerFilePath) => {
  return (req, res, next) => {
    const { method, url, headers, ip } = req;
    const loggerMsg = `${new Date()} - ${method} ${headers.host}${url} ${ip} ${headers['user-agent']} \n`;
    fs.appendFile(loggerFilePath, loggerMsg, (err) => {
      if (err) {
        console.log(err);
      }
      next();
    });
  };
};

export default logger;

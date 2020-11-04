import app from './app';
const log4js = require('log4js');
const logger = log4js.getLogger();
const port: number = Number(process.env.PORT) || 8080;

app.listen(port, () => {
    logger.level = 'info';
    logger.info("Service executed successfully");
    logger.info(`Listening in the port ${port}`);
});

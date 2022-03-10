import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import server from './server';
import { coinbaseSync, uniswapSync } from './scripts'

import './config/firebase'


const serverStartMsg = 'Express server started on port: ',
        port = (process.env.PORT || 3000);

// Start server
server.listen(port, () => {
    logger.info(serverStartMsg + port);

    setInterval(() => {
        uniswapSync()
        coinbaseSync()
    }, 30000)
});

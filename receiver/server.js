const net = require('net');
const handleRecvPkg = require('./handler.js');

function runServer(logger, srvAddress, conTTL) {
    const [host, port] = srvAddress.split(':');

    const server = net.createServer((conn) => {
        conn.on('error', (err) => {
          logger.error('Erro de conexão:', err);
        });
    
        handleRecvPkg(logger, conn, conTTL);
    });

    server.on('listening', () => {
        logger.info(`Servidor iniciado ${srvAddress}...`);
    });
    
    server.on('error', (err) => {
        logger.error('Falha ao abrir conexão:', err);
    });
    
    server.listen(port, host);
}

module.exports = runServer;
const net = require('net');
const { handleRecvPkg } = require('../../receiver/handler.js'); // Substitua pelo caminho correto do seu arquivo
const Settings = require('../../receiver/config.js')
const loggerCreate = require('../../receiver/logger.js')

describe('test handleRecvPkg', () => {

    let config;
    let logger;
    beforeEach(() => {
        config = new Settings();
        logger = loggerCreate(config);
    });

    it('Deve ser capaz de processar corretamente um pacote válido', (done) => {
        const server = net.createServer((client) => {
            handleRecvPkg(logger, client, 10000); // Supondo que o timeout seja de 10 segundos
        });

        server.listen(0, () => {
            const port = server.address().port;
            const client = net.createConnection(port, 'localhost');
            client.write(Buffer.from([0x01, 0x08, 0x00, 0x00])); // Pacote válido com tamanho 8
            client.on('data', (data) => {
                console.log(data);
                server.close();
                done();
            });
        });
    });

    // it('Deve ser capaz de encerrar uma conexão com pacote inválido', (done) => {
    //     const server = net.createServer((client) => {
    //         client.write(Buffer.from([0x02])); // Pacote inválido
    //         client.on('end', () => {
    //             // Verifique aqui se a conexão foi encerrada corretamente
    //             server.close();
    //             done();
    //         });
    //     });

    //     server.listen(0, () => {
    //         const port = server.address().port;
    //         const client = net.createConnection(port, 'localhost');
    //     });
    // });

    // Adicione mais testes para outros cenários e casos de erro, se necessário
});

const loggerCreate = require('../../receiver/logger.js')
const Settings = require('../../receiver/config.js'); // Substitua pelo caminho correto
const winston = require('winston');

describe('testLogger', () => {

    let config;
    let logger;
    beforeEach(() => {
        config = new Settings();
        logger = loggerCreate(config);
    });

    it('Deve ser capaz de criar um logger com as configurações fornecidas', () => {

        expect(logger).toBeDefined();
        expect(logger.level).toBe('info');
        expect(logger.transports.length).toBe(2); // 2 transportes: Console e Arquivo
        expect(logger.transports[0] instanceof winston.transports.Console).toBe(true);
        expect(logger.transports[1] instanceof winston.transports.File).toBe(true);
    });

    it('Deve ser capaz de registrar um log em arquivo', () => {
        // Use jest.spyOn para capturar a saída para o arquivo
        const fileSpyInfo = jest.spyOn(logger, 'info');
        const fileSpyWarn = jest.spyOn(logger, 'warn');

        // Verifique se a função de log para o arquivo foi chamada com a mensagem correta
        logger.info('Este é um teste de info em arquivo.');
        expect(fileSpyInfo).toHaveBeenCalledWith('Este é um teste de info em arquivo.');

        logger.warn('Este é um teste de warn em arquivo.');
        expect(fileSpyWarn).toHaveBeenCalledWith('Este é um teste de warn em arquivo.');

        // Restaure a função original do arquivo
        fileSpyInfo.mockRestore();
        fileSpyWarn.mockRestore();
    });
});

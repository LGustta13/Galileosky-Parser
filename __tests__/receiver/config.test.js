const fs = require('fs');
const os = require('os');
const logger = require('../../receiver/logger.js');
const Settings = require('../../receiver/config.js'); // Substitua './settings' pelo caminho do arquivo que contém a classe Settings

describe('TestConfig', () => {
  it('Deve ser capaz de carregar as configurações corretamente', () => {
    const cfg = `host="127.0.0.1"
port="5020"
con_live_sec=10
log_level="DEBUG"`;

    const tmpDir = os.tmpdir(); // Substitua '/tmp' pela função que retorna o diretório temporário no Node.js
    const tmpFilePath = `${tmpDir}/config.toml`;
    
    try {
      fs.writeFileSync(tmpFilePath, cfg);

      const conf = new Settings();
      conf.load(tmpFilePath);

      const testCfg = new Settings();
      testCfg.host = '127.0.0.1';
      testCfg.port = '5020';
      testCfg.conLiveSec = 10;
      testCfg.logLevel = 'DEBUG';

      expect(testCfg).toEqual(conf); // Usando a função 'expect' do Jest
    } catch (err) {
      throw new Error(`Erro: ${err.message}`);
    } finally {
      fs.unlinkSync(tmpFilePath); // Exclui o arquivo temporário
    }
  });

  it('Deve ser capaz de retornar o endereço corretamente', () => {

    const address = `127.0.0.1:5020`;

    try {
      const cfg = new Settings();
      cfg.host = '127.0.0.1';
      cfg.port = '5020';
      cfg.conLiveSec = 10;
      cfg.logLevel = 'DEBUG';
  
      const testAddress = cfg.getListenAddress();

      expect(testAddress).toEqual(address); // Usando a função 'expect' do Jest
    } catch (err) {
      throw new Error(`Erro: ${err.message}`);
    }
  });

  it('Deve ser capaz de retornar o nível de log corretamente', () => {

    const debug = 'debug';

    try {
      const cfg = new Settings();
      cfg.host = '127.0.0.1';
      cfg.port = '5020';
      cfg.conLiveSec = 10;
      cfg.logLevel = 'DEBUG';

      expect(cfg.getLogLevel()).toBe(debug); // Usando a função 'expect' do Jest
    } catch (err) {
      throw new Error(`Erro: ${err.message}`);
    }
  });

  it('Deve ser capaz de retornar o nível de log padrão se desconhecido', () => {

    const unknown = 'unknown';
    const info = 'info';

    try {
      const cfg = new Settings();
      cfg.host = '127.0.0.1';
      cfg.port = '5020';
      cfg.conLiveSec = 10;
      cfg.logLevel = 'UNKNOWN';

      expect(cfg.getLogLevel()).toBe(info); // Usando a função 'expect' do Jest
    } catch (err) {
      throw new Error(`Erro: ${err.message}`);
    }
  });

  it('Deve ser capaz de retornar tempo de conexão', () => {

    const connTime = 10000;

    try {
      const cfg = new Settings();
      cfg.host = '127.0.0.1';
      cfg.port = '5020';
      cfg.conLiveSec = 10;
      cfg.logLevel = 'DEBUG';

      expect(cfg.getEmptyConnTTL()).toBe(connTime); // Usando a função 'expect' do Jest
    } catch (err) {
      throw new Error(`Erro: ${err.message}`);
    }
  });
});

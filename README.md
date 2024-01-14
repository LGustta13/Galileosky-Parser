<h1 align="center"> Protocol Parser </h1>

<p align="center">
Serviço que realiza o parse de protocolos de comunicação de sistemas embarcados disponíveis no mercado. A princípio, somente o Galileosky foi implementado<br/>
  
<br>

<p align="center">
  <img alt="projeto Protocol parser" src=".github/preview.jpg" width="100%">
</p>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Javascript
- React
- NodeJS
- Websocket

## 💻 Projeto

O projeto surgiu a partir de uma necessidade de desenvolver um sistema semelhante aos sistemas de monitoramento de dados e gestão de frotas presentes no mercado, no qual pudesse interpretar os dados enviados segundo o protocolo de comunicação de rastreadores e embarcados utilizados para telemetria veicular.
Entretanto, o projeto pode ser adaptado para responder a outros protocolos de comunicação, o que será implementado posteriormente, ou também para protocolos personalizados.

- Versão BETA da UI: [Link]()
- Documentação protocolo Galileosky: [Link](https://base.galileosky.com/articles/#!en-documentation/galileosky-protocol/a/h2_1310565463)
- Documentação React: [Link](https://legacy.reactjs.org/)

## 🔖 Layout

O Layout pode ser encontrado no Figma por meio do seguinte [Link]()

## ⏯️ Testes

- Servidor: Desktop, INTEL i7, Windows 11, 8GB RAM
- 10 rastreadores conectados simultaneamente

## 🧰 Configurações

Em _configs/receiver.toml_, deve-se colocar o seguinte:

- host: IP da máquina onde está rodando o servidor.
- port: porta utilizada na máquina.
- con_server_sec: tinmeout de conexão do servidor.
- log_level: logs de debug serão salvos em um arquivo .txt

Em _data/packets.csv_ há exemplo de pacotes que podem ser utilizados para testes em mesa

Em _receiver/parse.js_ é onde adicionamos as tags do protocolo para serem interpretadas. Para isso, devem ser apontadas em _receiver/galileo/map.js_ dentro de **tagsTable**. Por fim, adicionar a nova tag em _receiver/handler.js_ para ser salva no objeto **outPkg** (observe o console.log(outPkg), esse é o objeto interpretado!)

## 🧮 Execução

Executar o servidor

```
node ./app.js
ou
npm run start
```

Executando os testes

```
npx jest <nome arquivo>
```

## 📃 Anotações

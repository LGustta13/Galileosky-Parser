const {GalileoParsePacket} = require('./parse.js')
const Packet = require('./galileo/packet.js')

const headerLen = 3;

function handleRecvPkg(logger, conn, ttl) {
    let recvPacket;
    conn.on('close', () => {
        logger.warn(`Conexão fechada com ${conn.remoteAddress}`);
    });

    logger.warn(`Conexão estabelecida com ${conn.remoteAddress}`);
    let outPkg = new GalileoParsePacket();

    conn.on('data', (data) => {
        const connTimer = setTimeout(() => {
            conn.end();
            logger.warn(`Conexão com ${conn.remoteAddress} encerrada devido ao timeout`);
        }, ttl);

        /////// PARA TESTES ////////
        
        console.log(data);
        /////// PARA TESTES ////////

        const headerBuf = data.slice(0, headerLen);
        const tag = headerBuf[0];

        if (tag !== 0x01) {
            logger.warn(`Pacote não está no formato Galileo. Conexão com ${conn.remoteAddress} encerrada.`);
            conn.end();
            clearTimeout(connTimer);
            return;
        }

        const pkgLen = data.readUInt16LE(1) & 0x7FFF ;
        const buf = data.slice(headerLen, headerLen + pkgLen);
        const crcbuf = data.slice(headerLen + pkgLen);
        recvPacket = Buffer.concat([headerBuf, buf, crcbuf]);

        clearTimeout(connTimer);

        const pkg = new Packet();
        try {
            pkg.decode(recvPacket);
        } catch (error) {
            logger.warn('Erro na decodificação do pacote');
            logger.error(error);
            return;
        }

        const receivedTime = Math.floor(Date.now() / 1000);
        const crc = Buffer.alloc(2);
        crc.writeUInt16LE(pkg.crc);
        const resp = Buffer.concat([Buffer.from([0x02]), crc]);

        conn.write(resp, (err) => {
            if (err) {
                logger.error(`Erro ao enviar pacote de confirmação: ${err}`);
            }
        });

        if (pkg.tags.length < 1) {
            return;
        }

        outPkg.receivedTimestamp = receivedTime;
        let prevTag = 0;
        let isSave = false;

        for (const curTag of pkg.tags) {
            if (prevTag > curTag.tag && isSave) {
                try {
                    outPkg.save();
                } catch (error) {
                    logger.error(error);
                }
                let client = outPkg.client;
                outPkg = new GalileoParsePacket();
                outPkg.client = client;
                outPkg.receivedTimestamp = receivedTime;
                isSave = false;
            }

            switch (curTag.tag) {
                case 0x04:
                    outPkg.client = curTag.value.val;
                    break;
                case 0x10:
                    outPkg.packetID = curTag.value.val;
                    break;
                case 0x20:
                    outPkg.navigationTimestamp = Math.floor(curTag.value.val.getTime() / 1000);
                    break;
                case 0x30:
                    outPkg.nsat = curTag.value.nsat;
                    outPkg.latitude = curTag.value.latitude;
                    outPkg.longitude = curTag.value.longitude;
                    isSave = true;
                    break;
                case 0x33:
                    outPkg.course = curTag.value.course;
                    outPkg.speed = curTag.value.speed;
                    break;
                case 0x35:
                    outPkg.hdop = curTag.value.val;
                    break;
            }
            prevTag = curTag.tag;
        }

        console.log(outPkg);
    });

    conn.on('error', (err) => {
        logger.error(`Erro na conexão: ${err}`);
    });
}

module.exports = handleRecvPkg
const crc16 = require('../galileo/crc.js');
const Tag = require('../galileo/tags.js');
const tagsTable = require('../galileo/map.js');

// Definição da estrutura do pacote GalileoSky
class Packet {
  constructor() {
    this.header = 0;
    this.length = 0;
    this.tags = [];
    this.crc = 0;
  }

  setPacket(object) {
    const {header, length, tags, crc} = object

    this.header = header;
    this.length = length;
    this.tags = tags;
    this.crc = crc;
  }

  decode(pkg) {
    if (!Buffer.isBuffer(pkg)) {
      pkg = Buffer.from(pkg);
    }

    let pos = 0;
    const paketBodyLen = pkg.length - 2; // sem o checksum

    // Lê e verifica o CRC
    this.crc = pkg.readUInt16LE(paketBodyLen);
    if (crc16(pkg.slice(0, paketBodyLen)) !== this.crc) {
      throw new Error("Crc do pacote não corresponde");
    }

    // Lê o cabeçalho
    this.header = pkg.readUInt8(pos);
    pos++;

    // Lê o comprimento
    this.length = pkg.readUInt16LE(pos);
    pos += 2;

    const lenBits = this.length.toString(2);
    if (lenBits.length < 1) {
      throw new Error("Comprimento do pacote incorreto");
    }
    
    if (lenBits[0] === "1") {
      this.length = this.length & 0x7FFF; // Se houver dados não enviados, limpe o bit mais significativo
    }
    
    // Decodifica os tags
    while (pos < paketBodyLen) {
      const tag = new Tag();
        tag.tag = pkg.readUInt8(pos);
      pos++;

      if (tagsTable.has(tag.tag)) {
        const tagInfo = tagsTable.get(tag.tag);
        const tagVal = Buffer.alloc(tagInfo.Len);
        pkg.copy(tagVal, 0, pos, pos + tagInfo.Len);
        pos += tagInfo.Len;

        tag.setValue(tagInfo.Type, tagVal);
        this.tags.push(tag);
      } else {
        throw new Error(`Informações sobre a tag ${tag.tag.toString(16)} não encontradas`);
      }
    }
  }
}

module.exports = Packet;

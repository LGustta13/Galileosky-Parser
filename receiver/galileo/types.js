class UintTag {
  constructor(val = 0) {
    this.val = val;
  }

  parse(val) {
    const size = val.length;
    if (size === 1) {
      this.val = val[0];
    } else if (size === 2) {
      this.val = val.readUInt16LE(0);
    } else {
      throw new Error(`Matriz de entrada maior que 2 bytes: ${val.toString("hex")}`);
    }
  }
}

class StringTag {
  constructor(val = '') {
    this.val = val;
  }

  isNumber(val) {
    return !isNaN(parseFloat(val)) && isFinite(val)
  }

  parse(val) {    
    const size = val.length;
    if(this.isNumber(val.toString())){
        if(size === 15) {
            this.val = val.toString();
        } else {
            throw new Error(`Matriz de entrada com tamanho diferente de 15 bytes: ${val}`);
        }
    } else {
        throw new Error(`Matriz de entrada não é um número: ${val}`);
    }
  }
}

class TimeTag {
  constructor(val = new Date()) {
    this.val = val;
  }

  parse(val) {
    if (val.length !== 4) {
      throw new Error(`Matriz de entrada com tamanho incorreto para tag de tempo: ${val.toString("hex")}`);
    }
    const secs = val.readUInt32LE();
    this.val = new Date(secs * 1000); // Multiplica por 1000 para obter milissegundos
  }
}

class CoordTag {
  constructor(val = [0,0,0,0]) {
    this.nsat = val[0];
    this.isValid = val[1];
    this.longitude = val[2];
    this.latitude = val[3];
  }

  parse(val) {
    if (val.length !== 9) {
      throw new Error(`Matriz de entrada com tamanho incorreto para tag de coordenadas: ${val.toString("hex")}`);
    }
    const flgByte = val[0];
    this.latitude = val.readInt32LE(1) / 1000000;
    this.longitude = val.readInt32LE(5) / 1000000;
    this.nsat = flgByte & 0x0F;
    this.isValid = (flgByte >> 4) & 0x0F;
  }
}

class SpeedTag {
  constructor(val = [0,0]) {
    this.speed = val[0];
    this.course = val[1];
  }

  parse(val) {
    if (val.length !== 4) {
      throw new Error(`Matriz de entrada com tamanho incorreto para tag de velocidade: ${val.toString("hex")}`);
    }
    this.speed = val.readUInt16LE(0) / 10;
    this.course = val.readUInt16LE(2) / 10;
  }
}

class AccelTag {
  constructor(val = [0,0,0]) {
    this.x = val[0];
    this.y = val[1];
    this.z = val[2];
  }

  parse(val) {
      if (val.length !== 4) {
        throw new Error(`Matriz de entrada com tamanho incorreto para tag de aceleração: ${val.toString("hex")}`);
      }
        this.x = val.readUInt16LE(0) & 0x03FF;
        this.y = (val.readUInt16LE(1) & 0x0FFC) >> 2;
        this.z = (val.readUInt16LE(2) & 0x3FF0) >> 4;
  }
}

class IntTag {
  constructor(val = 0) {
    this.val = val;
  }

  parse(val) {
    const size = val.length;
    if (size === 1) {
      this.val = val.readInt8(0);
    } else if (size === 2) {
      this.val = val.readInt16LE(0);
    } else {
      throw new Error(`Matriz de entrada maior que 2 bytes: ${val.toString("hex")}`);
    }
  }
}

class BitsTag {
  constructor(val = '') {
    this.val = val;
  }

  parse(val) {
    const size = val.length;
    if (size === 1) {
      this.val = val[0].toString(2).padStart(8, '0');
    } else if (size === 2) {
      this.val = val.readUInt16LE(0).toString(2).padStart(16, '0');
    } else {
      throw new Error(`Matriz de entrada maior que 2 bytes: ${val.toString("hex")}`);
    }
  }
}

module.exports = {
  UintTag,
  StringTag,
  TimeTag,
  CoordTag,
  SpeedTag,
  AccelTag,
  IntTag,
  BitsTag,
};

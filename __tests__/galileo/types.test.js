const {
    UintTag,
    StringTag,
    TimeTag,
    CoordTag,
    SpeedTag,
    AccelTag,
    IntTag,
    BitsTag,
  } = require('../../receiver/galileo/types.js'); // Substitua pelo caminho real para o seu código
  
describe('typesTest_UintTag', () => {
    it('Deve ser capaz de realizar parse da tag UintTag com 1 byte', () => {
        const uintTag = new UintTag();
        uintTag.parse(Buffer.from([0x01]));
        expect(uintTag.val).toBe(1);
    });

    it('Deve ser capaz de realizar parse da tag UintTag com 2 bytes', () => {
        const uintTag = new UintTag();
        uintTag.parse(Buffer.from([0x02, 0x03]));
        expect(uintTag.val).toBe(0x0302);
    });

    it('Deve ser capaz de enviar um erro ao tentar realizar parse para tamanhos inválidos', () => {
        const uintTag = new UintTag();
        expect(() => uintTag.parse(Buffer.from([0x01, 0x02, 0x03])).toThrow(Error));
    });
});
    
describe('typesTest_StringTag', () => {
    it('Deve ser capaz de realizar parse da tag StringTag', () => {
        const stringTag = new StringTag();
        stringTag.parse(Buffer.from([0x38, 0x36, 0x31, 0x32, 0x33, 0x30, 0x30, 0x34, 0x33, 0x39, 0x30, 0x37, 0x36, 0x32, 0x36]));
        expect(stringTag.val).toBe('861230043907626');
    });

    it('Deve ser capaz de enviar um erro ao tentar realizar parse para buffer com tamanho diferente de 15', () => {
        const stringTag = new StringTag();
        expect(() => stringTag.parse(Buffer.from([0x38, 0x36, 0x31, 0x32, 0x33, 0x30, 0x30, 0x34, 0x33, 0x39, 0x30, 0x37, 0x36, 0x32]))
        .toThrow(`Matriz de entrada com tamanho diferente de 15 bytes: ${stringTag.val}`));
        expect(() => stringTag.parse(Buffer.from([0x38, 0x36, 0x31, 0x32]))
        .toThrow(`Matriz de entrada com tamanho diferente de 15 bytes: ${stringTag.val}`));
    });

    it('Deve ser capaz de enviar um erro se o buffer não for um número completo', () => {
        const stringTag = new StringTag();
        expect(() => stringTag.parse(Buffer.from([0x40, 0x36, 0x31, 0x32, 0x33, 0x30, 0x30, 0x34, 0x33, 0x39, 0x30, 0x37, 0x36, 0x32, 0x36]))
        .toThrow(`Matriz de entrada não é um número: ${stringTag.val}`));
    });
});
  
describe('typesTest_TimeTag', () => {
    it('Deve ser capaz de realizar parse da tag TimeTag', () => {
        const timeTag = new TimeTag();
        timeTag.parse(Buffer.from([0x4E, 0x83, 0xFF, 0x5C]));
        const expectedDate = new Date(Date.UTC(2019, 5, 11, 10, 32, 46))
        expect(timeTag.val).toStrictEqual(expectedDate);
    });

    it('Deve ser capaz de notificar um erro para tamanhos inválidos', () => {
        const timeTag = new TimeTag();
        expect(() => timeTag.parse(Buffer.from([0x5C, 0x5D, 0x5E]))).toThrow(Error);
        expect(() => timeTag.parse(Buffer.from([0x5C, 0x5D, 0x5E, 0x5A, 0x5B]))).toThrow(Error);
    }); 

});
  
describe('typesTest_CoordTag', () => {
    it("Deve ser capaz de realizar parse da tag CoordTag", () => {
        const coordTag = new CoordTag();
        coordTag.parse(Buffer.from([0x07, 0xC0, 0x0E, 0x32, 0x03, 0xB8, 0xD7, 0x2D, 0x05]));

        expect(coordTag.nsat).toBe(7);
        expect(coordTag.isValid).toBe(0);
        expect(coordTag.latitude).toBeCloseTo(53.612224, 6);
        expect(coordTag.longitude).toBeCloseTo(86.890424, 6);
    });
});

describe('typesTest_SpeedTag', () => {
    it('Deve ser capaz de realizar parse da tag SpeedTag', () => {
        const speedTag = new SpeedTag();
        speedTag.parse(Buffer.from([0x5C, 0x00, 0x48, 0x08]));

        expect(speedTag.speed).toBeCloseTo(9.2, 1);
        expect(speedTag.course).toBe(212);
    });
    
    it('Deve ser capaz de notificar um erro para tamanhos de pacote inválidos', () => {
        const speedTag = new SpeedTag();
        expect(() => speedTag.parse(Buffer.from([0x19, 0x00]))).toThrow(Error);
        expect(() => speedTag.parse(Buffer.from([0x19, 0x00, 0x01, 0x03, 0x05]))).toThrow(Error);
    });
});

describe('typesTest_AccelTag', () => {
    it('Deve ser capaz de realizar parse da tag Accelag, primeiro caso', () => {
        const accelTag = new AccelTag();
        accelTag.parse(Buffer.from([0xAF, 0x21, 0x98, 0x15]));

        expect(accelTag.x).toBe(431);
        expect(accelTag.y).toBe(520);
        expect(accelTag.z).toBe(345);
    });

    it('Deve ser capaz de realizar parse da tag Accelag, segundo caso', () => {
        const accelTag = new AccelTag();
        accelTag.parse(Buffer.from([0x00, 0x7F, 0x2D, 0x90]));
        
        expect(accelTag.x).toBe(768);
        expect(accelTag.y).toBe(863);
        expect(accelTag.z).toBe(258);
    });
    
    it('Deve ser capaz de notificar um erro para tamanhos de pacote inválidos', () => {
        const accelTag = new AccelTag();
        expect(() => accelTag.parse(Buffer.from([0x19, 0x00]))).toThrow(Error);
        expect(() => accelTag.parse(Buffer.from([0x19, 0x00, 0x01, 0x03, 0x05]))).toThrow(Error);
    });
});

describe('typesTest_IntTag', () => {
    it('Deve ser capaz de realizar parse da tag IntTag', () => {
        const intTag = new IntTag();     
        intTag.parse(Buffer.from([0x0A, 0x0A]));

        expect(intTag.val).toBe(2570);
    });
    
    it('Deve ser capaz de notificar um erro para tamanhos de pacote inválidos', () => {
        const intTag = new IntTag();
        expect(() => intTag.parse(Buffer.from([0x0A, 0x0A, 0x0A]))).toThrow(Error);
    });
});

describe('typesTest_BitsTag', () => {
    it('Deve ser capaz de realizar parse da tag BitsTag para 2 bytes', () => {
        const bitsTag = new BitsTag();
        bitsTag.parse(Buffer.from([0x01, 0x3A]));
        expect(bitsTag.val).toBe('0011101000000001');
    });

    it('Deve ser capaz de realizar parse da tag BitsTag para 1 byte', () => {
        const bitsTag = new BitsTag();
        bitsTag.parse(Buffer.from([0xFE]));
        expect(bitsTag.val).toBe('11111110');
    });

    it('Deve ser capaz de notificar um erro para tamanhos de pacote inválidos', () => {
        const bitsTag = new BitsTag();
        expect(() => bitsTag.parse(Buffer.from([0xFE, 0xFA, 0x11]))).toThrow(Error);
    });
});
  
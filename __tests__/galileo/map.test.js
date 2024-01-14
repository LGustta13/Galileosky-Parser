const tagsTable = require('../../receiver/galileo/map.js'); // Ajuste o caminho para o seu arquivo de código

describe('tagsTableTest', () => {
  it('Deve conter definições de tags específicas', () => {

    try {
        const expectedDefinitions = new Map([
            [0x01, {Len: 1, Type: "uint"}],
            [0x02, {Len: 1, Type: "uint"}],
            [0x03, {Len: 15, Type: "string"}],
            [0x04, {Len: 2, Type: "uint"}],
            [0x10, {Len: 2, Type: "uint"}],
            [0x20, {Len: 4, Type: "time"}],
            [0x30, {Len: 9, Type: "coord"}],
            [0x33, {Len: 4, Type: "speed"}],
            [0x34, {Len: 2, Type: "int"}],
            [0x35, {Len: 1, Type: "uint"}],
            [0x40, {Len: 2, Type: "bitstring"}],
            [0x41, {Len: 2, Type: "uint"}],
            [0x42, {Len: 2, Type: "uint"}],
            [0x43, {Len: 1, Type: "int"}],
            [0x44, {Len: 4, Type: "accel"}],
            [0x45, {Len: 2, Type: "bitstring"}],
            [0x46, {Len: 2, Type: "bitstring"}],
            [0x50, {Len: 2, Type: "uint"}],
            [0x51, {Len: 2, Type: "uint"}],
            [0x52, {Len: 2, Type: "uint"}],
            [0x53, {Len: 2, Type: "uint"}],
            [0x54, {Len: 2, Type: "uint"}],
            [0x55, {Len: 2, Type: "uint"}],
            [0x56, {Len: 2, Type: "uint"}],
            [0x57, {Len: 2, Type: "uint"}],
            [0x60, {Len: 2, Type: "uint"}],
            [0x61, {Len: 2, Type: "uint"}],
            [0x62, {Len: 2, Type: "uint"}],
        ]);
    
        for (const [tag, expected] of expectedDefinitions) {
            const tagTest = tagsTable.get(tag);
            expect(tagTest).toEqual(expected);
        }
    } catch (err) {
        throw new Error(`Erro: ${err.message}`);
    }
    
  });

  it('Deve estar vazio para tags não definidas', () => {

    const undefinedTag = tagsTable.get(0x11);
    expect(undefinedTag).toBeUndefined();
  });
});

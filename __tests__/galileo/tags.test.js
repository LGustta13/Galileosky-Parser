const Tag = require('../../receiver/galileo/tags.js');

describe('testTag class', () => {

    let tag;
    beforeEach(() => {
        tag = new Tag();
    });

    it('Deve ser capaz de inicializar com os valores padrões', () => {
        expect(tag.tag).toBe(0);
        expect(tag.value).toBeNull();
    });

    it('Deve ser capaz de setar um valor para a tag uint', () => {
        const val = Buffer.from([0x01]);
        tag.setValue('uint', val);
        expect(tag.value).toEqual({ val: 1 });
    });

    it('Deve ser capaz de setar um valor para a tag string', () => {
        const val = Buffer.from('863254985468988', 'utf8');
        tag.setValue('string', val);
        expect(tag.value).toEqual({ val: '863254985468988' });
    });

    it('Deve ser capaz de setar um valor para a tag time', () => {
        const val = Buffer.from([0x4E, 0x83, 0xFF, 0x5C]);
        tag.setValue('time', val);
        expect(tag.value).toEqual({ val: new Date('2019-06-11T10:32:46.000Z') });
    });

    it('Deve ser capaz de setar um valor para a tag coord', () => {
        const val = Buffer.from([0x25, 0x13, 0xF8, 0xE7, 0x02, 0xF4, 0x26, 0xA7, 0x02]);
        tag.setValue('coord', val);
        expect(tag.value).toEqual({
            nsat: 5,
            isValid: 2,
            latitude: 48.756755,
            longitude: 44.508916,
        });
    });

    it('Deve ser capaz de setar um valor para a tag coord', () => {
        const val = Buffer.from([0x25, 0x13, 0xF8, 0xE7, 0x02, 0xF4, 0x26, 0xA7, 0x02]);
        tag.setValue('coord', val);
        expect(tag.value).toEqual({
            nsat: 5,
            isValid: 2,
            latitude: 48.756755,
            longitude: 44.508916,
        });
    });

    it('Deve ser capaz de setar um valor para a tag speed', () => {
        const val = Buffer.from([0x64, 0x00, 0xD0, 0x11]);
        tag.setValue('speed', val);
        expect(tag.value).toEqual({
            speed: 10,
            course: 456
        });
    });

    it('Deve ser capaz de setar um valor para a tag accel', () => {
        const val = Buffer.from([0x59, 0xBD, 0x86, 0x20]);
        tag.setValue('accel', val);
        expect(tag.value).toEqual({
            x: 345,
            y: 431,
            z: 520,
        });
    });

    it('Deve ser capaz de setar um valor para a tag int', () => {
        const val = Buffer.from([0xFE, 0xFF]);
        tag.setValue('int', val);
        expect(tag.value).toEqual({ val: -2 });
    });

    it('Deve ser capaz de setar um valor para a tag bits', () => {
        const val = Buffer.from([0x0F]);
        tag.setValue('bitstring', val);
        expect(tag.value).toEqual({ val: '00001111' });
    });

    it('Deve ser capaz de enviar um erro para tags desconhecidas', () => {
        const val = Buffer.from([0x01]);
        expect(() => stringTag.parse(Buffer.from([0x38, 0x36, 0x31, 0x32, 0x33, 0x30, 0x30, 0x34, 0x33, 0x39, 0x30, 0x37, 0x36, 0x32]))
            .toThrow(`Matriz de entrada com tamanho diferente de 15 bytes: ${stringTag.val}`));
        expect(() => tag.setValue('unknown', val).toThrow(
            'Tipo de dado desconhecido: unknown'));
    });

    it('Deve ser capaz de enviar um erro para tipos de tags inválidas', () => {
        const val = Buffer.from([0x01]);
        expect(() => tag.setValue('', val).toThrow(('Ponteiro de tag incorreto')));
    });
});
const { GalileoParsePacket, LiquidSensor, AnSensor } = require('../../receiver/parse.js'); // Ajuste o caminho conforme necessário

describe('GalileoParsePacket', () => {

    it('Deve ser capaz de inicializar a classe corretamente', () => {
        const packet = new GalileoParsePacket();
        expect(packet).toBeDefined();
    });

    it('Deve ser capaz de salvar os dados em JSON formatado corretamente', () => {

        try {
            const galileoData = new GalileoParsePacket();
            galileoData.client = 12345;
            galileoData.packetID = 67890;
            galileoData.navigationTimestamp = 1635724800; // Timestamp Unix
            galileoData.receivedTimestamp = 1635724900; // Timestamp Unix
            galileoData.latitude = 37.7749;
            galileoData.longitude = -122.4194;
            galileoData.speed = 50;
            galileoData.pdop = 1.5;
            galileoData.hdop = 1.0;
            galileoData.vdop = 0.5;
            galileoData.nsat = 12;
            galileoData.ns = 3;
            galileoData.course = 90;
        
            const liquidSensor1 = new LiquidSensor();
            liquidSensor1.sensorNumber = 1;
            liquidSensor1.valueMm = 100;
            liquidSensor1.valueL = 200;
        
            const anSensor1 = new AnSensor();
            anSensor1.sensorNumber = 1;
            anSensor1.value = 500;
        
            galileoData.liquidSensors.push(liquidSensor1);
            galileoData.anSensors.push(anSensor1);
        
            const expectedResult = JSON.stringify(galileoData, null, 2);
        
            const result = galileoData.save();
            console.log(result)
            expect(result).toBe(expectedResult);
        } catch (err) {
            throw new Error(`Erro: ${err.message}`);
        }
    });
});

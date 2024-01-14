class GalileoParsePacket {
    constructor() {
        this.client = 0;
        this.packetID = 0;
        this.navigationTimestamp = 0;
        this.receivedTimestamp = 0;
        this.latitude = 0.0;
        this.longitude = 0.0;
        this.speed = 0;
        this.pdop = 0;
        this.hdop = 0;
        this.vdop = 0;
        this.nsat = 0;
        this.ns = 0;
        this.course = 0;
        this.anSensors = [];
        this.liquidSensors = [];
    }
  
    save() {
        const result = JSON.stringify(this, null, 2); // Use null, 2 para formatar o JSON
        return result;
    }
}

class LiquidSensor {
    constructor() {
      this.sensorNumber = 0;
      this.valueMm = 0;
      this.valueL = 0;
    }
  }
  
class AnSensor {
    constructor() {
        this.sensorNumber = 0;
        this.value = 0;
    }
}

module.exports = {GalileoParsePacket, LiquidSensor, AnSensor};
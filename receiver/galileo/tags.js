const {UintTag, StringTag, TimeTag, CoordTag, SpeedTag, AccelTag, IntTag, BitsTag} = require('../galileo/types.js');

class Tag {
    constructor() {
        this.tag = 0;
        this.value = null;
    }

    setValue(tagType, val) {
        let v;

        switch (tagType) {
            case "uint":
                v = new UintTag();
                break;
            case "string":
                v = new StringTag();
                break;
            case "time":
                v = new TimeTag();
                break;
            case "coord":
                v = new CoordTag();
                break;
            case "speed":
                v = new SpeedTag();
                break;
            case "accel":
                v = new AccelTag();
                break;
            case "int":
                v = new IntTag();
                break;
            case "bitstring":
                v = new BitsTag();
                break;
            default:
                return new Error(`Tipo de dados desconhecido: ${tagType}`);
        }

        if (!v) {
            return new Error("Ponteiro de tag inválido");
        }

        const err = v.parse(val);
        if (err) {
            return err;
        }

        this.value = v;
        return null;
    }
}

module.exports = Tag;
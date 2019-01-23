import Estado from './estado';
export default class Transicion {
    stStart:Estado;
    stEnd:Estado;
    constructor(stStart: Estado,stEnd:Estado) {
        this.stStart = stStart;
        this.stEnd = stEnd;
    }
};

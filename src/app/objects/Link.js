import Statistics from "./Statistics.js";

export default class Link {

    uuid;
    link;
    short;
    statistics;

    static fromObject(object) {
        let link = new Link();
        link.uuid = object.uuid;
        link.link = object.link;
        link.short = object.short;
        link.statistics = Statistics.fromObject(object.statistics);
        return link;
    }

    getShortURL() {
        return window.location.origin + "/" + this.short;
    }

}
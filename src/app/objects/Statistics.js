export default class Statistics {

    clicks;

    static fromObject(object) {
        let statistics = new Statistics();
        statistics.clicks = object.clicks;
        return statistics;
    }

}
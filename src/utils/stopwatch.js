/**
 * 计时器
 */
function Stopwatch() {

    this.startDate = null;
    this.endDate = null;

    this.start = function () {
        this.startDate = new Date();
    }

    this.stop = function () {
        this.endDate = new Date();

    }

    this.getTime = function () {
        return this.endDate - this.startDate;
    }

    this.reStart = function () {
        this.start();
    }
}
module.exports = Stopwatch;
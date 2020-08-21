function Accumulator(max, sameSign) {
    this.accArr = [];
    this.index = 0;
    this.count = 0;
    this.maxCount = max;
    this.sameSign = sameSign ? true : false;
}

Accumulator.prototype.getLast = function () {
    if (this.index === 0)
        return 0;
    return this.accArr[this.index - 1];
}

Accumulator.prototype.add = function (val) {
    if (this.sameSign && Math.sign(val) !== Math.sign(this.getLast())) {
        this.clear();
    }

    this.accArr[this.index++] = val;
    if (this.index === this.maxCount)
        this.index = 0;
    if (this.count < this.maxCount)
        this.count += 1;
}

Accumulator.prototype.clear = function () {
    this.accArr = [];
    this.index = 0;
    this.count = 0;
}

Accumulator.prototype.average = function () {
    if (this.count === 0) {
        return 0;
    }

    var sum = 0.0;
    for (var i = 0; i < this.count; i += 1) {
        sum += this.accArr[i];
    }
    return sum / this.count;
}

Accumulator.prototype.toString = function () {
    var str = '('+ this.count +'/'+ this.maxCount +') ';
    return str + this.accArr.toString();
}

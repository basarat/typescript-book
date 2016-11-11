var aaa;
(function (aaa) {
    var Queue = (function () {
        function Queue() {
            var _this = this;
            this.data = [];
            this.push = function (item) { return _this.data.push(item); };
            this.pop = function () { return _this.data.shift(); };
        }
        return Queue;
    }());
    var queue = new Queue();
    queue.push(0);
    queue.push("1");
    console.log(queue.pop().toPrecision(1));
    console.log(queue.pop().toPrecision(1));
})(aaa || (aaa = {}));
var bbb;
(function (bbb) {
    var QueueNumber = (function () {
        function QueueNumber() {
            var _this = this;
            this.data = [];
            this.push = function (item) { return _this.data.push(item); };
            this.pop = function () { return _this.data.shift(); };
        }
        return QueueNumber;
    }());
    var queue = new QueueNumber();
    queue.push(0);
    queue.push("1");
})(bbb || (bbb = {}));
var ccc;
(function (ccc) {
    var Queue = (function () {
        function Queue() {
            var _this = this;
            this.data = [];
            this.push = function (item) { return _this.data.push(item); };
            this.pop = function () { return _this.data.shift(); };
        }
        return Queue;
    }());
    var queue = new Queue();
    queue.push(0);
    queue.push("1");
})(ccc || (ccc = {}));

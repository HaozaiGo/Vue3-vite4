function Circle() {
    this.radius = 55; //圆环半径
    this.lineWidth = 10; //圆环边的宽度
    this.strokeStyle = '#ccc'; //边的颜色
    this.fillStyle = '#FED240'; //填充色
    this.lineCap = '';
    this.clientWidth = document.documentElement.clientWidth;
    this.clientHeight = document.documentElement.clientHeight;
}

Circle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.clientWidth / 2, this.clientHeight / 5, this.radius, 0, Math.PI * 2, true); //坐标为250的圆，起始的角度是0，结束的角度Math.Pi*2
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke();
}

//画进度条
function Ring(startAngle, percent) {
    Circle.call(this);
    this.startAngle = startAngle || 3 * Math.PI / 2; //起始角度
    this.percent = percent;
}
Ring.prototype = Object.create(Circle.prototype);
Ring.prototype.drawRing = function(ctx) {
    var count = 0,
        that = this,
        times = 10,
        startAngle = this.startAngle,
        endAngle = startAngle;
    this.draw(ctx); //调用circle的draw方法
    var handle = setInterval(function() {
        if (count == times) {
            clearInterval(handle)
        }
        //angle
        ctx.beginPath();
        var anglePerSec = 2 * Math.PI * (that.percent / 100) / times; // 每个间隔滑动的弧度
        ctx.arc(that.clientWidth / 2, that.clientHeight / 5, that.radius, startAngle, endAngle, false); //这里的圆心坐标要和cirle的保持一致
        ctx.strokeStyle = that.fillStyle;
        ctx.lineCap = that.lineCap;
        ctx.stroke();
        ctx.closePath();
        startAngle += anglePerSec - 0.0028; // 消除每次绘环间的计算误差，防止出现空隙
        endAngle = startAngle + anglePerSec;
        count++;
    }, 60)

}
export {
    Circle,
    Ring

}
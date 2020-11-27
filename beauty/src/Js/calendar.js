//日历表
//获取当前日期
let curtime = new Date(),
    curYear = curtime.getFullYear(),
    curMonth = curtime.getMonth(),
    curDate = curtime.getDate();
//判断是否是闰年
function isLeapYear(year) {
    return (year % 400 === 0) || ((year % 4 === 0) && (year % 100 === 0))
}

var ps = function(id) { return document.getElementById(id) }
    //渲染函数
function render(curYear, curMonth) {
    document.querySelector('.now-year').innerHTML = `${curYear}年`;
    //判断今年是平年还是闰年，确定今年的每月有多少天
    let daysInMonth = [31, isLeapYear(curYear) ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //今天日期所在月的第一天是星期几
    let firstDayInMonth = new Date(curYear, curMonth, 1),
        firstDayWeek = firstDayInMonth.getDay();
    //根据当前月的天数和第一天星期几确定行数
    let caleRows = Math.ceil((daysInMonth[curMonth] + firstDayWeek) / 7);
    //创建row数组
    let rows = [];
    month = new Date().getMonth(); //当前月
    nowYear = new Date().getFullYear() //今年
        //外循环渲染日历每一列
    for (let i = 0; i < caleRows; i++) {
        rows[i] = `<p class = "day-row">`;
        //内循环渲染日历每一天
        for (let j = 0; j < 7; j++) {
            //利用index索引与当前月第一天星期几来确定当前月日期
            let idx = i * 7 + j,
                date = idx - firstDayWeek + 1; //今天日期

            //过滤无效日期
            if (date <= 0 || date > daysInMonth[curMonth]) {
                rows[i] += `<p class="box"></p>`
            } else if (date === curDate && month == curMonth && nowYear == curYear) {
                rows[i] += `<p class="box curday">今天</p>`
            } else if (date == curDate) {
                rows[i] += `<p class="box curday">${date}</p>`
            } else {
                rows[i] += `<p class="box">${date}</p>`
            }
        }
        rows[i] += '</p>'
    }
    // console.log(date)
    let dateStr = rows.join("");
    document.querySelector('.days').innerHTML = dateStr;

}

//渲染外层days
let displayDayList = function(year, month, pos) {
    let daysInMonth = [31, isLeapYear(curYear) ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let daysArr = ["日", "一", "二", "三", "四", "五", "六"];
    let cells1 = ps(pos).rows[0].cells;
    let cells2 = ps(pos).rows[1].cells;
    let rowsDay = [cells1.item(0)];

    //先清空
    for (let i = 1; i < 32; i++) {
        // let wd = new Date(year,month,i).getDay();
        cells1[i - 1].className = "";
        cells1[i - 1].innerHTML = "";
        cells2[i - 1].innerHTML = "";
    }
    //再渲染
    for (let i = 1, l = daysInMonth[curMonth] + 1; i < l; i++) {
        let wd = new Date(year, month, i).getDay(); //动态显示周几
        cells1[i - 1].className = "allweek";
        cells1[i - 1].innerHTML = daysArr[wd];

        cells2[i - 1].className = "alldays";
        if (i == curDate) {
            cells2[i - 1].className = "today";
            // console.log(i-1)
        }
        // cells2[i-1].innerHTML = i > 9? i:"0"+ i
        cells2[i - 1].innerHTML = i
    }
    // document.querySelector('.week-bar').innerHTML = rowsDay
    // console.log(cells1)
}

//点击改变外层days
let outDay = document.getElementById('changeDay');
outDay.addEventListener('touchend', function(e) {
    let changeDay = e.target.innerHTML;
    curDate = changeDay;
    displayDayList(curYear, curMonth, "daysList")
    console.log(curYear, curMonth + 1, Number(curDate))
})

//显示日期列表
displayDayList(curYear, curMonth, "daysList")


//动态控制滚动条
let Scroll = document.getElementById('dayScroll')
window.onload = function autoScroll(e) {
    console.log(Scroll)
    Scroll.scrollLeft += 50 * (curDate - 4)

}
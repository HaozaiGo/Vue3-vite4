//  计算器
let addOrReduce = function(id, method) {
    if (method) {
        let count = $(id).html();
        count++;
        $(id).html(count)
    } else {
        let count = $(id).html();
        count--;
        if (count <= 0) return;
        $(id).html(count);

    }

};
// 切换item选项 active-->active样式
let swichBtn = function(position, active) {
    $(position).click(function() {
        $(this).addClass(active).siblings().removeClass(active);
        let i = $(this).attr('i');
        console.log($('#' + i))
        $('#' + i).removeClass('hidden').siblings().addClass('hidden')
    })

}


export { addOrReduce, swichBtn }
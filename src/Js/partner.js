 // 上方切换图片
 let arrRow = [{
     img: '../images/partner/wuliao.png'
 }, {
     img: '../images/partner/light.png'
 }, {
     img: '../images/partner/message.png'
 }, {
     img: '../images/partner/shop.png'
 }, {
     img: '../images/partner/personal.png'
 }, {
     img: '../images/partner/teach.png'
 }, {
     img: '../images/partner/line.png'
 }];
 // 详细描述
 let arrCommend = [{
     id: 0,
     title: '给物料',
     commend: '物料描述'
 }, {
     id: 1,
     title: 'No3',
     commend: '这是No3描述'
 }, {
     id: 2,
     title: 'No4',
     commend: '这是No4'
 }, {
     id: 3,
     title: 'No5',
     commend: '这是No5'
 }, {
     id: 4,
     title: 'No6',
     commend: '这是No6'
 }, {
     id: 5,
     title: 'No7',
     commend: '这是No7'
 }, {
     id: 6,
     title: 'No8',
     commend: '这是No8'
 }, ];

 let swiperBox = document.getElementById('change');
 swiperBox.addEventListener('touchend', function() {
     let picking = document.getElementsByClassName('swiper-slide-active');

     setTimeout(function() {
         let pickingId = picking[0].id;
         let nowCommend = arrCommend.filter(x => {
             return x.id == pickingId;
         })
         $('#commend1').text(nowCommend[0].title);
         $('#commend2').text(nowCommend[0].commend)
         console.log(nowCommend[0].commend)
         console.log(picking[0].id)
     }, 200);

 })
 for (let i = 0; i < arrRow.length; i++) {
     let everyOne =
         `<div class="swiper-slide" id="${i}">
          <div>
              <img src="${arrRow[i].img}" alt="">
          </div>
      </div>`;
     $('.swiper-wrapper').append(everyOne)
 }
 var swiper = new Swiper('.swiper-container', {
     slidesPerView: 5,
     spaceBetween: 31,
     centeredSlides: true,
     // centeredSlidesBounds:true,
     // slidesPerView: "auto",
     loop: true,

 });
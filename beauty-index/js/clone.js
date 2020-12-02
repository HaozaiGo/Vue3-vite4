$(function($) {
    $('.menu').on('click', function() {
        // $(this).toggleClass('active');
        $(".nav").toggleClass('menuOpen')
        $(".pusher").toggleClass('menuOpen')
        $(".navMark").stop().fadeToggle(600);
    })
    if (browserWidth >= 1024) {
        // $('.nav>ul>li').hover(function () {
        //     // $(this).addClass('active');
        //     $(this).children('.dropdown').css('display', 'block').stop().animate({
        //         left: "-30",
        //         opacity: "1",
        //     }, {
        //         easing: 'easeOutCubic',
        //         duration: 1000,
        //         queue: false,
        //     });
        // }, function () {
        //     // $(this).removeClass('active');
        //     $(this).children('.dropdown').stop().animate({
        //         left: "0",
        //         opacity: "0",
        //     }, {
        //         easing: 'easeOutCubic',
        //         duration: 700,
        //         queue: false,
        //         complete: function () {
        //             $(this).css('display', 'none');
        //         }
        //     });
        // });

        $(".nav li").mouseenter(function() {
            $(this).children(".dropdown").stop().slideDown(200)
        }).mouseleave(function() {
            $(this).children(".dropdown").stop().slideUp(200)
        })
    } else {
        $(".nav li").click(function() {
            // $(this).toggleClass("active")
            $(this).children(".dropdown").stop().slideToggle(300)
        })
    }

    $(".apply, .cardInBtn, .idxbanner").click(function(e) {
        $(".navMark").fadeIn()
        $(".applyView").fadeIn()
        e.stopPropagation();
        $(".nav").removeClass('menuOpen')
    })
    $(".navMark").click(function(e) {
            $(".navMark").fadeOut()
            $(".applyView").fadeOut()
            $(".nav").removeClass('menuOpen')
            e.stopPropagation();
        })
        // $('.applyView,.menu,.nav li').click(function (event) {
        //     event.stopPropagation();
        // })
        // $(window).on('click', function () {
        //     $(".navMark").fadeOut()
        //     $(".applyView").fadeOut()
        // })

    $(".navClose,.x").click(function(e) {
        $(".navMark").fadeOut()
        $(".applyView").fadeOut()
        $(".nav").removeClass('menuOpen')
        e.stopPropagation();
    })

    $(".showBtn").click(function(e) {
        /**
      $(".navMark").fadeIn()
      $(".showView").fadeIn().css("width", "auto")
  **/
        e.stopPropagation();
        $(".nav").removeClass('menuOpen')
    })

    // var idxNewsItem = 0;
    // for (var index = 1; index < $(".idxNewsItem").length; index++) {
    //     idxNewsItem += 200;
    //     $(".idxNewsItem").eq(index).attr("data-aos-delay", idxNewsItem)
    // }
    var slider = new FtSlider({
        id: "slider",
        width: 320,
        height: 42,
        textMsg: "拖动滑块到右边",
        successMsg: "验证成功",
        callback: function(res) {
            if (res) {
                $(".applyBtn").removeClass('disabled')
                $(".applyBtn").removeAttr('disabled')
            }
        }
    });

    $("#slider-pc").slider({
        width: 800,
        height: 43,
        // height
        sliderBg: "rgb(255, 255, 255)",
        bgColor: "#33b1e2",
        callback: function(result) {
            if (result) {
                $(".applyBtn").removeClass('disabled')
                $(".applyBtn").removeAttr('disabled')
            }
        }
    });

})
var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

AOS.init({
    duration: 1500,
    easing: "ease-out-back",
    disable: window.innerWidth <= 1024,
    once: true,
    anchorPlacement: 'top-center'
});

//手机
! function() {
    function t(t) {
        this.init(t)
    }
    var e = {
        width: 280,
        height: 34,
        textMsg: "请按住滑块，拖动到最右边",
        successMsg: "验证成功",
        callback: function() {}
    };
    t.prototype = {
            init: function(t) {
                this.opts = this.extend(e, t),
                    this.render()
            },
            render: function() {
                this.ele = document.getElementById(this.opts.id);
                var t = '<div class="ft-slider-content lock">' + this.opts.textMsg + '</div><div class="ft-slider-bar" style="transform:translate3d(0,0,0);"></div><div class="ft-slider-bg"></div>',
                    e = document.createElement("div");
                e.className = "ft-slider",
                    e.innerHTML = t,
                    this.ele.appendChild(e),
                    this.setOptions(),
                    this.drag()
            },
            setOptions: function() {
                var t = this.ele.getElementsByClassName("ft-slider")[0],
                    e = t.getElementsByClassName("ft-slider-bar")[0],
                    s = this.opts,
                    i = "number" == typeof s.width ? s.width + "px" : s.width,
                    n = "number" == typeof s.height ? s.height + "px" : s.height;
                t.style.width = i,
                    t.style.height = n,
                    t.style.lineHeight = t.offsetHeight + "px",
                    e.style.width = t.offsetHeight + "px",
                    e.style.height = t.offsetHeight + "px"
            },
            restore: function() {
                if (this.result) {
                    var t = this.opts,
                        e = this.ele.getElementsByClassName("ft-slider")[0],
                        s = e.getElementsByClassName("ft-slider-bar")[0],
                        i = e.getElementsByClassName("ft-slider-content")[0],
                        n = e.getElementsByClassName("ft-slider-bg")[0];
                    this.result = !1,
                        i.className = "ft-slider-content lock",
                        s.style.transform = "translate3d(0,0,0)",
                        n.style.width = 0,
                        s.className = "ft-slider-bar transition",
                        i.textContent = t.textMsg
                }
            },
            drag: function() {
                var t = this.ele.getElementsByClassName("ft-slider-bar")[0];
                this.isDrag = !1,
                    this.result = !1,
                    this.start(t),
                    this.move(t),
                    this.end(t)
            },
            start: function(t) {
                var e = this,
                    s = this.ele.getElementsByClassName("ft-slider-bg")[0];
                t.addEventListener("touchstart", function(t) {
                    e.result || (this.className = "ft-slider-bar",
                        s.className = "ft-slider-bg",
                        e.isDrag = !0,
                        e.strartX = t.touches[0].clientX,
                        t.preventDefault())
                }, !1)
            },
            move: function(t) {
                var e = this,
                    s = this.ele.getElementsByClassName("ft-slider")[0],
                    i = s.getElementsByClassName("ft-slider-bg")[0];
                t.addEventListener("touchmove", function(t) {
                    if (e.isDrag && !e.result) {
                        var n = t.touches[0].clientX - e.strartX,
                            l = s.offsetWidth - s.offsetHeight;
                        n = n > 0 ? n > l ? l : n : 0,
                            this.style.transform = "translate3d(" + n + "px,0,0)",
                            i.style.width = n + "px",
                            t.preventDefault()
                    }
                }, !1)
            },
            end: function(t) {
                var e = this,
                    s = this.ele.getElementsByClassName("ft-slider")[0],
                    i = s.getElementsByClassName("ft-slider-bg")[0],
                    n = s.getElementsByClassName("ft-slider-content")[0],
                    i = s.getElementsByClassName("ft-slider-bg")[0];
                t.addEventListener("touchend", function(t) {
                    if (e.isDrag) {
                        var l = e.opts,
                            a = l.callback,
                            r = t.changedTouches[0].clientX - e.strartX,
                            d = s.offsetWidth - s.offsetHeight,
                            h = 0;
                        r >= d ? (h = d,
                                n.textContent = l.successMsg,
                                this.className = this.className += " success",
                                n.className = "ft-slider-content success",
                                e.result = !0) : e.result = !1,
                            this.className = e.result ? "ft-slider-bar success transition" : "ft-slider-bar transition",
                            i.className = "ft-slider-bg transition",
                            i.style.width = h + "px",
                            this.style.transform = "translate3d(" + h + "px,0,0)",
                            e.isDrag = !1,
                            a && a(e.result),
                            t.preventDefault()
                    }
                }, !1)
            },
            extend: function(t, e) {
                var s = {};
                if (!e.id)
                    throw "id is required";
                for (var i = 0; i < arguments.length; i++)
                    for (option in arguments[i])
                        s[option] = arguments[i][option];
                return s
            },
            getTranslateX: function(t) {
                return parseInt(t.match(/-?\d+(?=px)/g)[0])
            }
        },
        window.FtSlider = t
}();
//pc
(function(t, i, s, e) {
    var l = function(i, s) {
        this.ele = i;
        this.defaults = {
            width: 300,
            height: 34,
            sliderBg: "#e8e8e8",
            color: "#666",
            fontSize: 12,
            bgColor: "#7ac23c",
            textMsg: "请按住滑块，拖动到最右边",
            successMsg: "验证成功",
            successColor: "#fff",
            time: 160,
            callback: function(t) {}
        };
        this.opts = t.extend({}, this.defaults, s);
        this.init()
    };
    l.prototype = {
        init: function() {
            this.result = false;
            this.sliderBtn_left = 0;
            this.maxLeft = this.opts.width - this.opts.height;
            this.render();
            this.eventBind()
        },
        render: function() {
            var t = '<div class="ui-slider-wrap">' + '<div class="ui-slider-text ui-slider-no-select">' + this.opts.textMsg + "</div>" + '<div class="ui-slider-btn init ui-slider-no-select"></div>' + '<div class="ui-slider-bg"></div>' + "</div>";
            this.ele.html(t);
            this.initStatus()
        },
        initStatus: function() {
            var t = this;
            var i = this.ele;
            this.slider = i.find(".ui-slider-wrap");
            this.sliderBtn = i.find(".ui-slider-btn");
            this.bgColor = i.find(".ui-slider-bg");
            this.sliderText = i.find(".ui-slider-text");
            this.slider.css({
                width: t.opts.width,
                height: t.opts.height,
                backgroundColor: t.opts.sliderBg
            });
            this.sliderBtn.css({
                width: t.opts.height,
                height: t.opts.height,
                lineHeight: t.opts.height + "px"
            });
            this.bgColor.css({
                height: t.opts.height,
                backgroundColor: t.opts.bgColor
            });
            this.sliderText.css({
                lineHeight: t.opts.height + "px",
                fontSize: t.opts.fontSize,
                color: t.opts.color
            })
        },
        restore: function() {
            var t = this;
            var i = t.opts.time;
            this.result = false;
            this.initStatus();
            this.sliderBtn.removeClass("success").animate({
                left: 0
            }, i);
            this.bgColor.animate({
                width: 0
            }, i, function() {
                t.sliderText.text(t.opts.textMsg)
            })
        },
        eventBind: function() {
            var t = this;
            this.ele.on("mousedown", ".ui-slider-btn", function(i) {
                if (t.result) {
                    return
                }
                t.sliderMousedown(i)
            })
        },
        sliderMousedown: function(t) {
            var i = this;
            var s = t.clientX;
            var e = s - this.sliderBtn.offset().left;
            i.sliderMousemove(s, e);
            i.sliderMouseup()
        },
        sliderMousemove: function(i, e) {
            var l = this;
            t(s).on("mousemove.slider", function(t) {
                l.sliderBtn_left = t.clientX - i - e;
                if (l.sliderBtn_left < 0) {
                    return
                }
                if (l.sliderBtn_left > l.maxLeft) {
                    l.sliderBtn_left = l.maxLeft
                }
                l.sliderBtn.css("left", l.sliderBtn_left);
                l.bgColor.width(l.sliderBtn_left)
            })
        },
        sliderMouseup: function() {
            var i = this;
            t(s).on("mouseup.slider", function() {
                if (i.sliderBtn_left != i.maxLeft) {
                    i.sliderBtn_left = 0
                } else {
                    i.ele.find(".ui-slider-text").text(i.opts.successMsg).css({
                        color: i.opts.successColor
                    });
                    i.ele.find(".ui-slider-btn").addClass("success");
                    i.result = true
                }
                i.sliderBtn.animate({
                    left: i.sliderBtn_left
                }, i.opts.time);
                i.bgColor.animate({
                    width: i.sliderBtn_left
                }, i.opts.time);
                t(this).off("mousemove.slider mouseup.slider");
                if (i.opts.callback && typeof i.opts.callback === "function") {
                    i.opts.callback(i.result)
                }
            })
        }
    };
    t.fn.slider = function(i) {
        return this.each(function() {
            var s = t(this);
            var e = s.data("slider");
            if (!e) {
                e = new l(s, i);
                s.data("slider", e)
            }
            if (typeof i === "string") {
                e[i]()
            }
        })
    }
})(jQuery, window, document);
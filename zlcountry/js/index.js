$(function() {




    //swiper
    var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        noSwiping: true,
        // initialSlide :2,
        on: {
            reachEnd: function() {
                //切换到最后一个执行
                //阻止下拉回弹效果
                var overscroll = function(el) {
                    el.addEventListener('touchstart', function() {
                        var top = el.scrollTop,
                            totalScroll = el.scrollHeight,
                            currentScroll = top + el.offsetHeight;
                        if (top === 0) {
                            el.scrollTop = 1;
                        } else if (currentScroll === totalScroll) {
                            el.scrollTop = top - 1;
                        }
                    });

                    el.addEventListener('touchmove', function(evt) {
                        if (el.offsetHeight < el.scrollHeight)
                            evt._isScroller = true;
                    });
                }

                overscroll(document.querySelector('.section3 .adjust_con'));
                document.body.addEventListener('touchmove', function(evt) {
                    if (!evt._isScroller) {
                        evt.preventDefault();
                    }else{
                    	//$('.section3').removeClass('swiper-no-swiping');
                    }
                });
                $('.section3').addClass('swiper-no-swiping');
               
                $('.section3 .adjust_con').scroll(function() {
                    //console.log($(this).scrollTop())
                    if ($(this).scrollTop() == 0 || $(this).scrollTop() == $(this).height() - $(window).height()) {
                        $('.section3').removeClass('swiper-no-swiping');
                    }
                })

            }
        },

    });

    var startScroll, touchStart, touchCurrent;
    swiper.slides.on('touchstart', function(e) {
        startScroll = this.scrollTop;
        touchStart = e.targetTouches[0].pageY;
    }, true);
    swiper.slides.on('touchmove', function(e) {
        touchCurrent = e.targetTouches[0].pageY;
        var touchesDiff = touchCurrent - touchStart;
        var slide = this;
        var onlyScrolling =
            (slide.scrollHeight > slide.offsetHeight) &&
            (
                (touchesDiff < 0 && startScroll === 0) ||
                (touchesDiff > 0 && startScroll === (slide.scrollHeight - slide.offsetHeight)) ||
                (startScroll > 0 && startScroll < (slide.scrollHeight - slide.offsetHeight))
            );
        if (onlyScrolling) {
            e.stopPropagation();
        }
    }, true);




    function onResize() {
        var WIDTH = $(window).width() > 750 ? 750 : $(window).width();
        var HEIGHT = $(window).height();
        var vWidth = 750;
        var scale = WIDTH / vWidth;
        var vHeight = HEIGHT / scale
        $('.adjust_con').css("width", vWidth);
        $('.adjust_con').css("height", vHeight);
        $('.adjust_con').css("transform", "scale(" + scale + ")");

    };
    onResize();

    $('.car_box').on('click', function() {
        $(this).siblings('.car_box').find('.carinfo').removeClass('show');
        $(this).find('.carinfo').toggleClass('show');
    })
    //解决部分ios 层级问题
     $('.obj').each(function(i,e){
        $(e).css('z-index',i+1)
     })
})
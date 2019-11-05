/*
 * name: on-scroll
 * version: v2.2.0
 * update: 增加侧导航
 * date: 2017-10-21
 */
define('on-scroll', function(require, exports, module) {
	var $ = require('jquery');
	var base = require('base');
	var def = {
		offset: null,
		target: null,
		targetCell: 'li',
		targetFix: null,
		speed: 320,
		targetFixTop:0,
		sideNav:null,
		sideNavCell:'a',
		onshow: function() {}
	};

	$.fn.onScroll = function(config) {
		var $this = $(this),
			winH = $(window).height(),
			opt = $.extend({}, def, config || {}),
			$target,
			watchScroll,
			catchScroll,
			scrollCache = $(window).scrollTop(),
			scrollDown,
			scrollLock,
			_setTime,
			$sideNav,
			targetFixTop=opt.targetFixTop;
		if (!$this.length) {
			return console.log('.' + $this.selector + '未找到');
		};

		function startScroll(n){
			scrollLock = true;
			$('body,html').stop(1).animate({
					"scrollTop": n
				},
				opt.speed,
				function() {
					clearTimeout(_setTime);
					_setTime = setTimeout(function() {
							scrollLock = false;
						}, opt.speed + 480) //需要比一般的时间长
				}
			);
		}

		// 获取目标及绑定事件
		if(opt.sideNav){
			
			if (!$(opt.sideNav).children(opt.sideNavCell).length) {
				console.log('sideNav has no targetCells!');
				return $this;
			};
			$sideNav = $(opt.sideNav);

			if ($this.length !== $sideNav.children(opt.sideNavCell).length) {
				console.log("sideNav 内a标签与绑定目标数量不同，无法绑定");
				return $this;
			};
			
			$sideNav.on('click',opt.sideNavCell,function(e){
				var _posi = $this.eq($(this).index()).offset().top - opt.offset;
				e.preventDefault();
				startScroll(_posi);
			})

		}
		if (opt.target) {
			if (!$(opt.target).children(opt.targetCell).length) {
				console.log('target has no targetCells!');
				return $this;
			};
			$target = $(opt.target);
			var theFixTarget, targetTop;
			if (opt.targetFix && $(opt.targetFix).length) {
				theFixTarget = $(opt.targetFix);
			} else {
				theFixTarget = $target;
			};
			targetTop = theFixTarget.offset().top-targetFixTop;
			console.log('targetTop::'+targetTop)
			if (!opt.offset) {
				opt.offset = parseInt(theFixTarget.outerHeight());
			};
			if ($this.length !== $target.children(opt.targetCell).length) {
				console.log("'." + $this.selector + "' 与绑定目标数量不同，无法绑定");
				return $this;
			};
			$target.on('click', opt.targetCell, function(e) {
				e.preventDefault();
				var _posi = $this.eq($(this).index(opt.target + ' ' + opt.targetCell)).offset().top - opt.offset;
				startScroll(_posi);
			})

			
		};
		// 滚动定位（函数节流）
		catchScroll = base.throttle(function(winT) {
			var _eIndex;
			if (scrollCache < winT) {
				scrollDown = true;
			} else {
				scrollDown = false;
			}
			scrollCache = winT;
			if (scrollDown) {
				//向下
				$this.each(function(i, e) {
				
					/*var dis= $(e).offset().top - $(window).scrollTop();
					console.log('dis'+dis);
					if (dis< (winH/2)) {
						_eIndex = $(e).index($this.selector);
						console.log('1111index:::'+_eIndex)
						if (!$(e).data('onscrolldone')) {
							$(e).data('onscrolldone', 1);
							opt.onshow && opt.onshow(e);
						}
					}*/
					if (parseInt($(e).offset().top) <= ($target ? 0 : winH) + winT + opt.offset) {
						_eIndex = $(e).index($this.selector);
						if (!$(e).data('onscrolldone')) {
							$(e).data('onscrolldone', 1);
							opt.onshow && opt.onshow(e);
						}
					}
				});
			} else {
				//向上
				$this.each(function(i, e) {
					if (parseInt($(e).offset().top) >= winT + opt.offset) {
						_eIndex = $(e).index($this.selector);
						return false;
					}
				});
			}

			$target && $target.children(opt.targetCell).eq(_eIndex).addClass('active').siblings().removeClass('active');
			$sideNav && $sideNav.children(opt.sideNavCell).eq(_eIndex).addClass('active').siblings().removeClass('active');
		});
		watchScroll = function(winH, winT) {
			// 添加目标定位类
			if (theFixTarget) {
				if (targetTop <= winT) {
					theFixTarget.addClass('fixed');
				} else {
					theFixTarget.removeClass('fixed');
				};
			};
			catchScroll(winT);
		};
		watchScroll(winH, $(window).scrollTop());
		$(window).bind({
			'scroll': function() {
				watchScroll(winH, $(window).scrollTop());
			},
			'resize': function() {
				watchScroll($(window).height(), $(window).scrollTop());
			}
		});
		return $this;
	}
});
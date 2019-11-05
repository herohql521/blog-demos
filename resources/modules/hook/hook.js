/**
 * name: Hook.js
 * Version: 2.0.0
 * update: 内嵌style
 * date: 2015-05-09
 * Author: http://www.usehook.com
 */

define('hook',function(require, exports, module) {
	var $ = require('jquery');
	seajs.importStyle('.hook *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin:0 auto}.hook{position:relative;z-index:9;display:none;clear:both;overflow:hidden;width:100%;height:85px;text-align:center;background:#ddd;box-shadow:0 -8px 5px -5px #999 inset}.hook-text{font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:normal;color:#666;text-shadow:0 1px #fff}.hook-loader{padding:25px 0}.hook-spinner{display:block;width:32px;height:32px;-webkit-animation:spin 1s linear infinite both;-moz-animation:spin 1s linear infinite both;-o-animation:spin 1s linear infinite both;animation:spin 1s linear infinite both;background:url(/resources/modules/hook/hook-spinner.png) no-repeat center}.hook-with-text .hook-loader{padding:10px 0}@media only screen and (-webkit-min-device-pixel-ratio:2),only screen and (min--moz-device-pixel-ratio:2),only screen and (-o-min-device-pixel-ratio:2/1),only screen and (min-device-pixel-ratio:2),only screen and (min-resolution:192dppx),only screen and (min-resolution:2dppx){.hook-spinner{background:url(/resources/modules/hook/hook-spinner@2x.png) no-repeat center;background-size:32px 32px}}@-webkit-keyframes spin{0{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}@-moz-keyframes spin{0{-moz-transform:rotate(0)}100%{-moz-transform:rotate(360deg)}}@-o-keyframes spin{0{-o-transform:rotate(0)}100%{-o-transform:rotate(360deg)}}@keyframes spin{0{transform:rotate(0)}100%{transform:rotate(360deg)}}'
		,module.uri)
	require('mousewheel');

	var win = $(this),
		st = win.scrollTop() || window.pageYOffset,
		called = false;
	var hasTouch = function() {
			return !!('ontouchstart' in window) || !! ('onmsgesturechange' in window)
		};
	var handlers = {};
	var addHandler = function(name, fn) {
			win.on(name, fn);
			handlers[name] = fn
		};
	var removeHandler = function(name, fn) {
			win.off(name, handlers[name]);
			delete handlers[name]
		};
	var removeHandlers = function() {
			for (var name in handlers) {
				removeHandler(name)
			}
		};
	var methods = {
		init: function(options) {
			return this.each(function() {
				var $this = $(this),
					settings = $this.data('hook');
				if (typeof(settings) === 'undefined') {
					var defaults = {
						reloadPage: true,
						dynamic: true,
						textRequired: false,
						scrollWheelSelected: false,
						swipeDistance: 50,
						loaderClass: 'hook-loader',
						spinnerClass: 'hook-spinner',
						loaderTextClass: 'hook-text',
						loaderText: 'Reloading...',
						reloadEl: function() {}
					};
					settings = $.extend({}, defaults, options);
					$this.data('hook', settings)
				} else {
					settings = $.extend({}, settings, options)
				}
				if (settings.dynamic === true) {
					var loaderElem = '<div class=' + settings.loaderClass + '>';
					loaderElem += '<div class=' + settings.spinnerClass + '/>';
					loaderElem += '</div>';
					var spinnerTextElem = '<span class=' + settings.loaderTextClass + '>' + settings.loaderText + '</span>';
					$this.append(loaderElem);
					if (settings.textRequired === true) {
						$this.addClass('hook-with-text');
						$this.append(spinnerTextElem)
					}
				}
				if (!hasTouch()) {
					if (settings.scrollWheelSelected === true) {
						addHandler('mousewheel', function(event, delta) {
							methods.onScroll($this, settings, delta)
						})
					} else {
						addHandler('scroll', function() {
							methods.onScroll($this, settings)
						})
					}
				} else {
					var lastY = 0,
						swipe = 0;
					addHandler('touchstart', function(e) {
						lastY = e.originalEvent.touches[0].pageY
					});
					addHandler('touchmove', function(e) {
						swipe = e.originalEvent.touches[0].pageY + lastY;
						st = $(this).scrollTop();
						if (swipe < settings.swipeDistance) {
							e.preventDefault()
						}
						if (swipe > settings.swipeDistance && lastY <= 140) {
							methods.onSwipe($this, settings)
						}
					});
					addHandler('touchend', function() {
						swipe = 0
					})
				}
			})
		},
		onScroll: function(el, settings, delta) {
			st = win.scrollTop();
			if (settings.scrollWheelSelected === true && (delta >= 150 && st <= 0)) {
				if (called === false) {
					methods.reload(el, settings);
					called = true
				}
			}
			if (settings.scrollWheelSelected === false && st <= 0) {
				if (called === false) {
					methods.reload(el, settings);
					called = true
				}
			}
		},
		onSwipe: function(el, settings) {
			if (st <= 0) {
				methods.reload(el, settings)
			}
		},
		reload: function(el, settings) {
			el.show();
			el.animate({
				"marginTop": "0px"
			}, 200);
			el.delay(500).slideUp(200, function() {
				if (settings.reloadPage) {
					window.location.reload(true)
				}
				called = false
			});
			if (!settings.reloadPage) {
				settings.reloadEl()
			}
		},
		destroy: function() {
			removeHandlers();
			return $(this).each(function() {
				var $this = $(this);
				$this.empty();
				$this.removeData('hook')
			})
		}
	};
	$.fn.hook = function() {
		var method = arguments[0];
		if (methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1)
		} else if (typeof(method) === 'object' || !method) {
			method = methods.init
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.pluginName');
			return this
		}
		return method.apply(this, arguments)
	};
	module.exports = function(opt){
		if(!$('.hook').length){
			$('body').prepend('<div class="hook" />');
		};
		$('.hook').hook(opt);
	};
});
/*
 * name: imgAuto
 * version: v1.0.0
 * update: 整理
 * date: 2014-12-03
 */
define('img-auto',function(require) {
	var $ = require('jquery');
	var imgReady = require('img-ready');
	$.fn.imgAuto = function(callback) {
		var $this = $(this),
			img_ = $this.find('img'),
			$src = img_.attr('src'),
			$prop = Math.floor($this.width() / $this.height() * 100) / 100,
			showAuto = setTimeout(function() {
				img_.css('opacity', 1);
			}, 2000),
			_thisH = $this.height() + 'px';
		if (!$this.length) {
			return;
		};
		if (img_.length !== 1) {
			if (window.console) {
				console.log('imgAuto.js: img.length muse be "1"!');
			}
			return;
		};
		$this.css({
			'text-align': 'center',
			'line-height': _thisH,
			'overflow': 'hidden'
		});
		img_.css({
			'opacity': 0,
			'display': 'inline-block',
			'vertical-align': 'middle'
		});
		imgReady($src, function(width, height) {
			var $myprop = Math.floor(width / height * 100) / 100;
			clearTimeout(showAuto);
			if (width > $this.width() || height > $this.height()) {
				if ($myprop >= $prop) {
					img_.width($this.width());
				} else {
					img_.height($this.height())
				};
				
			};
			callback && callback();
		}, function() {
			img_.animate({
				opacity: 1
			}, 256)
		});
	};
})
/*
 * name: sharemore.js
 * version: v1.1.1
 * date: 2017-12-04
 * author:hql
 */
 define('sharemore', function(require, exports, module) {
 	var $ = require('jquery');
 	seajs.importStyle('.share-more-box{position:fixed; width:300px; height:230px;z-index:1000; border: 6px solid #8F8F8F; text-align: left; box-shadow: 0 0 7px #aaa; -webkit-box-shadow: 0 0 7px #aaa; -moz-box-shadow: 0 0 7px #aaa; border-radius: 5px; -webkit-border-radius: 5px; -moz-border-radius: 5px; overflow: hidden; background: #f6f6f6; left:50%; margin-left:-150px; top:50%; margin-top:-115px; display:none;}\
	.share-more-box .sharetit-box{height:30px; line-height:30px; color:#626262; overflow:hidden; font-weight:bold;font-size:14px;  padding:0 5px;}\
	.share-more-box .sharetit-box .share-more-close{float:right; width:22px; height:23px; display:block; margin-top:3px; background:url(http://bdimg.share.baidu.com/static/api/img/share/pop_c.gif?v=2d7108c8.gif) 0 0 no-repeat;}\
	.share-more-box .share-list{background:#fff; padding:10px 0; overflow:auto; overflow-x:hidden; height:180px;}\
	.share-more-box .share-list li{float:left;width:130px; padding:2px; padding-left:18px; height:28px; overflow:hidden;border-radius: 5px; -webkit-border-radius: 5px; -moz-border-radius: 5px;}\
	.share-more-box .share-list li a{padding-left:28px;}\
	.share-more-box .share-list li:hover{background:#f3f3f3;}\
	.st_sharethis_large{position:absolute; left:-999999px;width:0; height:0; display:block; overflow:hidden;}', module.uri);
 	var def = {
		type: 'zh', //语言 zh en
		act:'click' //事件 默认click 	
	};
	$.fn.sharemore = function(config){
		return $(this).each(function(i,e){
			var opt = $.extend({}, def, config || {});
			var $this = $(e).addClass('shareType-' + opt.type);
			var zhDom,enDom,enJs1,enJs2,enJs3,_location;
			//检测类型
			;(function(){
				if(opt.type === 'zh'){
					zhDom = "<div class='share-more-box'><div class='sharetit-box'><a href='javascript:;' title='关闭' class='share-more-close'></a>分享到</div><ul class='share-list bdsharebuttonbox'><li><a class='bds_qzone' data-cmd='qzone' href='#' title='分享到QQ空间'>QQ空间</a></li><li><a class='bds_sqq' data-cmd='sqq' href='#' title='分享给QQ好友'>QQ好友</a></li><li><a class='bds_tsina' data-cmd='tsina' title='分享到新浪微博'>新浪微博</a></li><li><a class='bds_weixin' data-cmd='weixin' title='分享到微信'>微信</a></li><li><a class='bds_tieba' data-cmd='tieba' title='分享到百度贴吧'>百度贴吧</a></li><li><a class='bds_douban' data-cmd='douban' title='分享到豆瓣'>豆瓣</a></li></ul></div>";
					//<li><a class='bds_renren' data-cmd='renren' title='分享到人人网'>人人网</a></li>
					if($('.share-more-box').length==0){
			          $('body').append(zhDom);
			        };
				}else if(opt.type === 'en'){
					_location = typeof($('#seajsConfig').attr('domain')) == "undefined"?window.location.origin:$('#seajsConfig').attr('domain');
					
					enDom = "<a href='#' class='st_sharethis_large'></a>";
					enJs1 = "<script type='text/javascript' fixed='true'>var switchTo5x=true;</script>";
				    enJs2 = "<script type='text/javascript' fixed='true'  src='"+_location+"/resources/modules/sharethisButtons.js'></script>";
				    enJs3 ="<script type='text/javascript' fixed='true'>\
				    if(typeof(stLight)!='undefined'){stLight.options({publisher: '04cbca87-1364-40b6-8518-d1f1ef11ad38-051c', doNotHash: false, doNotCopy: false, hashAddressBar: false});}</script>";
				    if($('.st_sharethis_large').length==0){
				        $('body').append(enDom);
				        $('body').append(enJs1);
				        $('body').append(enJs2);
				        $('body').append(enJs3);
        			}
				}
				
			})();
			//事件绑定
			$(this).on(opt.act,function(){
				if($('.share-more-box').length){
					$('.share-more-box').fadeIn();
					$('.share-more-box').on('click','.share-more-close',function(){
			           $('.share-more-box').fadeOut();
			        });
				}else if($('.st_sharethis_large').length){
					$('.st_sharethis_large').trigger('click');
				}else{
					console.log('dom载入失败')
				}
			})
		})
	}
 });
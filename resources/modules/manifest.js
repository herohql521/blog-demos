/*
* name: manifest.js
* version: v1.0.1
* update: 添加appcan通信插件
* date: 2016-04-01
*/
define('manifest',function(){
    var mod = {
        'album'                             : 'v2.2.13',
        'audio/audio'                       : 'v1.0.1',
        'autocomplete'                      : 'v0.0.1',
        'base'                              : 'v2.16.3',
        'bdshare'                           : 'v3.1.2',
        'box'                               : 'v3.10.1',
        'copy/ZeroClipboard'                : 'v0.0.1',
        'drag'                              : 'v0.5.0',
        'easing'                            : 'v0.0.1',
        'etpl'                              : 'v0.0.1',
        'fastclick'                         : 'v0.0.1',
        'flv/flv'                           : 'v0.0.2',
        'hoverdir'                          : 'v0.0.1',
        'img-loaded'						: 'v0.0.1',
        'img-ready'							: 'v1.0.0',
        'instantclick'						: 'v0.0.1',
        'jquery/1/jquery'                   : 'v1.12.4',
        'jquery/2/jquery'                   : 'v2.1.4',
        'jrange'                            : 'v0.0.1',
        'json'                              : 'v0.0.1',
        'lazyload'							: 'v2.0.1',
        'lettering'                         : 'v2.0.1',
        'marquee'                           : 'v0.10.1',
        'masonry'                           : 'v0.0.1',
        'mousemenu'                         : 'v1.0.0',
        'modernizr'                         : 'v0.0.1',
        'mousetrap'                         : 'v1.5.3',
        'mousewheel'                        : 'v0.0.1',
        'My97DatePicker/WdatePicker'        : 'v0.0.1',
        'offcanvas'                         : 'v2.0.5',
        'photowall'							: 'v0.1.1',
        'on-scroll'                         : 'v2.1.3',
        'qr'								: 'v0.1.0',
        'owlCarousel'                       : 'v2.0.0',
        'raty/raty'                         : 'v0.1.0',
        'scroll-bar'						: 'v2.2.7',
        'scroll-col'                        : 'v4.2.4',
        'scroll-loading'                    : 'v0.0.1',
        'scroll-row'                        : 'v3.0.6',
        'select'							: 'v3.1.9',
        'skrollr'                           : 'v0.0.1',
        'slide'								: 'v4.1.9',
        'smoothscroll'                      : 'v1.4.6',
        'superscrollorama'                  : 'v0.0.1',
        'tab'								: 'v2.1.2',
        'tip'								: 'v1.2.2',
        'touch'								: 'v0.1.1',
        'tweenmax'                          : 'v1.18.5',
        'validform/validform'               : 'v2.2.3',
        'video/video'                       : 'v5.18.4',
        'webuploader/webuploader'           : 'v1.0.0',
        'zoom'								: 'v2.0.2'
    }
    var manifest = {}
    for(var key in mod){
        manifest[seajs.data.base + key + '.js'] = mod[key]
    }
    seajs.data.localcache.manifest = manifest;
    
})
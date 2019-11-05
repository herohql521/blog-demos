// helper
define(function(require, exports, module) {
    var $ = require('jquery');

    module.exports = {
        ViewCount: function(param, callback) {
            $.ajax({
                url: "/tools/viewCount.jsp?inforId=" + param.id + "&inforTable=" + param.table,
                type: "post",
                dataType: "text",
                success: function(count) {
                    if (callback) {
                        callback(count)
                    }
                }
            })
        },
        getInforPN: function(param, callback) {
            $.ajax({
                url: "/tools/getInfoPrevNext.jsp?inforId=" + param.id + "&inforWn=" + param.wn + "&inforCn=" + param.cn,
                type: "post",
                dataType: "text",
                success: function(info) {
                    var json = eval('(' + info + ')'),
                        prev = json.prev,
                        next = json.next;
                    if (callback) {
                        callback(prev, next)
                    };
                }
            })
        },
        backToChannel: function(param, callback) {
            $.ajax({
                url: "/tools/backToChannel.jsp?inforWn=" + param.wn + "&inforCn=" + param.cn,
                type: "post",
                dataType: "text",
                success: function(href) {
                    if (callback) {
                        callback(href)
                    };
                }
            })
        }

    }

})

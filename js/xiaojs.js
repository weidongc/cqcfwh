var XiaoJS = (function () {

    function Model() {

    }

    /**
     * 标签切换
     */
    Model.prototype.changeOn = function (nav) {
        $(nav).addClass("on");
        $(nav).siblings(".on").removeClass("on");
    };

    /**
     * AJAX异步加载文章列表
     */
    Model.prototype.ajax = function (options, callback) {

        var loadConfig = {
            //请求地址
            url_api: '/plus/list.php',
            //0就是首页调用数据
            //列表:typeid:{dede:field name="typeid"/}
            //typeid:{dede:field name="typeid"/},
            typeid: options.typeid,
            page: options.page, //开始页码
            pagesize: options.pagesize, //需要渲染的数据条数
            loading: 0,//加载状态,默认为未加载
            subcategory: options.subcategory,
            ajax: options.ajax
        };

        function loadMoreApply() {
            if (loadConfig.loading == 0) {
                var typeid = loadConfig.typeid;
                var page = loadConfig.page;
                var pagesize = loadConfig.pagesize;
                var url = loadConfig.url_api;
                var data = {
                    ajax: !!loadConfig.ajax ? loadConfig.ajax : 'pullload',
                    typeid: typeid,
                    subcategory: loadConfig.subcategory,
                    page: page,
                    pagesize: pagesize
                };

                function ajax(url, data) {
                    $.ajax({
                        url: url,
                        data: data,
                        async: true,
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            if (callback && typeof callback === "function") {
                                callback(data);
                            }
                        }
                    });
                }

                ajax(url, data);
            }
        }

        loadMoreApply();
    };

    Model.prototype.page = function (context) {
        var that = this;
        var _num = 0;//首次加载
        var pageSize = 20;

        function query(page) {
            var id = $(context).data("id");
            var options = {
                typeid: id,
                subcategory: 0,
                page: !!page ? page : 1,
                pagesize: pageSize
            };
            that.ajax(options, function (data) {
                changeContent(data);
                if (_num == 0) {
                    $(context).Paging({
                        pagesize: pageSize,
                        count: data.total,
                        callback: function (page) {
                            query(page, pageSize);
                        }
                    });
                }
                _num++;
            });
        }

        function changeContent(data) {
            $(context).prev("ul").html("");
            if (data.statu == 1) {
                var html = [];
                $.each(data.list, function (index, item) {
                    var _html = "";
                    _html += '<li class="clearfix">';
                    _html += '<span></span>';
                    _html += '<span class="txt"><a href="' + item.arcurl + '">' + item.fulltitle + '</a></span>';
                    _html += '<span class="clearfix">';
                    _html += '<span class="fl"><i class="eye"></i>' + item.click + '次</span>';
                    _html += '<span class="fr">' + moment(new Date(item.pubdate * 1000)).format("YYYY-MM-DD HH:mm") + '</span>';
                    _html += '</span>';
                    _html += '</li>';
                    html.push(_html);
                });
                $(context).prev("ul").html(html);
            }
        }

        query();
    };

    /**
     * 课程列表分页
     * @param context
     */
    Model.prototype.classPage = function (context) {
        var that = this;
        var _num = 0;//首次加载
        var pageSize = 10;

        function query(page) {
            var id = $(context).data("id");
            var options = {
                ajax: "class",
                typeid: id,
                subcategory: 1,
                page: !!page ? page : 1,
                pagesize: pageSize
            };
            that.ajax(options, function (data) {
                changeContent(data);
                if (_num == 0) {
                    $(context).Paging({
                        pagesize: pageSize,
                        count: data.total,
                        callback: function (page) {
                            query(page, pageSize);
                        }
                    });
                }
                _num++;
            });
        }

        function changeContent(data) {
            $(".course-list .tab>tbody").html("");
            if (data.statu == 1) {
                var html = [];
                $.each(data.list, function (index, item) {
                    var _html = "";
                    _html += "<tr>";
                    _html += "<td>" + item.place + "</td>";
                    _html += "<td>" + item.class + "</td>";
                    _html += "<td>" + item.subject + "</td>";
                    _html += "<td>" + item.classtime + "</td>";
                    _html += "<td>" + item.period + "</td>";
                    _html += "<td>" + item.tuition + "</td>";
                    _html += "<td>";
                    _html += "<a href='" + item.arcurl + "' class='btn btn-orange'>立即报名</a>";
                    _html += "</td>";
                    _html += " </tr>";
                    html.push(_html);
                });
                $(".course-list .tab>tbody").html(html);
            }
        }

        query();
    };


    return new Model();
})();




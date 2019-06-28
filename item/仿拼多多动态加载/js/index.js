(function ($) {


    //调用点击出现
    $('.menu').on('dropdown-show', function(e) {
        loadOnce($(this), buildMenuItem);
    })
    .dropdown({
            css3: true,
            js: false    
    });

    function buildMenuItem($elem, data) {
        var html = "";
        if (data.length === 0) return;
        for (var i = 0; i < data.length; i++) {
            html += '<li><a href="' + data[i].url + '" target="_blank" class="menu-item">' + data[i].name + '</a></li>'
        }
        $elem.find('.dropdown-layer').html(html);

    }

    /*header-search*/
        var $headerSearch = $('#header-search');
        var html = '',
            maxNum = 6;

            $headerSearch.on('search-getData',function(e,data){
                var $this = $(this);
                html = creatrHeaderSearchLayer(data,maxNum);
                $this.search('appendLayer',html);

                if(html){
                    $this.search('showLayer');
                } else {
                    $this.search('hideLayer');
                }

            }).on('search-noData',function(e){
                $(this).search('hideLayer').search('appendLayer','');
            }).on('click','.search-layer-item',function(){//事件代理（可以冒泡才能使用）
                    $headerSearch.search('setInputVal',$(this).html());
                    $headerSearch.search('submit');//表单提交
            });
            
            $headerSearch.search({
                autocomplete: true,
                css3: false,
                js: false,
                animation: 'fade',
                getDataInterval:200
            });

            function creatrHeaderSearchLayer(data,maxNum){
                var html = '',
                    dataNum = data['result'].length;
                if(dataNum === 0){
                    return '';
                }

                for(var i=0; i<dataNum; i++){
                    if(i >= maxNum)break;
                    html +='<li class="search-layer-item text-ellipsis">'+data['result'][i][0]+'</li>'
                }
                return html;
            }

    /*focus-category*/
    $('#focus-category').find('.dropdown')
        .on('dropdown-show', function () {
            loadOnce($(this), createCategoryDetails);
        })
        .dropdown({
            css3: false,
            js: false
        });

    function createCategoryDetails($elem, data) {
        var html = '';

        for (var i = 0; i < data.length; i++) {            
            
            html += '<dl class="category-details cf"><dt class="category-details-title fl"><a href="###" target="_blank" class="category-details-title-link">' + data[i].title + '</a></dt><dd class="category-details-item fl">';

            for (var j = 0; j < data[i].items.length; j++) {
                
                html += '<a href="###" target="_blank" class="link">' + data[i].items[j] + '</a>';
            }

            html += '</dd></dl>';
        }
        // setTimeout(function () {
            $elem.find('.dropdown-layer').html(html);
        // },1000);
        
    };

//公用加载一次
    function loadOnce($elem, success) {
                var dataLoad = $elem.data('load');

                if (!dataLoad) return;

                if (!$elem.data('loaded')) {

                    $elem.data('loaded', true);

                    $.getJSON(dataLoad).done(function(data) {
                        if (typeof success === 'function') success($elem, data);
                    }).fail(function() {
                        $elem.data('loaded', false);
                    });
                }
            }


// imgLoader
    var imgLoader = {};
    imgLoader.loadImg = function(url, imgLoaded, imgFailed) {
        var image = new Image();
        image.onerror = function() {
            if (typeof imgFailed === 'function') imgFailed(url);
        }
        image.onload = function() {
            if (typeof imgLoaded === 'function') imgLoaded(url);
        };
        // image.src=url;     
        setTimeout(function() {
            image.src = url;
        }, 1000);
    };

    imgLoader.loadImgs = function($imgs, success, fail) {
        // var $imgs=$(elelm).find('.floor-img');          
        
        $imgs.each(function(_, el) { // _ 相当占位，不使用该参数。
            var $img = $(el);
            imgLoader.loadImg($img.data('src'), function(url) {
                $img.attr('src', url);
                success();
            }, function(url) {
                console.log('从' + url + '加载图片失败');
                // 多加载一次
                // 显示备用图片
                // $img.attr('src', 'img/floor/placeholder.png');
                fail($img, url);
            });
        });
    }

//lazyLoad

    var lazyLoad = {};

    lazyLoad.loadUntil = function(options) {

        var items = {},
            loadedItemNum = 0,
            // totalItemNum = $floor.length,
            loadItemFn = null,
            $elem = options.$container,
            id = options.id
        // 什么时候开始加载
        $elem.on(options.triggerEvent, loadItemFn = function(e, index, elem) {
            // console.log(1);
            if (items[index] !== 'loaded') {
                $elem.trigger(id + '-loadItem', [index, elem, function() {
                    items[index] = 'loaded';
                    // console.log(items[index]);
                    loadedItemNum++;
                    //console.log(index + ': loaded');
                    if (loadedItemNum === options.totalItemNum) {
                        // 全部加载完毕
                        $elem.trigger(id + '-itemsLoaded');
                    }
                }]);
            }
        });


        //加载完毕
        $elem.on(id + '-itemsLoaded', function(e) {
            //console.log(id + '-itemsLoaded');
            // 清除事件
            $elem.off(options.triggerEvent, loadItemFn);
            // $win.off('scroll resize', timeToShow);
        });

    }

    lazyLoad.isVisible = function(floorData) {
        var $win = floor.$win;
        return ($win.height() + $win.scrollTop() > floorData.offsetTop) && ($win.scrollTop() < floorData.offsetTop + floorData.height);
    }


    // foucs-slider
    var slider = {};
    slider.$focusSlider = $('#focus-slider');
    
    slider.$focusSlider.on('focus-loadItem', function(e, index, elem, success) {

        imgLoader.loadImgs($(elem).find('.slider-img'), success, function($img, url) {
            $img.attr('src', 'img/focus-slider/placeholder.png');
        });
    });

    lazyLoad.loadUntil({
        $container: slider.$focusSlider,
        totalItemNum: slider.$focusSlider.find('.slider-img').length,
        triggerEvent: 'slider-show',
        id: 'focus'
    });

    slider.$focusSlider.slider({
        css3: true,
        js: false,
        animation: 'fade', // fade  slide
        activeIndex: 0,
        interval: 1000
    });


    //floor
    var floor = {};
    floor.$floor = $('.floor');


    floor.floorData = [{
        num: '1',
        text: '米面油粮',
        tabs: ['综合', '干果', '米面油粮'],
        offsetTop: floor.$floor.eq(0).offset().top,
        height: floor.$floor.eq(0).height(),
        items: [
            [{
                name: '剑南春 水晶剑 52度 整箱装白酒 500ml*6瓶 口感浓香型',
                price: 479
            }, {
                name: '金纺 衣物护理剂 怡神薰衣草 2.5L+2.5L(柔顺剂)(与洗衣液搭配使用)',
                price: 335
            }, {
                name: '百草味 坚果零食干果 每日坚果 奶油味夏威夷果200g/袋(内含开果器)',
                price: 159
            }, {
                name: '优选100 有机速冻鲜食黄糯玉米 6支 240/支 年货礼盒',
                price: 65
            }, {
                name: '三只松鼠每日将年货节礼盒零食坚果年货大礼包孕妇零食小吃榛子巴旦木仁开心果混合果仁30袋装750g/盒',
                price: 4999
            }, {
                name: '农夫山泉 17.5°橙 3kg装 铂金果年货礼盒 新鲜水果',
                price: 289
            }, {
                name: '八马茶业 茶叶 云南普洱茶熟茶茶饼黑茶自饮简易装357g',
                price: 369
            }, {
                name: '胡姬花 食用油 压榨 特香型花生油6.18L(定制装)',
                price: 399
            }, {
                name: '澳洲进口 德运(Devondale)脱脂成人奶粉 原装进口奶粉 1kg/袋',
                price: 689
            }, {
                name: '福临门 秦玉香 一口茉莉香米 进口原粮 大米 中粮出品 5kg(包装更新，新老包装随机发放)',
                price: 269
            }, {
                name: '【送四只】阳澄福记 大闸蟹全母蟹2.6-2.3两/只 6只装生鲜鲜活现货湖蟹螃蟹',
                price: 99
            }],
            [{
                name: '百草味 坚果零食干果 每日坚果 奶油味夏威夷果200g/袋(内含开果器)',
                price: 159
            }, {
                name: '三只松鼠每日将年货节礼盒零食坚果年货大礼包孕妇零食小吃榛子巴旦木仁开心果混合果仁30袋装750g',
                price: 4999
            }],
            [{
                name: '胡姬花 食用油 压榨 特香型花生油6.18L(定制装)',
                price: 399
            }, {
                name: '福临门 秦玉香 一口茉莉香米 进口原粮 大米 中粮出品 5kg(包装更新，新老包装随机发放)',
                price: 269
            }]
        ]
    }, {
        num: '2',
        text: '个护美妆',
        tabs: ['综合', '粉底液', '面膜'],
        offsetTop: floor.$floor.eq(1).offset().top,
        height: floor.$floor.eq(1).height(),
        items: [
            [{
                name: '【大容量300ml限量抢】滋润修护芦荟胶(补水保湿晒后修护 祛痘印收缩毛孔)',
                price: 169
            }, {
                name: '美宝莲 MAYBELLINE 超然无暇二合一提亮轻垫霜 03自然色(1+1气垫 巨遮瑕轻薄裸妆滋润保湿隔离)+替换装',
                price: 198
            }, {
                name: '阿玛尼 ARMANI 持色凝彩哑光染唇液506 3.9ml (小胖丁 口红 轻薄 持久)',
                price: 79.9
            }, {
                name: '美宝莲 MAYBELLINE定制柔雾粉底液125 30ml(fit me 粉底液 遮瑕轻薄哑光空有持久隐形毛孔)',
                price: 228
            }, {
                name: '欧莱雅(LOREAL)男士补水保湿护肤套装(洁面膏100ml+水凝露120ml+强润霜50ml+洁面+滋润乳)',
                price: 119
            }, {
                name: '泰国进口 妆蕾RAY 金色蚕丝面膜10片/盒 提亮修护 抗皱紧致 轻透祛痘 品牌直供',
                price: 39
            }, {
                name: '美宝莲 MAYBELLINE 超然无暇二合一提亮轻垫霜 01亮肤色(1+1气垫 巨遮瑕轻薄裸妆滋润保湿隔离)+替换装',
                price: 299
            }, {
                name: '欧莱雅集团 小盒补水保湿护肤品套装礼盒',
                price: 257
            }, {
                name: '美迪惠尔 水润保湿面膜10片',
                price: 199
            }, {
                name: '珀莱雅 靓白肌密美白保湿五件套',
                price: 36
            }, {
                name: '欧莱雅 清润葡萄籽补水化妆品礼盒',
                price: 139
            }, {
                name: 'MG面膜 补水祛痘20片',
                price: 99
            }],
            [{
                name: '美宝莲 MAYBELLINE 超然无暇二合一提亮轻垫霜 03自然色(1+1气垫 巨遮瑕轻薄裸妆滋润保湿隔离)+替换装',
                price: 198
            }, {
                name: '美宝莲 MAYBELLINE定制柔雾粉底液125 30ml(fit me 粉底液 遮瑕轻薄哑光空有持久隐形毛孔)',
                price: 228
            }, {
                name: '美宝莲 MAYBELLINE 超然无暇二合一提亮轻垫霜 01亮肤色(1+1气垫 巨遮瑕轻薄裸妆滋润保湿隔离)+替换装',
                price: 299
            }],
            [{
                name: '【大容量300ml限量抢】滋润修护芦荟胶(补水保湿晒后修护 祛痘印收缩毛孔)',
                price: 169
            }, {
                name: '泰国进口 妆蕾RAY 金色蚕丝面膜10片/盒 提亮修护 抗皱紧致 轻透祛痘 品牌直供',
                price: 39
            }, {
                name: 'MG面膜 补水祛痘20片',
                price: 99
            }, {
                name: '美迪惠尔 水润保湿面膜10片',
                price: 199
            }]
        ]
    }];



    floor.buildFloor = function(floorData) {
        var html = '';

        html += '<div class="container">';
        html += floor.buildFloorHead(floorData);
        html += floor.buildFloorBody(floorData);
        html += '</div>';

        return html;
    };

    floor.buildFloorHead = function(floorData) {
        var html = '';
        html += '<div class="floor-head">';
        html += '<h2 class="floor-title fl"><span class="floor-title-num">' + floorData.num + 'F</span><span class="floor-title-text">' + floorData.text + '</span></h2>';
        html += '<ul class="tab-item-wrap fr">';
        for (var i = 0; i < floorData.tabs.length; i++) {
            html += '<li class="fl"><a href="javascript:;" class="tab-item">' + floorData.tabs[i] + '</a></li>';
            if (i !== floorData.tabs.length - 1) {
                html += '<li class="floor-divider fl text-hidden">分隔线</li>';
            }
        }
        html += '</ul>';
        html += '</div>';
        return html;
    };

    floor.buildFloorBody = function(floorData) {
        var html = '';
        html += '<div class="floor-body">';
        for (var i = 0; i < floorData.items.length; i++) {
            html += '<ul class="tab-panel">';
            for (var j = 0; j < floorData.items[i].length; j++) {
                html += '<li class="floor-item fl">';
                html += '<p class="floor-item-pic"><a href="###" target="_blank"><img src="img/floor/loading.gif" class="floor-img" data-src="img/floor/' + floorData.num + '/' + (i + 1) + '/' + (j + 1) + '.jpg" alt="" /></a></p>';
                html += '<p class="floor-item-name"><a href="###" target="_blank" class="link">' + floorData.items[i][j].name + '</a></p>';
                html += '<p class="floor-item-price">' + floorData.items[i][j].price + '</p>';
                html += '</li>';
            }

            html += '</ul>';
        }

        html += '</div>';

        return html;
    };

    floor.$win = $(window);
    floor.$doc = $(document);

    

    floor.timeToShow = function() {
        floor.$floor.each(function(index, elem) {
            //console.log('time to show');
            if (lazyLoad.isVisible(floor.floorData[index])) {
                // console.log('the'+(index+1)+'floor is visible');
                floor.$doc.trigger('floor-show', [index, elem]);
            }
        });
    }

    floor.$win.on('scroll resize', floor.showFloor=function () {
        clearTimeout(floor.floorTimer);
        floor.floorTimer=setTimeout(floor.timeToShow,250);
    });

    floor.$floor.on('floor-loadItem', function(e, index, elem, success) {

        imgLoader.loadImgs($(elem).find('.floor-img'), success, function($img, url) {
            $img.attr('src', 'img/floor.placeholder.png');
        });
    });

    floor.$doc.on('floors-loadItem', function(e, index, elem, success) {

        var html = floor.buildFloor(floor.floorData[index]),
            $elem = $(elem);
        success();
        setTimeout(function() {
            $elem.html(html);
            lazyLoad.loadUntil({
                $container: $elem,
                totalItemNum: $elem.find('.floor-img').length,
                triggerEvent: 'tab-show',
                id: 'floor'
            });
            $elem.tab({
                event: 'mouseenter', // mouseenter或click
                css3: false,
                js: false,
                animation: 'fade',
                activeIndex: 0,
                interval: 0,
                delay: 0
            });

        }, 1000);
    });

    floor.$doc.on('floors-itemsLoaded', function() {
        floor.$win.off('scroll resize', floor.showFloor);
    });

    lazyLoad.loadUntil({
        $container: floor.$doc,
        totalItemNum: floor.$floor.length,
        triggerEvent: 'floor-show',
        id: 'floors'
    });

    floor.timeToShow();

    /*侧边栏回到顶部*/
    $('#backToTop').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        });
    });


    /*友情链接按需加载*/
    
    var $win = $(window);
    var $doc = $(document);
 
    function rules() {
        return ($win.height() + $win.scrollTop() == $doc.height());
    }

    function ShowTime($elem, name) {
        $elem.each(function(index, elem){
                if (rules) {
                    $doc.trigger(name + '-show', [index, elem]);
                }
            }
        );
    };
 
    function build(Data, callback) {
        // 方法中定义的变量，在回调函数callback中是拿不到的，这个函数是传入的
        // var html = '';
        return callback();
        // return html;
    };
 
    function LoadIt($elem, Data, name) {
        var items = {},
            loadedItemNum = 0,
            totalItemNum = Data.length,
            loadItemFn = null;
        //判断加载
        $doc.on(name + '-show', loadItemFn = function(e, index, elem) {
            if (items[index] !== 'loaded') {
                $doc.trigger(name + '-loadItem', [index, elem]);
            }
        });
        //开始加载
        $doc.on('FK-loadItem', function(e, index, elem) {
            // 在这调用build方法没有传入回调函数会报错，可以将回调函数分离
            var html = build(Data, FKcallback),
                $elem = $(elem);
 
            items[index] = 'loaded';
            loadedItemNum++;
            if (loadedItemNum === totalItemNum) {
                // 全部加载完毕
                $doc.trigger(name + '-itemsLoaded');
            }
            setTimeout(function() {
                $elem.html(html);
            }, 1000);
 
        });
        $doc.on('FT-loadItem', function(e, index, elem) {
            // 在这调用build方法没有传入回调函数会报错，可以将回调函数分离
            var html = build(FKData, FTcallback),
                $elem = $(elem);
 
            items[index] = 'loaded';
            loadedItemNum++;
            if (loadedItemNum === totalItemNum) {
                // 全部加载完毕
                $doc.trigger(name + '-itemsLoaded');
            }
            setTimeout(function() {
                $elem.html(html);
            }, 1000);
 
        });
        $doc.on(name + '-itemsLoaded', function(e) {
            //console.log(name + '-itemsLoaded');
            /*console.log(FKData.length);
            console.log(FKData[0].text);*/
 
            // 清除事件
            $doc.off(name + '-show', loadItemFn);
            $win.off('scroll resize', ShowTime);
        });
    };
 
    $win.on('scroll resize', ShowTime);

    /*友情链接区*/
 
    var FKData = [{
        text: '消费者保障',
        items: [
            [{
                name: '保障范围'
            }, {
                name: '退货流程'
            }, {
                name: '服务中心'
            }, {
                name: '更多特色服务'
            }]
        ]
        }, {
        text: '新手上路',
        items: [
            [{
                name: '新手专区',
            }, {
                name: '消费警示',
            }, {
                name: '交易安全',
            }, {
                name: '24小时在线帮助',
            }, {
                name: '免费开店',
            }]
        ]
        }, {
        text: '付款方式',
        items: [
            [{
                name: '快捷支付',
            }, {
                name: '信用卡',
            }, {
                name: '余额包',
            }, {
                name: '蜜蜂花啊',
            }, {
                name: '货到付款',
            }]
        ]
        }, {
        text: '幕多多特色',
        items: [
            [{
                name: '手机幕多多',
            }, {
                name: '幕多多信',
            }, {
                name: '大众审评',
            }, {
                name: 'B格指南',
            }]
        ]
    }]
 
    var $FK = $('.friendLink');
 
    function FKcallback() {
        var html = '';
        html += '<div class="container">';
        for (var i = 0; i < FKData.length; i++) {
 
            html += '<div class="friendLink-item fl">';
            html += '<p>' + FKData[i].text + '</p>';
            for (var j = 0; j < FKData[i].items[0].length; j++) {
                html += '<a href="javascript:;">' + FKData[i].items[0][j].name + '</a>';
            }
            html += '</div>';
 
        }
        html += '</div>';
        // 添加将html返回
        return html;
    }
    // build(FKData, callback)
 
    // 字符串要添加引号,否则就是未定义的变量会报错
    LoadIt($FK, FKData, 'FK');
    ShowTime($FK, 'FK');

    /*footer*/
 
    var FTData = [{
        items: [
            [{
                name: '关于幕多多'
            }, {
                name: '合作伙伴'
            }, {
                name: '营销中心'
            }, {
                name: '联系客服'
            }, {
                name: '廉政举报'
            }, {
                name: '开放平台'
            }, {
                name: '诚征英才'
            }, {
                name: '联系我们'
            }, {
                name: '网站地图'
            }, {
                name: '法律声明'
            }, {
                name: '知识产权'
            }, {
                name: '&copy; 2016 imooc All Rights Reserved'
            }]
        ]
    }]
 
    var $FT = $('.footer');
 
    function FTcallback() {
        var html = '';
        html += '<div class="container">';
        for (var i = 0; i < FTData[0].items[0].length; i++) {
            html += '<a href="javascript:;">' + FTData[0].items[0][i].name + '</a>';
        }
        html += '</div>';
        return html;
    }
    // build(FTData, callback1)
    LoadIt($FT, FTData, 'FT');
    ShowTime($FT, 'FT');

})(jQuery);
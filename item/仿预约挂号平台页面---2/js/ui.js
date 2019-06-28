//医院搜索定义
$.fn.UIsearch = function(){
	var ui = $(this);
	$('.ui-search-name',ui).on('click',function(){
		$('.ui-search-order').show();
		return false;
	})
	$('.ui-search-order a',ui).on('click',function(){
		$('.ui-search-name').text( $(this).text() );
		$('.ui-search-order').hide();
		return false;
	})
	$('body').on('click',function(){
		$('.ui-search-order').hide();
	})
}
//预约挂号选项卡
$.fn.whichNav = function(){
	var ui = $(this);
	    
	$('.main-nav a').on('click',function(){
  			var index = $(this).index();
  			$('.main-nav a').removeClass('click-style');
  			$('.main-nav a').eq(index).addClass('click-style');
  			$('.ui-main-show').css('display','none');
  			$('.ui-main-show').eq(index).css('display','block');
  			/*console.log($('.ui-main-show').eq(index))*/
	})
}
//转跳网页
$.fn.jumpWindow = function(){
	var ui = $(this);

	ui.on('click',function(){
		window.location.href = "index_2.html";
	})
}
$.fn.jumpWindow_2 = function(){
	var ui = $(this);

	ui.on('click',function(){
		window.location.href = "index.html";
	})
}
//启动
$(function(){
	$('.search').UIsearch();
	$('.main').whichNav();
	$('.main-order-left-main tr td').jumpWindow();
	$('.setClass a:first').jumpWindow_2();
})
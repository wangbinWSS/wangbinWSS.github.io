//分页星期时间
$.fn.findTime = function(){
		function weekday(num){
			var date = new Date();
			date.setDate(date.getDate()+num);
			var weekNum = date.getDay();
			var today = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
			var weekT = today[weekNum];
			return weekT;
		}
		function year_Month(num){
			var date = new Date();
			date.setDate(date.getDate()+num);
			var year = date.getFullYear(),
			    month = date.getMonth()+1,
			    day = date.getDate();
			    return year+'年'+month+'月'+day+'日';
		}
		var ui = $(this);
		var join = $('.setClass-week-time td b',ui);
		var join_2 = $('.setClass-week-time td span',ui);
		var sum = 7*7;
		for(var i=0; i<sum; i++){
			var num = weekday(i);
			var num_2 = year_Month(i);
			join[i].append(num);
			join_2[i].append(num_2);
		}
}
//左右滑动
$.fn.clickSlide = function(){
	var ui = $(this);
	var left = $('.clickLeft',ui),
		right = $('.clickRight',ui),
		table = $('.setClass-week'),
		width = $('.setClass-week-time').width()/7;
		var index = 0;

	left.on('click',function(){
		index--;
		if(index<0){
			index=0;
		}
		table.css('left', index*width*-1);
		return false;
	});
	right.on('click',function(){
	  index++;
	  if(index > 6){
	  	index = 6;
	  };
	  table.css('left', index*width*-1);
	  	return false;
	});
}


//启动
$(function(){
	$('.setClass').clickSlide();
	$('.setClass-week').findTime();
})
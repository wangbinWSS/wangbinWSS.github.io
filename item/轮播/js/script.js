function findId(id){
	return typeof(id) === "string"?document.getElementById(id):id;
}

var index = 0,
	timer = null,
	pics = findId("banner").getElementsByTagName("div"),
	btn = findId("btn").getElementsByTagName("a"),
	cover = document.querySelectorAll('.cover'),
	len = pics.length;

//图片自动轮播
function startAutoPlay(){
	timer = setInterval(function(){
		index++;
		if(index>=len){
			index = 0;
		}
		changeImg();
	},2500);
}

//改变图片
function changeImg(){
	setTimeout(function(){
		for(var i=0;i<len;i++){
			cover[i].style.transition = '1s';
			cover[i].style.opacity = '.6';
			cover[i].style.zIndex = '999';
			pics[i].style.transition = '1s';
			pics[i].style.opacity="0";
			pics[i].style.zIndex="1";
		}
		cover[index].style.transition = '1s';
		cover[index].style.opacity = '0';
		cover[index].style.zIndex = '-999';
		pics[index].style.transition = '1s';
		pics[index].style.opacity="1";
		pics[index].style.zIndex="999";
	},100)
	
}
//停止轮播
function stopAutoPlay(){
	if(timer){
		clearInterval(timer);
	}
}

//鼠标滑过隐藏遮罩
function hideCover(){
	for(var k=0;k<len;k++){

		cover[k].onmouseover = function(){
			this.style.transition = '.01s';
			this.style.opacity = '0';
			this.style.zIndex = '-999';
		};
		cover[k].onmouseout = function(){
			cover[index].style.transition = '.01s';
			cover[index].style.opacity = '.6';
			cover[index].style.zIndex = '999';
		};
	}
}

function slideImg(){
	var btn_wrap= findId("btn");
	//鼠标离开开始
	btn_wrap.onmouseout = function(){
		startAutoPlay();
	}
	btn_wrap.onmouseout();
	
	//鼠标滑过停止
	btn_wrap.onmouseover = function(){
		stopAutoPlay();
	}
	
	//点击按钮改变图片
	for(var j=0;j<len;j++){
		btn[j].id=j;
		btn[j].onmouseover = function(){
			index=this.id;
			changeImg();
		}
	}
	hideCover();
}
slideImg();


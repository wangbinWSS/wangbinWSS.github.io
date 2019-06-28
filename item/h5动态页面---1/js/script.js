	//	获取元素
	var getElem = function( selector ){
	  return document.querySelector(selector);
	}
	var getAllElem = function( selector ){
	  return document.querySelectorAll(selector);
	}
	//	获取元素样式
	var getCls = function ( element ) {
	  return element.getAttribute('class');
	}
	// 设置元素的样式
	var setCls = function( element ,cls){
	  return element.setAttribute('class',cls);
	}
	// 为元素添加样式
	var addCls = function( element , cls ){
	  var baseCls  = getCls(element);
	  if( baseCls.indexOf(cls) === -1){  //没有这个Class才加 不造成重复
	      setCls(element,baseCls+' '+cls);
	  }
	  return ;
	}
	// 为元素删减样式
	var delCls = function( element , cls){
	  var baseCls  = getCls(element);
	  if( baseCls.indexOf(cls) > -1){ // 更精确的需要用正则表达式 ,因为这里只用于切换 _animate_in 所以没事
	      setCls( element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
	  }
	  return ;
	}

	var screenAnimateElements = {

	  '.header' : [
	    '.header__wrap',
	  ],
	  '.screen-1' : [
	    '.screen-1__heading',
	    '.screen-1__heading_item',
	  ],
	  '.screen-2' : [
	    '.screen-2__heading',
	    '.screen-2__heading_item',
	    '.screen-2__img_2',
	    '.screen-2__img_3',
	  ],
	  '.screen-3' : [
	    '.screen-3__img_1',
	    '.screen-3__wrap_heading',
	    '.screen-3__wrap_heading_item',
	    '.screen-3__wrap_course-1',
	    '.screen-3__wrap_course-2',
	    '.screen-3__wrap_course-3',
	    '.screen-3__wrap_course-4',
	    '.screen-3__wrap_course-5',
	  ],
	  '.screen-4' : [
	    '.screen-4__heading',
	    '.screen-4__wrap_img-1',
	    '.screen-4__wrap_img-2',
	    '.screen-4__wrap_img-3',
	    '.screen-4__wrap_img-4',
	 	'.screen-4__heading_item',
	  ],
	    '.screen-5' : [
	    '.screen-5__img',
	    '.screen-5__heading',
	    '.screen-5__heading_item'
	  ]

	};

	//加上init函数
	function setScreenAnimateInit(screenCls) {
	    var screen = document.querySelector(screenCls); // 获取当前屏的元素
	    var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
	    for(var i=0;i<animateElements.length;i++){
	        var element = document.querySelector(animateElements[i]);
	        var baseCls = element.getAttribute('class');
	        element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
	    }
	}

	// 一：初始化设置
	window.onload = function () {

	  //  为所有元素设置 init
	  for(k in screenAnimateElements){
	    setScreenAnimateInit(k);
	  }
	}

	// 二：滚到哪播哪
	//播放函数设置成done
	function playScreenAnimateDone(screenCls){
	    var screen = document.querySelector(screenCls); // 获取当前屏的元素
	    var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
	    for(var i=0;i<animateElements.length;i++){
	        var element = document.querySelector(animateElements[i]);
	        var baseCls = element.getAttribute('class');
	        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));    
	    }
	}

	setTimeout(function(){playScreenAnimateDone('.header');},300);
	setTimeout(function(){playScreenAnimateDone('.screen-1');},200);


	window.onscroll = function () {

	  var top  = document.documentElement.scrollTop; //*document.body.scrollTop不可用
	  
	  //   2.1 导航条样式变动
	  if( top > 60 ){
	      addCls( getElem('.header'),'header__status_back' );
	  }else{
	      delCls( getElem('.header'),'header__status_back' );
	  }

	  if(top > 400 ){
	      addCls( getElem('.outline'),'outline_status_in' );
	   }else{
	       delCls( getElem('.outline'),'outline_status_in' );
	   }

	   // 2.2 滚动2~5屏变动
	  if( top > ( 640 - 100) ){
	    playScreenAnimateDone('.screen-2');
	  }
	  if( top > ( 640*2 - 100) ){
	    playScreenAnimateDone('.screen-3');
	  }
	  if( top > ( 640*3 - 100) ){
	    playScreenAnimateDone('.screen-4');
	  }
	  if( top > ( 640*4 - 100) ){
	    playScreenAnimateDone('.screen-5');
	  }
	}

	// 三. 导航点击切屏

	var headerTopNav = getElem(".header__nav").children;
	var headerRightNav = getElem(".outline").children;
	
	//3.1 点击切换函数
	var NavFindScreen = function(i , whitchNav){
		var item = whitchNav[i];
		item.onclick = function(){
			document.documentElement.scrollTop=i*640-60;
		}
	}
	
	//3.2 头部导航循环出第几个,去掉即刻学习和滑动门特效的元素所以-2
	for(var i = 0;i<headerTopNav.length-2;i++){
		NavFindScreen(i , headerTopNav);
	}
	
	//3.3 右部导航循环出第几个
	for(var i = 0;i<headerRightNav.length;i++){
		NavFindScreen(i , headerRightNav);
	}

	// 4. 滑动门
	var tip = getElem(".header__nav-tip");
	function navTip(i , whitchNav){
		whitchNav[i].onmouseover = function(){
			tip.style.left = (i*90) + 'px';
		}
		whitchNav[i].onmouseout = function(){
			tip.style.left = 0;
		}
	}

	for(var i = 0;i<headerTopNav.length-2;i++){
		navTip(i , headerTopNav);
	}
	


	

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

function setScreenAnimate(screenCls) {

  var screen = document.querySelector(screenCls); // 获取当前屏的元素
  var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素

  var isSetAnimateClass = false; // 是否有初始化子元素的样式

  var isAnimateDone = false; // 当前屏幕下所有子元素的状态是DONE？

  screen.onclick = function(){

    //  初始化样式，增加init A A_init
    if( isSetAnimateClass === false){
        for(var i=0;i<animateElements.length;i++){
            var element = document.querySelector(animateElements[i]);
            var baseCls = element.getAttribute('class');
            element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
        }
        isSetAnimateClass = true;
        return ;
    }
    //  切换所有 animateElements 的  init -> done   A A_done
    if(isAnimateDone === false){
      for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
      }
      isAnimateDone = true;
      return ;
    }
    //  切换所有 animateElements 的  done -> init   A A_init
    if(isAnimateDone === true){
      for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_done','_animate_init'));
      }
      isAnimateDone = false;
      return ;
    }

  }


}

for(k in screenAnimateElements){
  setScreenAnimate(k);
}
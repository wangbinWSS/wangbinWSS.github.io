(function(window,document){
    
    const methods = {//方法
        $(selector, root = document) {
          return root.querySelector(selector);
        },
        $$(selector, root = document) {
          return root.querySelectorAll(selector);
        }
    };

    let Active = function(options){

       this._init();    //初始化
       this._loading(options);  //加载页面

    };

    Active.prototype._init = function(){
       
        this.wrap = document.createElement('div'); //外部容器
        this.itemContent = [];  //存放item内容
        this.load_text = false; //判断内容是否加载完毕

    };

    Active.prototype._loading = function(o){
            
        if(this.load_text == false){
            this._innerHTML(o);
            this.load_text = true;
        }

        if(this.load_text == true){
            this._headImgs(o); //鼠标移入图片变化
        }
     }
    //填充内容
    Active.prototype._innerHTML = function(o){
        this.wrap.className = 'wrap';
        
        o.data.forEach((i)=>{
            this.itemContent.push(`<a class="item" href="${i.href}" target="_blank">${i.text}</a>`);
        });

        this.wrap.innerHTML = `
            <div class="my">
                <div class="img"></div>
                <div class="name">
                    <p>Wss的主页</p>
                    <p>姓名：${o.personal.name}<br/><br/>年龄：${o.personal.age}岁<br/><br/>手机：${o.personal.phone}<br/><br/>邮箱: ${o.personal.email}<br/><br/>人生格言：${o.personal.motto}</p>
                </div>
            </div>
            <div class="item-wrap"></div> `;
        document.body.append(this.wrap)

        this.rightWrap = methods.$('.item-wrap');   //右边框容器
        this.img = methods.$('.img');   //头像容器

        this.rightWrap.innerHTML = this.itemContent.join('');

        this._startActive(this.wrap);
    }

    //页面加载动画
    Active.prototype._startActive = function(){

        const leftWrap = methods.$('.my'); //左边框容器
        const leftWrap_text = methods.$('.my .name');  //左边框文字

        setTimeout(()=>{
            leftWrap.style.transition = '.5s';
            leftWrap.style.left  = '0px'
        },0);

        setTimeout(()=>{
            this.img.style.transition = '.5s';
            this.img.style.top = '44px';
            leftWrap_text.style.transition = '.5s';
            leftWrap_text.style.top = '279px';
        },500);

        //右边内容显示动画
        setTimeout(()=>{
            this.rightWrap.style.transition = '.5s';
            this.rightWrap.style.left  = '37%';
            this._itemActive();
        },0);
     }

    //右边项目移入移出动画
    Active.prototype._itemActive = function(){
        const item = methods.$$('.item');
        
        item.forEach((i)=>{
            i.onmouseover = ()=>{
                setTimeout(()=>{
                    i.style.transition = '.2s';
                    i.style.backgroundColor = '#006633';
                    i.style.border = '1px solid #006633';
                    i.style.fontSize = '16px';
                    i.style.color = '#8CC7B5';
                },0)
            };

            i.onmouseout = ()=>{
                setTimeout(()=>{
                    i.style.transition = '.1s';
                    i.style.backgroundColor = '#3D9970';
                    i.style.border = '1px solid #3D9970';
                    i.style.fontSize = '14px';
                    i.style.color = 'white';
                    
                },0)
            }
        })
    }

    //头像填充
    Active.prototype._headImgs = function(o){

        const firstImg = o.firstImg;
        const secondImg = o.secondImg;
        this.img.style.backgroundImage = `url(./img/${firstImg})`;

        this._ImgChange(firstImg,secondImg);
    }

    //鼠标移入移出头像变行
    Active.prototype._ImgChange = function(firstImg,secondImg){
        
        this.img.onmouseover = ()=>{
            this.img.style.background = '61% no-repeat';
            this.img.style.backgroundImage = `url(./img/${secondImg})`;
            this.img.style.backgroundSize = '300px 200px';
        }
        
        this.img.onmouseout = ()=>{
            this.img.style.background = '87% no-repeat';
            this.img.style.backgroundImage = `url(./img/${firstImg})`;
            this.img.style.backgroundSize = '400px 200px';
        }
    }


    window.$Active = Active;

})(window,document)
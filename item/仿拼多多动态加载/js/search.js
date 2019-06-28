(function($){

	//缓存
	var cache = {
		data:{},
		count:0,
		addData : function(key,data){
			if(!this.data[key]){
				this.data[key] = data;
				this.count++;
			}
		},
		readData: function(key){
			return this.data[key];
		},
		deleteDataByKey: function(key){
			delete this.data[key];
			this.count--;
		},
		deleteDataByOrder:function(){
			var count = 0;
			for (var p in this.data) {
				if(count >= num){
					break;
				}
				count++;
				this.deleteDataByKey(p);
			}
		}
	};



	function Search($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$input = this.$elem.find('.search-inputbox');
		this.$form = this.$elem.find('.search-form');
		this.$layer = this.$elem.find('.search-layer');

		this.loaded = false;

		this.$elem.on('click','.search-btn',$.proxy(this.submit,this));
		if(this.options.autocomplete){
			this.autocomplete();
		}
	};
	Search.DEFAULTS = {
		autocomplete:false,
		url:'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1556294749616_833&callback=jsonp834&k=1&area=c2c&bucketid=10&q=',
		css3:false,
		js:false,
		animation:'fade',
		getDataInterval:200
	};
	Search.prototype.submit = function(){
		if(this.getInputVal() === '' ){//$.trim去掉两边空格
			return false;
		}
		this.$form.submit();
	};
	Search.prototype.autocomplete = function(){
		var timer = null,
			self = this;

		this.$input
			.on('input',function(){
				if(self.options.getDataInterval){
					clearTimeout(timer);
					timer = setTimeout(function(){
						self.getData();
					},self.options.getDataInterval);
				} else {
					self.getData();
				}		
			})
				
			.on('focus',$.proxy(this.showLayer,this))
			.on('click',function(){
				return false;
			});
		this.$layer.showHide(this.options);
		$(document).on('click', $.proxy(this.hideLayer, this));
	};

	Search.prototype.getData = function(){
		var self = this;
		var inputVal = this.getInputVal();
		if(inputVal ==='')return self.$elem.trigger('search-noData');

		if(cache.readData(inputVal)) return self.$elem.trigger('search-getData',[cache.readData(inputVal)]);

		if(this.jqXHR) this.jqXHR.abort();
		this.jqXHR = $.ajax({
			url:this.options.url + inputVal,
			dataType:'jsonp',
		}).done(function(data){//异步调用成功时（避免回调）
			cache.addData(inputVal,data)
			self.$elem.trigger('search-getData',[data]);

		}).fail(function(){//异步调用失败时
			self.$elem.trigger('search-noData');

		}).always(function(){
			self.jqXHR = null; 
		});
	};
	Search.prototype.showLayer = function(){
		if(!this.loaded) return;
		this.$layer.showHide('show');
	};
	Search.prototype.hideLayer = function(){
		this.$layer.showHide('hide');
	};
	Search.prototype.getInputVal = function(){
		return  $.trim(this.$input.val());
	};
	Search.prototype.setInputVal = function(val){
		this.$input.val(removeHtmlTags(val))

		function removeHtmlTags(str){
			return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g,'');//去掉点击后表单内显示的HTML标签
		}

	};
	Search.prototype.appendLayer = function(html){
		this.$layer.html(html);
		this.loaded = !!html;
	};
	

	    $.fn.extend({
	        search: function(option,value) {
	            return this.each(function() {
	                
	                var $this=$(this),
	                search=$this.data('search'),
	                options = $.extend({}, Search.DEFAULTS, $(this).data(), typeof option==='object'&&option);
	                // search(this, options);  
	                if(!search){//解决多次调用dropdown问题
	                    $this.data('search',search=new Search($this,options));

	                }  

	                if(typeof search[option]==='function'){
	                    search[option](value);

	                }

	            });

	        }
   		})

})(jQuery)







/*(function($){
	'use strict'

	var $search = $('.search'),
		$input = $search.find('.search-inputbox'),
		$btn = $search.find('.search-btn'),
		$form = $search.find('.search-form'),
		$layer = $search.find('.search-layer');

	//验证空格不提交

	//$btn.on('click',function(){//鼠标提交才能触发验证

	//	if($.trim($input.val()) === '' ){//$.trim去掉两边空格
	//		return false;
	//	}
	//})
	$form.on('submit',function(){//只要提交表单就能触发验证
		if($.trim($input.val()) === '' ){//$.trim去掉两边空格
			return false;
		}
	})

	//自动完成
 	//使用input 只要内容改变就会触发 (不支持IE6 7 8，如果需要兼容就用keyup,做些处理)  
	$input.on('input',function(){
		//encodeURIComponent进行编码 防止不是UTF-8时出现乱码不能搜索
		var url = 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1556294749616_833&callback=jsonp834&k=1&area=c2c&bucketid=10&q='+encodeURIComponent($.trim($input.val()));
		$.ajax({
			url:url,
			dataType:'jsonp',
		}).done(function(data){//异步调用成功时（避免回调）
			
			var html ='',
				maxNum = 6,
				dataNum = data['result'].length;

			if(dataNum === 0){
				$layer.hide().html('');
				return;
			}

			for(var i=0; i<dataNum; i++){
				if(i >= maxNum)break;
				html +='<li class="search-layer-item text-ellipsis">'+data['result'][i][0]+'</li>'
			}

			$layer.html(html).show();//放进去显示
			//添加search-layer-item后才能绑定触发提交表单
			//$layer.find('.search-layer-item').on('click',function(){
			//	$input.val($(this).html());
			//	$input.parent('form').submit();//表单提交
			//})
			//这样太浪费性能，所以用后面的事件代理来写

		}).fail(function(){//异步调用失败时

				$layer.hide().html('');
		}).always(function(){//异步调用时

		});
	});

	$layer.on('click','.search-layer-item',function(){//事件代理（可以冒泡才能使用）
				$input.val(removeHtmlTags($(this).html()));
				$form.submit();//表单提交
			});

	$input.on('focus',function(){
		$layer.show();
	})//.on('blur',function(){//会和click事件冲突
		//$layer.hide();
	//})
	.on('click',function(){
		return false;
	});
	$(document).on('click',function(){
		$layer.hide();
	})

	function removeHtmlTags(str){
		return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g,'');//去掉点击后表单内显示的HTML标签
	}
})(jQuery)*/
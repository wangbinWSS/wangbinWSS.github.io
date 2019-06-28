
//头部导航
function headerNav(){
	var nav = document.querySelector('.top__header_nav-item'),
		nav_item = document.querySelector('.top__header_nav_outline');

		nav.onmouseover = function(){
			nav_item.style.display = 'block';
		}
		nav.onmouseout = function(){
			nav_item.style.display = 'none';
		}
		nav_item.onmouseover = function(){
			nav_item.style.display = 'block';
		}
		nav_item.onmouseout = function(){
			nav_item.style.display = 'none';
		}
}
headerNav();
//验证内容

function validationRule(){
	
	function elemId(id){
		return document.getElementById(id);
	}
	function elemAll(elem){
		return document.querySelectorAll(elem);
	}

	var userName =  elemId('userName'), 		//用户名.value
		pwd = elemId('pwd'),					//密码.value
		affirm_pwd = elemId('affirm_pwd'),		//确认密码.value
		name = elemId('name'),					//姓名.value
		documentNum = elemId('documentNum'),	//证件号码.value
		email = elemId('email'),				//邮箱.value
		phone = elemId('phone'),				//手机.value
		pwd_hint = elemId('pwd_hint'),			//密码验证条1
		pwd_hint_2 = elemId('pwd_hint_2'),		//密码验证条2
		pwd_hint_3 = elemId('pwd_hint_3'),		//密码验证条3
		hint_name = elemId('hint_name'),		//姓名填写规则
		name_tag = elemId('name_tag'),			//姓名填写规则提示牌
		hint_phone = elemId('hint_phone'),		//手机提示
		rule = elemId('rule'),					//同意协议按钮
		btn = elemId('btn');					//按钮转跳
	var hint = elemAll('.hint');				//0.用户名、1.密码、2.再次密码、3.证件号码提示 4.邮箱
	var test1 = false,
		test2 = false,
		test3 = false,
		test4 = false,
		test5 = false,
		test6 = false,
		test7 = false;
	//用户名验证
	userName.onblur = function(){
		var rag=/^\w{6,30}$/;
		if(this.value == ''){
			hint[0].innerHTML = "6-30位字母、数字或'_'，字母开头";
			hint[0].style.color = 'red';
		}else if(!rag.exec(userName.value)){
			hint[0].innerHTML = "6-30位字母、数字或'_'，字母开头";
			hint[0].style.color = 'red';
		}else{
			hint[0].innerHTML = '输入正确';
			hint[0].style.color = 'green';
			test1 = true;
		}	
	}

	//登录密码验证
	pwd.onblur = function(){
		//rag -->密码验证    
		//org -->验证条是否是橘色（有数字，字母，符号任意两个组合）  
		//grn -->验证条是否是绿色（有数字，字母，符号任意三个组合）  
		var rag = /^.{6,20}$/,
			org = /(^[A-Za-z]+\d+$)|(^\d+[A-Za-z]+$)|(^[A-Za-z]+\W+$)|(^\W+[A-Za-z]+$)|(^\d+\W+$)|(^\W+\d+$)/,
			grn = /(^\W+[A-Za-z]+\d+$)|(^\W+\d+[A-Za-z]+$)|(^[A-Za-z]+\d+\W+$)|(^[A-Za-z]+\W+\d+$)|(^\d+[A-Za-z]+\W+$)|(^\d+\W+[A-Za-z]+$)/;
		
		//密码验证
		if(this.value == ''){
			hint[1].innerHTML = "6-20位字母、数字或符号";
			hint[1].style.color = 'red';
			hint[1].style.margin = '0 0 0 82px';
		}else if(!rag.exec(pwd.value)){
			hint[1].innerHTML = "6-20位字母、数字或符号";
			hint[1].style.color = 'red';
			hint[1].style.margin = '0 0 0 82px';
		}else{
			hint[1].innerHTML = '输入正确';
			hint[1].style.color = 'green';
			hint[1].style.margin = '0 0 0 82px';
			test2 = true;
		}
		
		//验证条颜色验证
		if(test2 = true){
			if(org.exec(pwd.value)){
				pwd_hint_2.style.background = 'orange';
				pwd_hint_3.style.background = '#ededed';
			}else if(grn.exec(pwd.value)){
				pwd_hint_2.style.background = 'orange';
				pwd_hint_3.style.background = 'green';
			}else{
				pwd_hint_2.style.background = '#ededed';
				pwd_hint_3.style.background = '#ededed';
			}
		}
	}
/*console.log(hint[2])*/
	
	//确认密码
	affirm_pwd.onblur = function(){
		if(affirm_pwd.value == ''){
			hint[2].innerHTML = '输入框不能为空';
			hint[2].style.color = 'red';
		}else if(affirm_pwd.value != pwd.value){
			hint[2].innerHTML = '两次密码输入不一致，请重新输入';
			hint[2].style.color = 'red';
		}else if(affirm_pwd.value == pwd.value){
			hint[2].innerHTML = '两次密码输入一致';
			hint[2].style.color = 'green';
			test3 = true;
		}
	}

	//姓名验证
	name.onblur = function(){
		var rag=/(^[\u4e00-\u9fa5 A-Za-z]{3,30}$)|(^[A-Za-z \u4e00-\u9fa5]{3,30}$)/;
		if(!rag.exec(name.value)){
			hint_name.innerHTML = "姓名只能包含中文或者英文,且字符在3-30个之间！";
			hint_name.style.color = 'red';
			hint_name.style.textDecoration = 'none';
		}else{
			hint_name.innerHTML = '输入正确';
			hint_name.style.color = 'green';
			hint_name.style.textDecoration = 'none';
			test4 = true;
		}
	}

	//姓名填写规则提示
	hint_name.onmouseover = function(){
		if(name_tag.style.display == 'block'){
			return
		}else{
			if(hint_name.innerHTML == '姓名填写规则'){
				name_tag.style.display = 'block';
			}else{
				name_tag.style.display = 'none';
			}
		}
		
	}
	hint_name.onmouseout = function(){
		
		if(name_tag.style.display == 'none'){
			return
		}else{
			name_tag.style.display = 'none';
		}
	}

	//证件号码验证
	documentNum.onblur = function(){
		var rag=/(^\d{18}$)|(^\d{17}[Xx]{1}$)/;
		if(!rag.exec(documentNum.value)){
			hint[3].innerHTML = "请输入18位身份证号码";
			hint[3].style.color = 'red';
		}else{
			hint[3].innerHTML = '号码输入正确';
			hint[3].style.color = 'green';
			test5 = true;
		}	
	}

	//邮箱验证
	email.onblur = function(){
		var rag=/^\w+[-]*@\w+[-]*\.\w+[-]*$/;
		if(!rag.exec(email.value)){
			hint[4].innerHTML = "请输入正确的邮箱";
			hint[4].style.color = 'red';
		}else{
			hint[4].innerHTML = '邮箱格式正确';
			hint[4].style.color = 'green';
			test6 = true;
		}	
	}

	//手机号验证
	phone.onblur = function(){
		var rag=/^1[3456789]\d{9}$/;
		if(!rag.exec(phone.value)){
			hint_phone.innerHTML = "您输入的手机号码不是有效的格式！";
			hint_phone.style.color = 'red';
		}else{
			hint_phone.innerHTML = '手机格式正确';
			hint_phone.style.color = 'green';
			test7 = true;
		}	
	}

	//提交按钮转跳
	btn.onclick = function(){
		if(rule.checked == false || test1 == false || test2 == false || test3 == false || test4 == false || test5 == false
        || test6 == false || test7 == false){
			alert('信息输入不正确或您没勾选协议！');
        }else{
			window.open("https://www.imooc.com/");
        }

	}

}   

validationRule();
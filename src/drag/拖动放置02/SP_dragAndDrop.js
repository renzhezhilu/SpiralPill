


////////////////////// 拖动放置
SP_dragAndDrop(".sm_mune,.whoiam","li,p",true)


//Container多个容器 Element多个容器内可选的元素   Changethis是否可改变自己 "Elemen".on是位置的提示自定义
function SP_dragAndDrop(Container,Element,Changethis) {
	
	$(Element).css({ cursor: 'move'});
	//没有合适的容器，元素回撤
	function goBack (Ele,display){
		Ele.css({ position: 'relative', width: 'auto', height: 'auto',left:'0',top:'0',opacity:'1',zIndex:'1',display:display })
	}

	//当前指针下的元素
	var ind01=NaN,ind02=NaN;
	$(Container).mouseover( function(){
		 ind01 = $(this).index(Container)
	}).mouseout( function(){
		$(this).find(Element).removeClass('on')
	}).find(Element).mouseover( function(){		
		ind02 =  ($(this).parents(Container).find(Element)).index(this)
		console.log(ind01+"--"+ind02+"---"+Element)	
	});

	//选中元素
	(function () {
		var elementup=false 
		var x,y,x2,y2,pos,ind,w,h,left,top;

		$(Container).find(Element).mousedown(function (e) {
			elementup=true
			index01 = $(this).parents(Container).index(Container)
			index02 = ($(this).parents(Container).find(Element)).index(this)
			w = $(this).width()
			h = $(this).height()
			//hh = $(this).outerHeight()
			//pos=$(this).offset()
			//left=pos.left-$(document).scrollLeft()
			//top=pos.top-$(document).scrollTop()
			x=e.pageX-$(document).scrollLeft()
			y=e.pageY-$(document).scrollTop()
			$(this).css({  position: 'fixed',width:w,height:h,left:x,top:y,zIndex:'10',opacity:'0.4'  })

			document.onselectstart = function(){return false} //禁选文本
			//console.log(index01+"--"+index02)
			var $that = $(this)
			$(document).mousemove(function(e) {
				if (elementup) {
					x2=e.pageX-$(document).scrollLeft()
					y2=e.pageY-$(document).scrollTop()
					$(Container).eq(index01).find(Element).eq(index02).css({
						left: x2,
						top: y2
					})
					
					if (!Changethis) {
						if (ind01!==index01) {
							$(Container).eq(ind01).find(Element).eq(ind02).addClass('on')	
						}
					}
					else {
						$(Container).eq(ind01).find(Element).eq(ind02).addClass('on')	
					}
				}
				console.log("document")
			}).mouseup(function(e) {
				document.onselectstart = function(){return true} //解！
				elementup=false
				$(document).unbind()
				$(Container).find(Element).removeClass('on')
				var pos01 = $(Container).eq(index01).find(Element).eq(index02)
				var pos02 = $(Container).eq(ind01).find(Element).eq(ind02)
				function replaceEle (){
					if ($(Container).eq(ind01).find(Element).length) {
						goBack (pos01)
						pos02.after(pos01.clone(true).show(0).stop().fadeTo(300, 0.2).fadeTo(300, 1) )
						pos01.remove()
					}
					else {
						goBack (pos01)
						$(Container).eq(ind01).append(pos01.clone(true).show(0).stop().fadeTo(300, 0.2).fadeTo(300, 1))
						pos01.remove()
					}
				}
				//在不同的容器
				if (index01 !== ind01) {
					replaceEle ()
				}
				//相同的容器/可选是否自身改变
				if (Changethis) {
					if (index01==ind01) {
						goBack (pos01)
						pos02.after(pos01.clone(true).show(0).stop().fadeTo(300, 0.2).fadeTo(300, 1) )
						pos01.remove()
					}
				}
				//容器外
				else {goBack (pos01)}
				
			})
		})

	})();

	
}




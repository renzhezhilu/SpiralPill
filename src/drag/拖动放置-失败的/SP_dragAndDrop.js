


////////////////////// 拖动放置
SP_dragAndDrop(".sm_mune","li")


function SP_dragAndDrop(Container,Element) {
	//放置的位置

		var ind01=NaN,ind02=NaN;
		$(Container).mouseover( function(e){
			 ind01 = $(this).index()

			
		}).mouseout( function(e){
			$(this).find(Element).removeClass('on')

		}).find(Element).mouseover( function(e){
			ind02 =  $(this).index()
			
			
			
		})

		

	function whereOn () {
		$(Container).eq(ind01).find(Element).eq(ind02).addClass('on').siblings().removeClass('on')
	}
	function noWhereOn (){
		$(Container).find(Element).removeClass('on')

	}
	
	//Classname 容器class，元素class

	//没有合适的容器，元素回撤
	function goBack (Ele){
		Ele.css({ position: 'relative', width: 'auto', height: 'auto',left:'0',top:'0' })
	}
	//销毁
	//eleRemove(1,)
	function eleRemove (ind01,ind02){
		$(Container).eq(ind01).find(Element).eq(ind02).remove()
	}

	//新增
	//eleAddNew(1,1,"22")
	function eleAddNew (ind01,ind02,Text){
		var $whichele = $(Container).eq(ind01).find(Element)
		var tag = $(Element).prop("tagName")
		var addhtml = "<"+tag+" class='new'>"+Text+"</"+tag+">"
		
		$whichele.eq(ind02).after(addhtml)
		//console.log( addhtml )
	}
	

	//选中元素
	(function () {
		var elementup=false 
		var x,y,x2,y2,pos,ind,w,h;

		$(Container).find(Element).mousedown(function (e) {

			elementup=true
			index01 = $(this).parents(Container).index()
			index02 = $(this).index()
			w = $(this).width()
			h = $(this).height()
			$(this).css({  position: 'relative', width: w, height: h  })
			pos=$(this).offset()
			x=e.pageX
			y=e.pageY
		
			//console.log(index01+"--"+index02)
			var $that = $(this)
			$(document).mousemove(function(e) {
				if (elementup) {
					x2=e.pageX-x
					y2=e.pageY-y
					$(Container).eq(index01).find(Element).eq(index02).css({
						left: x2,
						top: y2
					})
					whereOn () 
		
				}
				console.log("document")
			}).mouseup(function(e) {
				
				elementup=false
				goBack($that)
				$(document).unbind()
			})
		})

	})();

	



	
}




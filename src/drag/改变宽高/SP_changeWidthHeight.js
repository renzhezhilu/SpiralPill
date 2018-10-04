


////////////////////// 改变宽高
function SP_changeWidthHeight(Classname,Change,direction) {
	var $_this = $(Classname)
	if ($_this.css("position")==="static") {
		$_this.css("position","relative")
	}
	$_this.css("transition","0s")


	$_this.append('<div class="SP_changebut"><span>━<br />─</span></div>')
	var $SP_changebut = $_this.find(".SP_changebut")

	//改变宽还是高
	if (Change=="w") { 
		changeWay("SP_changebut_w",Change)
		if (direction=="r") {
			changeWay("SP_changebut_w_r",Change,direction)
		}
	}
	else if (Change=="h") {
		changeWay("SP_changebut_h",Change)
		if (direction=="t") {
			changeWay("SP_changebut_h_t",Change,direction)
		}
	}
	else {
		changeWay("",Change)
		if (direction=="r_b") {
			changeWay("SP_changebut__r_b",Change,direction)
		}
	}
	function changeWay (Butcss,Wh,direction){
		$SP_changebut.addClass(Butcss)
		var elementup=false
		var x,y,x2,y2,w,h,_index,initial_w,initial_h;
		//初始宽高
		initial_w = $_this.width()
		initial_h = $_this.height()

		$SP_changebut.mousedown(function (e) {
			document.onselectstart = function(){return false} //禁选文本
			elementup=true
			$_this2 = $(this).parent()
			w = $_this2.width()
			h = $_this2.height()
			x=e.pageX
			y=e.pageY
			console.log(_index)
		}).dblclick(function() {
			$(this).parent().css({ width:initial_w,height:initial_h })
			console.log(w+"---"+h)
		});
		$(document).mousemove(function(e) {
			if (elementup) {
				x2=e.pageX-x
				y2=e.pageY-y
				if (Wh=="w") {
					$_this2.css({ width: x2+w })
					if (direction=="r") {
						x2=x-e.pageX
						$_this2.css({ width: x2+w })
					}
				}
				else if (Wh=="h") {
					$_this2.css({ height: y2+h })
					if (direction=="t") {
						y2=y-e.pageY
						$_this2.css({ height: y2+h })
					}
				}
				else {
					$_this2.css({ width: x2+w,height: y2+h })
					if (direction=="r_b") {
						x2=x-e.pageX
						$_this2.css({ width: x2+w,height: y2+h})
					}
				}
				console.log(_index)
			}
		}).mouseup(function() {
			elementup=false
			document.onselectstart = function(){return true} //解！
		});

		//表格优化
		function careTable () {
			$SP_changebut.height($(Classname).outerHeight(true))
			$SP_changebut.css({
				right: '-15px'
			});
		}
		if ($_this.eq(0)[0].tagName=="TH") {
			$SP_changebut.html("")
			setTimeout(careTable, 100)
		}
		
		
		
	}
}



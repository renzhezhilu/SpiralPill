$(document).ready(function(){

var $table =$(".SP_tableContent")
$table.find('table').addClass('true_table')
$table.find('[type=checkbox]').before("<div class=\"tbcheckbox\"></div>")
$table.prepend("<table class='false_table' style='position: absolute; z-index:10; left: 0; top: 30px'><tr>"+$table.find("tr:nth-child(1)").html()+"</tr></table>")



//分页
!function(){
	//测试函数
	var test = function (ttt){
		var date1=new Date();  //开始时间
		ttt
		var date2=new Date();    //结束时间
		var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数
		console.log(date3)
	}
	var newtest = function () {
		for (var test = 0; test < 100; test++) {

			var testcon = "<tr>\
			  <td></div><input name='checkboxbut'  type='checkbox'></td><td>"+test+"</td>\
			  <td>2018/9/22 9:56:11</td>\
			  <td>"+test*111+"</td>\
			  <td>update HRGroupMenu set ActionStr=@actionStr where RoleID=@RoleID and mIndex=@mIndex</td>\
			  <td>/SystemManage/CurrentAction.aspx</td>\
			  <td>192.168.3.12</td>\
			</tr>"
			$table.find('.true_table').append(testcon)
		}
	}
	test(newtest())
	
	var pagenum =10 //每页数量
	var pagenum_but = 10 // 按钮最多
	var pageswitch = true //是否开启分页
	var $pagetotal=$table.find(".true_table tr").not("tr:first")
	var page123 = $pagetotal / pagenum



		var pagelinum = parseInt($pagetotal.size()/pagenum)
		if ($pagetotal.size()%pagenum) {
			pagelinum+1
		}

		var pagelicon="";
		for (var p = 1; p < pagelinum+1; p++) {
			pagelicon=pagelicon+"<a page='"+p+"'>"+p+"</a>"
			// if (pagelinum==pagenum_but) {
			// 	pagelicon=pagelicon+"<a>...</a>"
			// 	break
			// }
		}
		
		var newpage123 ="\
			<div class='page123 newpage123'>\
				<div class='pagebox'>\
					<tt class='pagelist'>\
						"+pagelicon+"\
					</tt>\
					<span class='prev not'>上一页</span>\
					<span class='next yes'>下一页</span>\
				</div>\
			</div>"
		$table.append(newpage123)
		

		

		var trdisplay = function(smnum){
			$pagetotal.css('display', 'none');
			for (var t = smnum*pagenum; t < (smnum+1)*pagenum; t++) {
				$pagetotal.eq(t).css('display', 'table-row');
			}
		}
		$pagelist_a = $table.find(".newpage123").find('a')
		$pagelist_next = $table.find(".newpage123").find('.next')
		$pagelist_prev = $table.find(".newpage123").find('.prev')
		
		$pagelist_a.eq(0).addClass("on").siblings().removeClass("on")
		$pagelist_a.click(function() {
			trdisplay($(this).index())
			$(this).addClass("on").siblings().removeClass("on")
			
			console.log($(this).index())
			tableHead()
		});
		$pagelist_next.click(function() {
			var pagelist_a_index = $pagelist_a.parent().find('.on').index()
			$pagelist_a.eq(pagelist_a_index+1).addClass("on").siblings().removeClass("on")
			trdisplay(pagelist_a_index+1)
		});
		$pagelist_prev.click(function() {
			var pagelist_a_index2 = $pagelist_a.parent().find('.on').index()
			$pagelist_a.eq(pagelist_a_index2-1).addClass("on").siblings().removeClass("on")
			trdisplay(pagelist_a_index2-1)
		});


		trdisplay(0)

	$table.find('[type=checkbox]').before("<div class=\"tbcheckbox\"></div>")


}()

//表头固定
function tableHead (){
	for (var i = 0; i < $table.find(".true_table tr:first >th").size(); i++) {
		var w = $table.find(".true_table tr:first >th").eq(i).width()
		$table.find(".false_table tr:first >th").eq(i).width( w )
	}
	$table.scroll(function (){
		
		var scrollTop = $(this).scrollTop()
		$(this).find(".false_table").css("top",scrollTop+"px")
	})

	$("div").scroll(function() {
	  
	});
}
tableHead()


//复选框
!function(){
	
	var $checkbox = $table.find("[type=checkbox]")
	var $checkbox_td = $table.find("tr:not(:first)").find("[type=checkbox]").parent() //排除表头
	var $tbcheckbox = $table.find(".tbcheckbox")

	//单选
	var oneSelect = function(element){
		element.css("cursor","pointer")
		element.find(".tbcheckbox").toggleClass('on');
		if (element.find(".on").length) { 
			element.find("[type=checkbox]").prop("checked",true)
			element.parents("td").parents("tr").addClass('select')
		}
		else {
			element.find("[type=checkbox]").prop("checked",false)
			
			element.parents("td").parents("tr").removeClass('select')
		}
	}
	$checkbox_td.click(function() {  oneSelect($(this))  });
	//批量选中
	var batchSelect = function(){}
	batchSelect()
	//全选or全不选
	var allSelect = function(){
		$(this).data("num")
		if (!$(this).data("num")) {
			$checkbox.prop("checked",true)
			$tbcheckbox.addClass('on').parents("td").parents("tr").addClass('select')
			$(this).data("num",1)
		}
		else {
			$checkbox.prop("checked",false)
			$tbcheckbox.removeClass('on').parents("td").parents("tr").removeClass('select')
			$(this).data("num",0)
		}	
	}
	$checkbox_td.dblclick(function() { allSelect() });
	$table.find("th:first").click(function() { allSelect() });

	
	//反选
	// var otherSelect = function(index){
	// 	$(".PageTab li").eq(index).addClass("on").siblings().removeClass("on");
	// 	$(".PageCon iframe").eq(index).addClass("conon").siblings().removeClass("conon");
	// 	$table.find("[type=checkbox]").eq(index).prop("checked",true)
	// 	$table.find(".tbcheckbox").removeClass('on')
	// }
	//添加
}()

});
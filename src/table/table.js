

//////////表格
function tableBox (tableclass) {
    var $SPtanle = $(tableclass)
    $SPtanle.find('table').addClass('true_table')
    var $table =$SPtanle.find(".true_table")

    //表头固定
    var tableHead = function (){
        var $_checkbox_td = $table.find("tr:not(:first)").find("[type=checkbox]").parent()
        var tableHead_w = $SPtanle.find(".true_table tr:first").width()
        $SPtanle.find(".false_table").width( tableHead_w )

        for (var i = 0; i < $SPtanle.find(".true_table tr:first >th").size(); i++) {
            var w = $SPtanle.find(".true_table tr:first >th").eq(i).width()
            $SPtanle.find(".false_table tr:first >th").eq(i).width( w )
        }
    
        $SPtanle.scroll(function (){
            var _scrollTop = $(this).scrollTop()
            var _scrollLeft = $(this).scrollLeft()
            $(this).find(".false_table").css("top",_scrollTop+"px")
            $(this).find("[type=checkbox]").parent().css("transform","translateX("+_scrollLeft+"px)")
        })
    }
    
    setTimeout(tableHead, 600)
    $(window).resize(function(){
        setTimeout(tableHead, 600)
    }).resize();
    //判断复选框还是单选框
    var checkboxoradio = $SPtanle.find('.true_table th:first').find('[type=checkbox]').length
    if (checkboxoradio) {
        checkboxTable()
     
    }
    else {
        radioTable()
       
    }
    //复选框
    function checkboxTable () {
        $table.find('[type=checkbox]').before("<div class=\"tbcheckbox\"></div>")
        $SPtanle.prepend("<table class='false_table' style='position: absolute; left: 0; top: 0; z-index: 10; '><tr>"+$table.find("tr:nth-child(1)").html()+"</tr></table>")
        var $checkbox = $SPtanle.find("[type=checkbox]")
        var $checkbox_not = $table.find("tr:not(:first)").find("[type=checkbox]")
        var $checkbox_td = $table.find("tr:not(:first)").find("[type=checkbox]").parent() //排除表头
        var $tbcheckbox = $SPtanle.find(".tbcheckbox")

        $checkbox_td.css({
            cursor: 'move'
        });
        //判断是否已全选
        function isOrNotAllSelect() {
           var allyeseorno = true
           for (var i = 0; i < $checkbox_not.size(); i++) {
               if ( !($checkbox_not.eq(i).prop("checked")) ) {
                    allyeseorno = false
                    break
               } 
           }
           if (!allyeseorno) {
                $SPtanle.find("tr:lt(2)").find(".tbcheckbox").removeClass('on')
                $SPtanle.find("tr:lt(2)").find("[type=checkbox]").prop("checked",false)
                console.log("false")
           }
           else {
                $SPtanle.find("tr:lt(2)").find(".tbcheckbox").addClass('on')
                $SPtanle.find("tr:lt(2)").find("[type=checkbox]").prop("checked",true)
                console.log("true")
           }           
        }
        //判断选中多少条
        function howMuchSelect() {
            var numselect = 0
            for (var i = 0; i < $checkbox_not.size(); i++) {
                if ( ($checkbox_not.eq(i).prop("checked")) ) {
                     numselect++
                } 
            }
            return numselect
        }
        //逐个选中
        function oneSelect (Element) {
            Element.find(".tbcheckbox").toggleClass('on');
            if (Element.find(".on").length) { 
                Element.find("[type=checkbox]").prop("checked",true)
                Element.parents("tr").addClass('select')
            }
            else {
                Element.find("[type=checkbox]").prop("checked",false)
                Element.parents("tr").removeClass('select')
                
            }
            //选中数量提示
            mouseArrowTips($("body"),howMuchSelect())
            isOrNotAllSelect()
        }
        //批量选中
        function batchSelect () {
            var elementup = 0
            function itIsOn (Ele) {
                return Ele.find(".on").length
            }
            $checkbox_td.mousedown(function () {
                document.onselectstart = function(){return false} //禁选文本
                if ( !itIsOn($(this)) ) elementup = 1
                if ( itIsOn($(this) ) ) elementup = 2
            }).click(function() {  
                oneSelect($(this))  
            }).dblclick(function() { 
                allSelect() 
            })
            $checkbox_td.parent().mousemove(function() {
                switch(elementup){
                    case 1:
                        if ( !itIsOn($(this)) ) oneSelect($(this).find("[type=checkbox]").parent()) 
                        break
                    case 2:
                        if ( itIsOn($(this)) ) oneSelect($(this).find("[type=checkbox]").parent())  
                        break
                }
            }).mouseup(function() {
                elementup=0
                document.onselectstart = function(){return true} //解！
                //选择数量提示
                
            })
       
        }
        batchSelect()
       
        //全选or全不选
        function allSelect () {
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
            isOrNotAllSelect()
             //选中数量提示
            mouseArrowTips($("body"),howMuchSelect())
        }
        //表头全选
        $SPtanle.find(".false_table").find("th:first").click(function() { allSelect() });
        
        //鼠标指针小提示
        function mouseArrowTips(ele,num) {
            ele.find(".mouseArrowTips").stop().fadeTo(0,1);
            if (!ele.find(".mouseArrowTips").length) {
                ele.prepend("<span class='mouseArrowTips' >"+num+"</span>")
                ele.find(".mouseArrowTips").stop().delay(1000).fadeTo(300,0)
            }
            else { 
                ele.find(".mouseArrowTips").text(num) 
                ele.find(".mouseArrowTips").stop().delay(1000).fadeTo(300,0)
            }
           
        }
    }


    // //单选框
    function radioTable () {
        $table.find('[type=radio]').before("<div class=\"tbradio\"></div>")
        $SPtanle.prepend("<table class='false_table' style='position: absolute; left: 0; top: 0; z-index: 10; '><tr>"+$table.find("tr:nth-child(1)").html()+"</tr></table>")
     
        var $radio = $table.find("[type=radio]")
        var $tbradio = $table.find(".tbradio")
        var $radio_td = $table.find("tr:not(:first)").find("[type=radio]").parent() //排除表头

        $radio_td.click(function() { 
            $table.find("tr").removeClass('select')
            $tbradio.removeClass('on')
            $(this).find(".tbradio").addClass('on')
            $(this).find("[type=radio]").prop("checked",true)
            $(this).parents("tr").addClass('select')
        });
   
    }
}
 
 //表格自动调整高度
function taleAutoHeight (Class01,Class02,Otherelementheight){
    //表格调整宽高
    var fixed_box_h = $(Class01).outerHeight()
    var page123_h = $(Class02).outerHeight() 
    $(".fixed_box_div").height(fixed_box_h-20)

    var hei = $(window).height() - 170-Otherelementheight
    $(".SP_tableContent").height(hei)
}

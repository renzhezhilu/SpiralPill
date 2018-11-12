

//////////表格

var tableBox_value={};
function tableBox (tableclass,fixed_num) {
    var fixed_num = fixed_num ;
    var $SPtanle = $(tableclass);
    $SPtanle.find('table').addClass('true_table');
    var $table =$SPtanle.find(".true_table");
    var TableSelectedValue =[];

    //表头固定
    function tableHead (){
        var $_checkbox_td = $table.find("tr:not(:first)").find("[type=checkbox]").parent();
         
        //设置表头宽度
        var tableHead_w,$true_th,$false_th,true_w;
        tableHead_w = Math.round( $SPtanle.find(".true_table tr:first").width() );
        true_th = $SPtanle.find(".true_table tr:first >th");
        false_th = $SPtanle.find(".false_table tr:first >th");
        $SPtanle.find(".false_table").width( tableHead_w );
        for (var i = 0; i < true_th.size(); i++) {
            true_w = Math.round( true_th.eq(i).width() );
            false_th.eq(i).width( true_w+1 )
        }
       
        //需要侧面固定的添加class
        (function(){
            var n,_this,col,row,ww; 
            if (fixed_num>0) {
                //新表格
                // $SPtanle.append('<table class="fixed_lefttight"></table>')

                $SPtanle.find("tr").not($table.find("th").parent()).each(function(index, el) {
                    n=fixed_num;
                    _this=$(this);

                    $(this).children().each(function(index2, el2) {
                        col = $(this).attr("colspan");
                       
                        if (col) { n -= (col-1) }
                        if (index2>n) { return false }
                    });
                    row = _this.prev().find("th:nth-child(-1n+"+(fixed_num-2)+")[rowspan]").size(); 
                    console.log(row)
                    
                    if (row) {  n= n-row  }

                    if (n==1) {n++} 
                    for (var i = 0; i < n; i++) {

                        if ( $(this).children().eq(i)[0].nodeName == "TH") {
                            $(this).children().eq(i).addClass('isfixed isfixed_th');
                        }
                        else {
                            $(this).children().eq(i).addClass('isfixed isfixed_td');
                        }
                    }
                });
             }
        })();
                

        //设置滚动固定
        (function(){
            var _scrollTop , _scrollTop2=0 , _scrollLeft , _scrollLeft2=0 , $fixed_th;

            //是否滚到底了
            setTimeout(function(){
                _scrollTop2 = $table.height()-$SPtanle.height()
                _scrollLeft2 = $table.width()-$SPtanle.width()
            } , 10); 
                console.log( _scrollTop2 )


            $SPtanle.scroll(function (){

                _scrollTop = $(this).scrollTop();
                _scrollLeft = $(this).scrollLeft();
                //顶部固定
                $(this).find(".false_table").css({
                    "transform":"translateY("+_scrollTop+"px)",
                    "-ms-transform":"translateY("+_scrollTop+"px)"
                });
                //侧面固定
                $fixed_th = $(this).find(".isfixed");
                    
                        // document.write("<style>.isfixed {transform: translateX("+_scrollLeft+");}</style>")

                        $fixed_th.css({
                            "transform":"translateX("+_scrollLeft+"px)",
                            "-ms-transform":"translateX("+_scrollLeft+"px)"
                        });

                //  $SPtanle.find(".fixed_lefttight").css({
                //     "transform":"translateX("+_scrollLeft+"px)",
                //     "-ms-transform":"translateX("+_scrollLeft+"px)"
                // });;
                //滚到底了 - 底部提示
                if (_scrollTop > _scrollTop2) {
                    $table.addClass('true_table_bottom_end');
                }
                if (_scrollTop < 300) {
                    $table.removeClass('true_table_bottom_end');
                }
                //滚到底了 - 右侧提示
                if (_scrollLeft+200 > _scrollLeft2) {
                    $table.addClass('true_table_right_end');
                }
                if (_scrollLeft+100 < 200) {
                    $table.removeClass('true_table_right_end');
                }
            });
        })();
    }
    var index_tableclass =tableclass+""
    setTimeout(function(){
        tableHead ()
    } ,index_tableclass[index_tableclass.length-1]*300);
    $(window).resize(function(){
        setTimeout(function(){
                tableHead ()
        } , 300);
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
        $table.find('[type=checkbox]').before("<div class=\"tbcheckbox\"></div>");

        //复制表头 包含th的tr
        $SPtanle.prepend("<table class='false_table'></table>");
        var $false_table;
        $false_table = $SPtanle.find(".false_table");
        $table.find("th").parent().each(function(index, el) {
           $false_table.append($(this).clone());
        });
        
        var $checkbox = $SPtanle.find("[type=checkbox]");
        var $checkbox_not = $table.find("tr:not(:first)").find("[type=checkbox]");
        var $checkbox_td = $table.find("tr:not(:first)").find("[type=checkbox]").parent(); //排除表头
        var $tbcheckbox = $SPtanle.find(".tbcheckbox");

        // $checkbox_td.css({
        //     cursor: 'move'
        // });
        //判断是否已全选
        function isOrNotAllSelect() {
           var allyeseorno = true;
           for (var i = 0; i < $checkbox_not.size(); i++) {
               if ( !($checkbox_not.eq(i).prop("checked")) ) {
                    allyeseorno = false;
                    break;
               } 
           }
           if (!allyeseorno) {
                $SPtanle.find("tr:lt(2)").find(".tbcheckbox").removeClass('on');
                $SPtanle.find("tr:lt(2)").find("[type=checkbox]").prop("checked",false);
                console.log("false");
           }
           else {
                $SPtanle.find("tr:lt(2)").find(".tbcheckbox").addClass('on');
                $SPtanle.find("tr:lt(2)").find("[type=checkbox]").prop("checked",true);
                console.log("true");
           }           
        }
        //判断选中多少条
        function howMuchSelect() {
            var numselect = 0;
            for (var i = 0; i < $checkbox_not.size(); i++) {
                if ( ($checkbox_not.eq(i).prop("checked")) ) {
                     numselect++;
                } 
            }
            return numselect
        }
        //逐个选中
        function oneSelect (Element) {
            Element.find(".tbcheckbox").toggleClass('on');
            if (Element.find(".on").length) { 
                Element.find("[type=checkbox]").prop("checked",true);
                Element.parents("tr").addClass('select');
            }
            else {
                Element.find("[type=checkbox]").prop("checked",false);
                Element.parents("tr").removeClass('select');
                
            }
            //选中数量提示
            mouseArrowTips($("body"),howMuchSelect())
            isOrNotAllSelect()
            getTableSelectedValue ()
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
            getTableSelectedValue ()
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

    //单选框
    function radioTable () {
        $table.find('[type=radio]').before("<div class=\"tbradio\"></div>");
        $SPtanle.prepend("<table class='false_table' ><tr>"+$table.find("tr:nth-child(1)").html()+"</tr></table>");
     
        var $radio = $table.find("[type=radio]");
        var $tbradio = $table.find(".tbradio");
        var $radio_td = $table.find("tr:not(:first)").find("[type=radio]").parent(); //排除表头
        var $radio_tr = $table.find("tr:not(:first)");

        $radio_tr.click(function() { 
            $table.find("tr").removeClass('select');
            $tbradio.removeClass('on');
            $(this).find(".tbradio").addClass('on');
            $(this).find("[type=radio]").prop("checked",true);
            $(this).addClass('select');
            getTableSelectedValue ();
        });
    }

    //获取选中的值
    function getTableSelectedValue (){
        TableSelectedValue=[];
        var $th = $SPtanle.find(".true_table").find("tr").find("th")
        var $select = $SPtanle.find(".select")
        var $td = $select.find('td')
        var tdVal=null;
        var select_index;
        for (var i = 0; i < $select.size(); i++) {
            tdVal=new Object({});
            select_index = $select.eq(i).index()-1
            $select.eq(i).find('td').each(function(index,element){
                tdVal[$th.eq(index).text()]=$(this).text() 
                if (!tdVal.index) {tdVal.index = select_index }
            });
            
            TableSelectedValue.push(tdVal)
        }
        // $th.eq(0).attr({
        //     "table-data": JSON.stringify(TableSelectedValue)
        // });

        tableBox_value[""+tableclass.slice(1)]=TableSelectedValue
        console.log(tableBox_value[""+tableclass.slice(1)])
    }

    //横向拖动
    leftToRight ()
    function leftToRight (){
        var elementup=false;
        var x,y,x2,y2,pos,nowpos,dow_setTimeout;

        var $move_range = $SPtanle.not('.isfixed')
        $move_range.mousedown(function (e) {
            // dow_setTimeout = setTimeout(function(){
            // } , 100);
                $(this).css({
                    cursor: 'ew-resize'
                });
                elementup=true;
                x=e.pageX-parseInt($(this).css("left"));
                y=e.pageY-parseInt($(this).css("top"));
                nowpos = $(this).scrollLeft();

        }).mousemove(function(e) {
            if (elementup) {
                x2=e.pageX-x;
                //y2=e.pageY-y;
                $(this).scrollLeft(nowpos-x2);
            }
        }).mouseup(function(e) {
            $(this).css({ cursor: 'default' });
            elementup=false;
            clearTimeout(dow_setTimeout)
        });
       
    }
    //去除loading
    $SPtanle.removeClass("SP_tableContent_loading")
    $SPtanle.find(".loading").hide(0)
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

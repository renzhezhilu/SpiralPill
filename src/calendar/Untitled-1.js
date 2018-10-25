


///////////表单

$("select,input,textarea").on('click', function() {
    $(this).addClass('form_on')
});
//表单样式
function SP_from (classname) {
    //复选框
    $(classname).find("[type=checkbox]").hide('0', function() {
        _that = $(this)
        _that.before('<div class="input_checkbox"></div>')
        var name = _that.attr("name")
        _that.prev(".input_checkbox").click(function() {
            if ( !~(this.className.indexOf("on")) ) {
                $(this).addClass("on").next("[type=checkbox]").prop("checked",true)
            }
            else {
                $(this).removeClass("on").next("[type=checkbox]").prop("checked",false)
            }
            console.log($(this).next("[type=checkbox]").prop('checked'))
        })

    })
    // 单选框
    $(classname).find("[type=radio]").hide('0', function() {
        _that = $(this)
        _that.before('<div class="input_radio"></div>')

        var name = _that.attr("name")
        _that.prev(".input_radio").click(function() {
            

            $(this).addClass("on").next("[type=radio][name="+name+"]").prop("checked",true)
            $(this).siblings().next("[type=radio][name="+name+"]").prev(".input_radio").removeClass("on")
            
            console.log(_that.attr("name"))
        })
    })
}

///////////表单-end

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
            $SPtanle.find(".false_table tr:first >th").eq(i).width( w+1 )
        }
    
        $SPtanle.scroll(function (){
            var _scrollTop = $(this).scrollTop()
            var _scrollLeft = $(this).scrollLeft()
            $(this).find(".false_table").css("top",_scrollTop+"px")
            $(this).find("[type=checkbox]").parent().css("transform","translateX("+_scrollLeft+"px)")
        })
    }
    tableHead()
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
//////////表格-end

//////////日期选择
function SP_dateObtain( classname,hours,setdate) {
    //设置日期
    function showDate () {
        $(".date-input").click(function(event) {
            var xy = $(this).offset()
            var x = xy.left+$(this).outerWidth()
            var y = xy.top+$(this).outerHeight()
            var date = new Date()
            var year = date.getFullYear()
            var month = date.getMonth()
            var day = date.getDate()
        });
    }

    //获取月份天数
    function monthHowDay (datestring) {
        var date = new Date(datestring)
        var year = date.getFullYear()
        var month = date.getMonth()
        var day = date.getDate()
        for (var i = 1; i < 33; i++) {
            date.setDate(i)
            if (date.getMonth()!==month) {
                break
            }
        }
        console.log (  (month+1)+"月有"+(i-1)+"天"  )
        return i-1
    }

    //点击触发获取
    function triggerDate (){
        var $date = $(".SP-date-selection")
        $date.find("ul.day li").click(function() {
            $(this).addClass("on").siblings().removeClass('on')
            //var data_jg = new Date(  )
            console.log (obtainDate($(this).index()))
            $date.prev(".date-input ").val(obtainDate($(this).index()))
        });
    }

    //获取日期值
    function obtainDate (dayindex){
        var $date = $(".SP-date-selection")
        var year = $date.find(".year input").val()
        var month = $date.find(".month input").val()
        var day = $date.find(".day >li").eq(dayindex).text()

        if ((year<2100&&year>1900) && (month>0&&month<13)) {
            return year+"/"+month+"/"+day
        }
        else  alert('日期选择错误,请重新选择 '+year+"/"+month+"/"+day)
    }
    //获取日期值+时分秒
    function obtainDateAnd_H_M_S (dayindex){
        var $date = $(".SP-date-selection")
        var year = $date.find(".year input").val()
        var month = $date.find(".month input").val()
        var day = $date.find(".day >li").eq(dayindex).text()

        var hours = $date.find("select.h").val()
        var minute = $date.find("select.m").val()
        var second = $date.find("select.s").val()

        if ((year<2100&&year>1900) && (month>0&&month<13)) {
            return year+"/"+month+"/"+day +" " +hours+":"+minute+":"+second
        }
        else  alert('日期选择错误,请重新选择 '+year+"/"+month+"/"+day)
    }
    //获取时分秒
    function obtain_H_M_S (){
        var $date = $(".SP-date-selection")
        
        var hours = $date.find("select.h").val()
        var minute = $date.find("select.m").val()
        var second = $date.find("select.s").val()
        
        return hours+":"+minute+":"+second
    }
    //是否设置日期时间

    //初始化年月-生成html
    function htmlDate (element,x,y,html) {
        var chushitime
        if (setdate) {
            chushitime = new Date(setdate)
        }
        else chushitime = new Date()
        
        if (!$(element).next(".SP-date-selection").length) {
            var _class = "SP-date-selection"+ ~(Math.random()*100000)
            var _htmlDate = "\
            <div style='position: fixed; z-index:"+ 10+($(".SP-date-selection").size())+";' class='SP-date-selection "+_class+"'>\
                <span class='year'>\
                    <tt class='ago'>-</tt>\
                    <input class='yearinput' type='text' value='"+ chushitime.getFullYear() +"'></input>\
                    <tt class='after'>+</tt>\
                </span> \
                <span class='month'>\
                    <tt class='ago'>-</tt>\
                    <input class='monthinput' type='text' value='"+(chushitime.getMonth()+1)+"'></input>月\
                    <tt class='after'>+</tt>\
                </span>\
                <ul class='day'>\
                </ul>\
                <div class='butbox'>\
                    <a class='close'>关闭</a>\
                    <a class='ok'>确定</a>\
                </div>\
            </div>"
            var _htmlhours = "\
            <div style='position: fixed; z-index:"+ 10+($(".SP-date-selection").size())+";' class='SP-date-selection "+_class+"'>\
                <span class='year'>\
                    <tt class='ago'>-</tt>\
                    <input class='yearinput' type='text' value='"+ chushitime.getFullYear() +"'></input>\
                    <tt class='after'>+</tt>\
                </span> \
                <span class='month'>\
                    <tt class='ago'>-</tt>\
                    <input class='monthinput' type='text' value='"+ (chushitime.getMonth()+1) +"'></input>月\
                    <tt class='after'>+</tt>\
                </span>\
                <ul class='day'>\
                </ul>\
                <div class='hours'>\
                    <select class='h'>\
                    </select>\
                    时\
                    <select class='m'>\
                    </select>\
                    分\
                    <select  class='s'>\
                    </select>\
                    秒\
                </div>\
                <div class='butbox'>\
                    <a class='close'>关闭</a>\
                    <a class='ok'>确定</a>\
                </div>\
            </div>"
            var _htmlseconds = "\
            <div style='position: fixed; z-index:"+ 10+($(".SP-date-selection").size())+";' class='SP-date-selection "+_class+"'>\
                <div class='hours'>\
                    <select class='h'>\
                    </select>\
                    时\
                    <select class='m'>\
                    </select>\
                    分\
                    <select  class='s'>\
                    </select>\
                    秒\
                </div>\
                <div class='butbox'>\
                    <a class='close'>关闭</a>\
                    <a class='ok'>确定</a>\
                </div>\
            </div>"
            if (html=="hours") { $(element).after(_htmlhours) }
            else if (html=="seconds") { $(element).after(_htmlseconds) }
            else $(element).after(_htmlDate)
            
            //遍历天数 并选择今日年月日
            var today
            if (setdate) {
                today = new Date(setdate).getDate()
            }
            else today = new Date().getDate()
            function daynum (time) {
                for (var i = 1; i < monthHowDay(time)+1; i++) {
                    if (i==today) { 
                        $(element).next().find(".day").append("<li class='on'>"+i+"</li>")
                    }
                    else {
                        $(element).next().find(".day").append("<li>"+i+"</li>")
                    }
                }
            }
            if (setdate) {
                daynum(new Date(setdate))
            }
            else daynum(new Date())
            
            //遍历时分秒 并选择今日时分秒
            function h_m_s_num (time) {
                var now_h = time.getHours()
                var now_m = time.getMinutes()
                var now_s = time.getSeconds()
                if (now_h<10) {now_h="0"+now_h}
                if (now_m<10) {now_m="0"+now_m}
                if (now_s<10) {now_s="0"+now_s}
                for (var h = 0; h < 24; h++) {
                    if (h<10) {h="0"+h}
                    $(element).next().find("select.h").append("<option value ='"+h+"'>"+h+"</option>")
                }
                for (var ms = 0; ms < 60; ms++) {
                    if (ms<10) {ms="0"+ms}
                    $(element).next().find("select.m").append("<option value ='"+ms+"'>"+ms+"</option>")
                    $(element).next().find("select.s").append("<option value ='"+ms+"'>"+ms+"</option>")
                }
                $(element).next().find("select.h").val(now_h)
                $(element).next().find("select.m").val(now_m)
                $(element).next().find("select.s").val(now_s)
            }
            if (setdate && new Date(setdate).getHours() || new Date(setdate).getMinutes() || new Date(setdate).getSeconds() ) {
                h_m_s_num(new Date(setdate))
            }
            else h_m_s_num(new Date())
            

            //设置显示在input正下方
            $(element).next(".SP-date-selection").css({
                top: y+"px",
                left: x+"px"
            });

            //点击获取日期
            function getDateToValue(){
                $date = $(element).next(".SP-date-selection")
                $date[0].onselectstart = function(){return false;}
                function outputFormat(){

                }
                $date.find("ul.day li").click(function() {
                    //$(this).addClass("on").siblings().removeClass('on')
                    if (html=="hours") { 
                        $(element).val(obtainDateAnd_H_M_S($(this).index()))
                    }
                    else if (html=="seconds") { 
                        $(element).val(obtain_H_M_S())
                    }
                    else $(element).val(obtainDate($(this).index()))
                    $("."+_class).remove()

                })
                $date.find(".ok").click(function() {
                    if (html=="hours") { 
                        $(element).val(obtainDateAnd_H_M_S( $date.find(".day").find('.on').index()))
                    }
                    else if (html=="seconds") { 
                        $(element).val(obtain_H_M_S())
                    }
                    else $(element).val(obtainDate($date.find(".day").find('.on').index()))
                    $("."+_class).remove()
                })
                $date.find(".close").click(function() {
                    $("."+_class).remove()
                })

                
            }

            
            getDateToValue()
            //刷新天数
            function newDayList () {
                $date.find(".day").html("")
                daynum($date.find("input.yearinput").val()+"/"+$date.find("input.monthinput").val())
            }
            //加减年
            var $yearinput = $date.find("input.yearinput")

            $yearinput.prev(".ago").click(function(){
                var value =$(this).next().val()-0
                if (value<2100&&value>1970&& value !== NaN) { 
                    $(this).next().val(value-1) 
                    newDayList ()
                    getDateToValue()
                }
                else{ $(this).prev().val(new Date().getFullYear())   }
                
            })
            $yearinput.next(".after").click(function(){
                var value =$(this).prev().val()-0
                if (value<2100&&value>1970&& value !== NaN) { 
                    $(this).prev().val(value+1) 
                    newDayList ()
                    getDateToValue()
                }
                else{ $(this).prev().val(new Date().getFullYear())   }
                
            })
            //加减月
            var $monthinput = $date.find("input.monthinput")
            $monthinput.prev(".ago").click(function(){
                var value =$(this).next().val()-0
                if (value<13&&value>1&& value !== NaN) { 
                    $(this).next().val(value-1) 
                    newDayList ()
                    getDateToValue()
                }
                else if (value==1){
                    $(this).next().val(12)
                    $yearinput.val(  ($yearinput.val()-0)-1  )
                }
                else { $(this).next().val(new Date().getMonth()) }
                
            })
            $monthinput.next(".after").click(function(){
                var value =$(this).prev().val()-0
                console.log ( value)
                if (value<12&&value>0&& value !== NaN) { 
                    $(this).prev().val(value+1) 
                    newDayList ()
                    getDateToValue()
                }
                else if (value==12) {
                    $(this).prev().val(1)
                    $yearinput.val(  ($yearinput.val()-0)+1  )
                }
                else  { $(this).prev().val(new Date().getMonth()) }
                
            })
            //var $date = $(".SP-date-selection")
        }
    }
    //调用
    $(classname).click(function(){
      var xy = $(this).offset()
      var x = xy.left
      var y = xy.top + $(this).height()+10
      htmlDate ($(this),x,y,hours)
    });
}

// SP_dateObtain ("input.date-input01")
// SP_dateObtain ("input.date-input02","hours")
// SP_dateObtain ("input.date-input03","seconds")

// SP_dateObtain ("input.date-input04","","1990/01/19")
// SP_dateObtain ("input.date-input05","hours","2015/6/13 14:22:11")

//////////日期选择-end


//////////弹窗
// $("h2").click(function() {
//     var popUpWindowId =this.tagName+"-"+$(this).index( this.tagName )
//     $(this).attr("popUpWindowId", popUpWindowId )
//     var htmlssd = $(".test").html()
//     new_popUpWindow (popUpWindowId,"标题生生世世",htmlssd,"1000px","500px")
// });

function new_popUpWindow (elementid,title,con,w_width,w_height,titleicon,tem) {
    //判断是否已经创建过
    var windowsid = elementid
    if ( $("body").find("."+windowsid).length  ) {
        console.log("已经创建过"+windowsid)
        $("."+windowsid).fadeTo(10,1)
    }
    else {
        var setting = {
            top:{
                title:title,
                subtitle:"标题",
                titleicon:titleicon
            },
            center:con,
            bottom:{
                unimportanttext:" ",
                okbut:"确认",
                nobut:"取消",
                otherbut:""
            },
            other:{
                width:w_width,
                height:w_height,
                content_full:""
            }
        }
        
        var htmltem_complex = "\
            <div popUpWindowId='"+windowsid+"' class='popup-window "+windowsid+"'>\
                <div class='content "+setting.other.content_full+"' style='min-width:"+setting.other.width+"; min-height:"+setting.other.height+";'>\
                    <div class='top'>\
                        <div class='title'>\
                            <h3>\
                                <i class='fa fa-"+setting.top.titleicon+"'></i>\
                                <strong>"+setting.top.title+"</strong>\
                                <span>"+setting.top.subtitle+"</span>\
                            </h3>\
                        </div>\
                        \
                        <div class='windowbut'>\
                            <i title='全屏' class='fa fa-window-maximize full_but'></i>\
                            <i title='关闭' class='fa fa-times close_but'></i>\
                        </div>\
                    </div>\
                    <div class='center'>\
                        \
                    </div>\
                    <div class='bottom'>\
                        <div class='text'>"+setting.bottom.unimportanttext+"</div>\
                        <div class='button'>\
                            <div class='okbut'>"+setting.bottom.okbut+"</div>\
                            <div class='nobut'>"+setting.bottom.nobut+"</div>\
                            <div class='otherbut'>"+setting.bottom.otherbut+"</div>\
                        </div>\
                    </div>\
                </div>\
                <div class='bg'></div>\
            </div>\
        "
        var htmltem_simple01 = "\
            <div popUpWindowId='"+windowsid+"' class='popup-window "+windowsid+"'>\
                <div class='content "+setting.other.content_full+"' style='min-width:"+setting.other.width+"; min-height:"+setting.other.height+";'>\
                    <div class='top'>\
                        <div class='title'>\
                            <h3>\
                                <i class='fa fa-"+setting.top.titleicon+"'></i>\
                                <strong>"+setting.top.title+"</strong>\
                            </h3>\
                        </div>\
                        \
                        <div class='windowbut'>\
                            <i title='全屏' class='fa fa-window-maximize full_but'></i>\
                            <i title='关闭' class='fa fa-times close_but'></i>\
                        </div>\
                    </div>\
                    <div class='center'>\
                       \
                    </div>\
                    <div class='bottom'>\
                        <div class='text'>"+setting.bottom.unimportanttext+"</div>\
                        <div class='button'>\
                            <input type='button' class='okbut' value='"+setting.bottom.okbut+"'>\
                            <div class='nobut'>"+setting.bottom.nobut+"</div>\
                        </div>\
                    </div>\
                </div>\
                <div class='bg'></div>\
            </div>\
        "
       

        if (tem=="htmltem_complex") tem=htmltem_complex
        else tem=htmltem_simple01
        $("body").append(tem).show(0, function() {
            var $_this = $("."+windowsid)

            $_this.find(".center").append($(con).children().clone(true))
            $(con).remove()
            //关闭
            function closeWindow () {
                $_this.fadeTo(10,0).hide(0)
            }
            $_this.find(".close_but,.nobut").click(function(event) {
                closeWindow()
            });
            //全屏
            $_this.find(".full_but").click(function(event) {
                $_this.find('.content').toggleClass("content_full")
                $(this).toggleClass("fa-window-restore")
            });

            $_this.show(0).fadeTo(10,1)
        });
    } //else-end
    return windowsid
}

//////////弹窗-end

//////////提示

function tipsWindow (con,classname,icon) {
    
    if (!con) {con="平平无奇的提示框!"; classname="gray"; icon="<i class='fa fa-angellist'></i>"}
    else if (con=="ok") {con="操作成功!"; classname="green"; icon="<i class='fa fa-check-circle'></i>"}
    else if (con=="no") {con="操作失败!"; classname="red"; icon="<i class='fa fa-window-close'></i>"}
    else if (con=="alert") {
        con="无响应"; 
        classname="orange"; 
        icon="<i class='fa fa-warning'></i>"
    }
    else {
        con=con
        icon="<i class='fa fa-"+icon+"'></i>"
        classname= classname
    }
    var newclass="SP-tips-window"+Math.floor(Math.random()*100000)
    $("body").append('<div class="SP-tips-window '+newclass+'"><p><span></span></p></div>')
    newclass="."+newclass
    var tips_h = $(".SP-tips-window").outerHeight()
    for (var i = 0; i < $(".SP-tips-window").size(); i++) {
        var jl = (tips_h+10)*i;
    }
    console.log (jl)
    $(newclass).css('top', jl);
    $(newclass).addClass(classname)
    $(newclass).find("span").text(con).before(icon)
    $(newclass).animate({height:"auto"},0, function() {
        $(this).addClass("on")
    })
    $(newclass).delay(1300).animate({height:"auto"},0, function() {
        $(this).removeClass("on")
    }).delay(100).animate({height:"auto"},0, function() {
        $(this).remove()

    })
    
}
//////////提示-end


//////////切换
function contentSwitch (tabclass,conclass,index) {
        var go = function (_index){
            $(tabclass).children().eq(_index).addClass("on").siblings().removeClass('on')
            $(conclass).children().eq(_index).show(0).siblings().hide(0)
        }
        go(index)
        $(tabclass).children().click(function() {
            go($(this).index())
            console.log ($(this).index())
        });
    }
    //contentSwitch(".sp_tab",".sp_con",0)
//////////切换-end


/////////新建窗体  
function newOpenWindow (add,w,h){
    window.open(add,'_blank','height='+h+',width='+w+',scrollbars=no,status =no,location=0,titlebar=yes,fullscreen=1')
}
function newOpenWindow2 (url, options) {
    var str = "";
    if (options) {
    options.height = options.height || 420;
    options.width = options.width || 550;
    options.left = options.left || ((screen.width - options.width) / 2); //默认为居中
    options.top = options.top || ((screen.height - options.height) / 2); //默认为居中
     
    for (var i in options) {
    str += ',' + i + '=' + options[i];
    }
    str = str.substr(1);
    };
    //window.open(url, 'connect_window_'+ (+new Date), str);//参数1为url,参数2为了能可以重复弹出
    window.open(url, 'connect_window_'+ (+new Date), str,);
    str = null;
};

//onClick="newOpenWindow('../windowpage/员工选择.html','1000','600')" 
/////////新建窗体-end


/////////复制元素
function copyElement(but,con,k){
    $(but).click(function(e) {

        var _con =  $(con).first().clone(true)
        if (k=="before") {
            $(con).first().before(_con)
        }
        else {
            $(con).last().after(_con)
        }
    });
}

/////////删除元素自身
function deleteElement (but,con){
    $(but).click(function() {
        if ($(con).size()!==1) {
            $(this).parents(con).hide('300', function() {
                $(this).remove()
            });
        }
        
    });
}
//////////表单样式
function SP_from (classname) {
	//复选框
	$(classname).find("[type=checkbox]").hide('0', function() {
		_that = $(this)
		_that.before('<div class="input_checkbox"></div>')
		var name = _that.attr("name")
		_that.prev(".input_checkbox").click(function() {
			if ( !~(this.className.indexOf("on")) ) {
				$(this).addClass("on").next("[type=checkbox]").prop("checked",true)
			}
			else {
				$(this).removeClass("on").next("[type=checkbox]").prop("checked",false)
			}
			console.log($(this).next("[type=checkbox]").prop('checked'))
		})

	})
	// 单选框
	$(classname).find("[type=radio]").hide('0', function() {
		_that = $(this)
		_that.before('<div class="input_radio"></div>')

		var name = _that.attr("name")
		_that.prev(".input_radio").click(function() {
			

			$(this).addClass("on").next("[type=radio][name="+name+"]").prop("checked",true)
			$(this).siblings().next("[type=radio][name="+name+"]").prev(".input_radio").removeClass("on")
			
			console.log(_that.attr("name"))
		})
	})
}

//hack ie 对象不支持“stopPropagation”属性或方法

// if (event.stopPropagation) { 
//         // 针对 Mozilla 和 Opera 
//         event.stopPropagation(); 
//         } 
// else if (window.event) { 
//         // 针对 IE 
//         window.event.cancelBubble = true; 
// }

(function (){


})()
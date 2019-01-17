
///////////表单-end

var tableBox_value={}; //tableBox_value.SP_tableContent01
var tableBox_alldata={}; //tableBox_alldata.SP_tableContent01
function tableBox (tableclass,fixed_num,callback) {
    var fixed_num = fixed_num ;
    var $SPtanle = $(tableclass);
    $SPtanle.find('th').parent().addClass('table_head')
    var $table_head = $SPtanle.find('.table_head')
    var $table_head_not_first_th = $SPtanle.find('.table_head th:not(:first-child)')
    var $table_head_th = $SPtanle.find('.table_head th:first-child')

    if($SPtanle.find('table').length<2){
        $SPtanle.find('table').addClass('true_table');
    }
    var $table =$SPtanle.find(".true_table");
    var TableSelectedValue =[];

    
 
    //判断复选框还是单选框
    var checkboxoradio = $SPtanle.find('.true_table th:first').find('[type=checkbox]').length
    if (checkboxoradio) {
        // 排除重复生成
        var nn =1;
        if (nn=1) {
            checkboxTable();
            nn=2
        }
    }
    else {
        radioTable()
    }
    
    //复选框
    function checkboxTable () {
        // $table.find('[type=checkbox]').before("<div class='tbcheckbox'></div>");
        var $checkbox = $SPtanle.find("[type=checkbox]");
        var $checkbox_not = $table.find("tr:not(:first)").find("[type=checkbox]");
        var $checkbox_td = $table.find("tr:not(:first)").find("[type=checkbox]").parent(); //排除表头
        var $checkbox_tr = $table.find("tr:not(:first)") //排除表头
        var $tbcheckbox = $SPtanle.find(".tbcheckbox");


        // $checkbox_td.css({
        //     cursor: 'move'
        // });
        //判断是否已全选
        function isOrNotAllSelect() {
           if ($checkbox_tr.length !== howMuchSelect()) {
                $table_head_th.find(".tbcheckbox").removeClass('on');
                $table_head_th.find("[type=checkbox]").prop("checked",false);
                console.log("false");
           }
           else {
                $table_head_th.find(".tbcheckbox").addClass('on');
                $table_head_th.find("[type=checkbox]").prop("checked",true);
                console.log("true");
           }           
        }
        //判断选中多少条
        function howMuchSelect() {
            return  $SPtanle.find('.select').length;
        }
   
        //批量选中
        function batchSelect () {
            var elementup = 0
            
            function setCheckboxFalse (el) {
                var $tr_parent=el;
                var checked = $tr_parent.find("[type=checkbox]").prop("checked")
                if(checked){
                    $tr_parent.find("[type=checkbox]").prop("checked",false);
                    $tr_parent.removeClass('select');
                    mouseArrowTips($("body"),howMuchSelect())
                    isOrNotAllSelect()
                }
            }
            function setCheckboxtrue (el) {
                var $tr_parent=el;
                var checked = $tr_parent.find("[type=checkbox]").prop("checked")
                if(!checked){
                    $tr_parent.find("[type=checkbox]").prop("checked",true);
                    $tr_parent.addClass('select');
                    console.log(elementup)
                    mouseArrowTips($("body"),howMuchSelect())
                    isOrNotAllSelect()
                }
                
            }
            $SPtanle.on({
                // 按下
                mousedown:function(event){
                    console.log(event.target.nodeName);
                    var $target = $(event.target),
                        $tr_parent = $target.parents('tr');
                        $isOn = $tr_parent.find("[type=checkbox]").prop("checked");
                    if( ($target.find('div').length || $target.nextAll('input').length )&& $target.parents('tr.table_head').length==0 ){
                        if($isOn){
                            setCheckboxFalse ($tr_parent);
                            elementup=1;
                        }
                        else {
                            setCheckboxtrue ($tr_parent);
                            elementup=2;
                        }
                        document.onselectstart = function(){return false} //禁选文本
                    }
                },  
                //移动
                mousemove:function(event){
                    var $target = $(event.target),
                        $tr_parent = $target.parents('tr');
                        if ( $target.parents('tr.table_head').length==0){
                            if (elementup==1) {
                                setCheckboxFalse ($tr_parent);
                            }
                            if (elementup==2) {
                                setCheckboxtrue ($tr_parent);
                            }
                        }
                }, 
                //放开
                mouseup:function(){
                    if (elementup){
                        elementup=0
                        document.onselectstart = function(){return true} //解！
                        getTableSelectedValue ()
                    }
                }  
            });
        }
        batchSelect()
       
        // //全选or全不选
        function allSelect (that) {

            $(this).data("num")
            if (!$(this).data("num")) {
                console.time('bb')
                $(that).find('[type=text]').prop("checked",true)
                $(that).find('div').addClass('on');
                $checkbox.prop("checked" ,true)
                $checkbox_tr.addClass('select');
                $(this).data("num",1)
                console.timeEnd('bb')
            }
            else {
                $(that).find('[type=text]').prop("checked",false)
                $(that).find('div').removeClass('on');
                $checkbox.prop("checked",false)
                $checkbox_tr.removeClass('select');
                $(this).data("num",0)
            }   
            isOrNotAllSelect()
             //选中数量提示
            mouseArrowTips($("body"),howMuchSelect())
            getTableSelectedValue ()
        }
        //表头全选
        $table_head_th.click(function() { allSelect($(this)) });
        
        //鼠标指针小提示
        function mouseArrowTips(ele,num) {
            ele.find(".mouseArrowTips").stop().fadeTo(0,1);
            if (!ele.find(".mouseArrowTips").length) {
                ele.prepend("<span class='mouseArrowTips' >"+num+"</span>")
                ele.find(".mouseArrowTips").stop().delay(10000).fadeTo(300,0)
            }
            else { 
                ele.find(".mouseArrowTips").text(num) 
                ele.find(".mouseArrowTips").stop().delay(10000).fadeTo(300,0)
            }
           
        }
    }

    //单选框
    function radioTable () {
        $table.find('[type=radio]').before("<div class=\"tbradio\"></div>");
        var $tbradio = $table.find(".tbradio");
        var $radio_tr = $table.find("tr:not(:first)");
        $radio_tr.click(function() { 
            $table.find("tr").removeClass('select');
            $tbradio.removeClass('on');
            $(this).find("[type=radio]").prop("checked",true);
            $(this).addClass('select');
            getTableSelectedValue ();
        }).dblclick(function() {
            $table.find("tr").removeClass('select');
            getTableSelectedValue ();
        });
    }

   
    //回调
    $SPtanle.mouseup(function() {
        if (callback) {
            setTimeout(callback, 10);
        } 
    });

    //横向拖动
    if ($table.width() > $SPtanle.width()) {
        //出现滚动条才执行
        // leftToRight ()
    }
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

     //获取选中的值
    function getTableSelectedValue (){
        TableSelectedValue=[];
        var $th = $SPtanle.find("th")
        var $select = $SPtanle.find(".select")
        var tdVal=null;
        var select_index;
        for (var i = 0; i < $select.length; i++) {
            tdVal=new Object({});
            select_index = $select.eq(i).index()-1
            $select.eq(i).find('td').each(function(index,element){
                tdVal[$th.eq(index).text()]=$(this).text() 
                if (!tdVal.index) {tdVal.index = select_index }
            });
            TableSelectedValue.push(tdVal)
        }
        tableBox_value[""+tableclass.slice(1)]=TableSelectedValue
        // console.log(tableBox_value[""+tableclass.slice(1)])
        console.log("调用：tableBox_value."+""+tableclass.slice(1))
    }

    ///////////////////////////////排序2019-01-03
    (function(){
        // 全局变量->table数据
        //原始数据
        var new_tabledata = tableBox_alldata[""+tableclass.slice(1)];
        new_tabledata=getTableAToJson($SPtanle);
        console.log(new_tabledata,'11111')
        console.log("调用：tableBox_alldata."+""+tableclass.slice(1))
        //获取表格内容
        function getTableAToJson (el){
            var tabledata = [];
            el.find('tbody tr').each( function(index, val) {
                var trdata = [];
                $(this).find('td').each( function(index02, val02) {
                    trdata.push($(this).html());
                });
                tabledata.push(trdata);
            });
            return tabledata;
        }

        //被处理的数据
        var old_tabledata = new_tabledata.slice();
        console.log(old_tabledata,'old_tabledataold_tabledata')

        if (!$SPtanle.find('.sort').length){
                //初始化
                function initial (ind){
                    //单个
                    if (ind){
                        $table_head_not_first_th.eq(ind).attr({
                            'class': 'sort sort_default',
                            'sort-important': '0',
                            'sort-type':'up'
                        });
                    }
                   //全部
                    else {
                        $table_head_not_first_th.each(function(index, val) {
                            $(this).attr('class','sort sort_default')
                            $(this).attr('sort-type','up');
                            $(this).attr('sort-important','0');
                        }); 
                    }
                }
                initial ()

                

                var  _table_sort_index = tableclass.replace(/\./g,'')+'_table_sort_index';
                var  _table_sort_up_down = tableclass.replace(/\./g,'')+'_table_sort_up_down';
                
                //排序表
                var howsort ={};


                //获取排序重要性1->2->3
                function getSortImportant(){
                    var d = [];
                    $table_head_not_first_th.each(function(index, val) {
                        d.push( +($(this).attr('sort-important')) );
                    });
                    var max = d.sort(function(a,b){ return b-a})[0] + 1 ;
                    if(max>3 || max==0) {
                        max=1;
                        initial ()
                    }
                    return max
                }


                //添加排序关闭按钮
                $(document).on('mouseenter', tableclass+' .table_head', function(event) {
                    if( $(this).find('.sort_close').length==0){
                        $table_head_not_first_th.append('<div class="sort_close"></div>')
                    }
                });
                //关闭排序
                $table_head_not_first_th.on('click','.sort_close', function(event) {
                    event.stopPropagation();
                    var $th = $(this).parent();
                    var ind = $(this).parent().index()-1;
                    var e_important = $th.attr('sort-important');
                    if (e_important==1) {
                        initial ()
                        outputTableHtml(null,new_tabledata)
                    }
                    if (e_important==2) {
                        
                        $table_head_not_first_th.each(function(index, val) {
                            if($(this).attr('sort-important')==2){
                                initial ($(this).index()-1)
                            }
                            if($(this).attr('sort-important')==3){
                                initial ($(this).index()-1)
                            }
                        }); 
                        howsort.word02.thindex = undefined;
                        howsort.word02.sorttype = undefined;
                        howsort.word03.thindex = undefined;
                        howsort.word03.sorttype = undefined;
                        tableDataSort(old_tabledata,howsort);
                        outputTableHtml(howsort,old_tabledata)
                    }
                    if (e_important==3) {
                        $table_head_not_first_th.each(function(index, val) {
                            if($(this).attr('sort-important')==3){
                                initial ($(this).index()-1)
                            }
                        }); 
                        howsort.word03.thindex = undefined;
                        howsort.word03.sorttype = undefined;
                        tableDataSort(old_tabledata,howsort);
                        outputTableHtml(howsort,old_tabledata)
                    }
                   
                });
                 
                /////////表头点击排序
                $table_head_not_first_th.on('click', function(event) {
                    
                    var e_className = event.target.className;
                    var e_nodeName = event.target.nodeName;
                    var $target = event.target;
                    var sortType = $(this).attr('sort-type');//排序类型

                        if( !+($(this).attr('sort-important')) ){
                            $(this).attr('sort-important', getSortImportant() )
                        }
                        if($(this).attr('class')=='sort sort_down '){
                            $(this).attr('sort-important', 0 )
                        }

                        //升序
                        if(sortType=='up'){
                            $(this).attr('sort-type','down');
                            $(this).attr('class','sort sort_up')
                        }
                        //降序
                        // if(sortType=='down'){
                        else {
                            $(this).attr('sort-type','up');
                            $(this).attr('class','sort sort_down')
                        }

                        //记录筛选表
                        var thindex01,thindex02,thindex03;
                        var sorttype01,sorttype02,sorttype03;
                        $table_head_not_first_th.each(function(index, val) {
                            var v = +($(this).attr('sort-important'));
                            if( v ==1 ){
                                thindex01=$(this).index();
                                sorttype01 = $table_head_not_first_th.eq(index).attr('sort-type')
                            }
                            if( v ==2 ){
                                thindex02=$(this).index()
                                sorttype02 = $table_head_not_first_th.eq(index).attr('sort-type')
                            }
                            if( v ==3 ){
                                thindex03=$(this).index()
                                sorttype03 = $table_head_not_first_th.eq(index).attr('sort-type')
                            }
                        });
                        var moresorts = {
                            word01:{
                                sortindex:1,
                                thindex:thindex01,
                                sorttype:sorttype01
                            },
                            word02:{
                                sortindex:2,
                                thindex:thindex02,
                                sorttype:sorttype02
                            },
                            word03:{
                                sortindex:3,
                                thindex:thindex03,
                                sorttype:sorttype03
                            }
                        }
                        howsort = moresorts;
                        //开始筛选并输出
                        console.log(old_tabledata,'2222')
                        tableDataSort(old_tabledata,moresorts);
                        outputTableHtml(moresorts,old_tabledata)

                });//click-end


                //读取上次的排序
                // if( $.cookie('table_sort_index')!='none' ){
                //     if($.cookie(_table_sort_up_down)=='down') {
                //         $(tableclass+' .table_head th.sort').eq($.cookie(_table_sort_index)-1).click();
                //     }
                //     if($.cookie(_table_sort_up_down)=='none') {
                //         $(tableclass+' .table_head th.sort').eq($.cookie(_table_sort_index)-1).click().click();
                //     }
                // }
                // console.log('table_sort_index',$.cookie(_table_sort_index),'\ntable_sort_up_down',$.cookie(_table_sort_up_down))

                // 
                
                //字符串分类
                function whatStringType (val) {
                    if (!val) { return 'null'}                                      // 无效值
                    else if (!isNaN(+val)) { return 'number' }                      // 数字
                    else if ( !isNaN(new Date(val).getTime())){  return 'date' }    // 时间
                    else { return 'other' }                                         // 其他值
                }

                //数组字段排序
                function tableDataSort (data,moresorts,isreverse) {
                    console.table(moresorts)
                    var newdata = data;
                    //原始值
                    if (moresorts===null) return new_tabledata;

                    //根据数据类型返回对应的排序函数
                    function getDataTypeFun(a,b,ind,sorttype,fun){
                        var type = whatStringType(a[ind]);
                        // console.log(a[ind])
                        if(type == 'number') {
                                return numberFun(a,b,ind,sorttype,fun)

                        }
                        else if(type == 'date') {
                                return dateFun(a,b,ind,sorttype,fun)
                        }

                        else if(type == 'other') {
                            if ( isNaN(parseInt(a))){
                                return otherCnFun(a,b,ind,sorttype,fun)
                            }
                            else {
                                return otherTextNumberFun(a,b,ind,sorttype,fun)

                            }
                        }
                        else {
                            // console.log('无效值/空值')
                        }
                        function numberFun (a,b,ind,sorttype,fun){ 
                           
                           console.log(sorttype)
                           if(sorttype=='up'){
                                if(a[ind]==b[ind]){
                                    return fun()
                                }
                                return a[ind]-b[ind]
                           }
                           else { 
                                if(a[ind]==b[ind]){
                                    return fun()
                                }
                                return b[ind]-a[ind]
                           }
                        }
                        function dateFun (a,b,ind,sorttype,fun2){ 
                            // if(new Date(a[ind]).getMonth() == new Date(b[ind]).getMonth() ){
                            
                            if(sorttype=='up'){
                                 if(Date.parse(a[ind]) == Date.parse(b[ind]) ){
                                    return fun2()
                                 }
                                 return Date.parse(a[ind]) < Date.parse(b[ind]) ? 1:-1;
                            }
                            else {
                                if(Date.parse(a[ind]) == Date.parse(b[ind]) ){
                                   return fun2()
                                }
                                 return Date.parse(b[ind]) < Date.parse(a[ind]) ? 1:-1;
                            }
                        }
                        function otherCnFun(a,b,ind,sorttype,fun){ 
                            if(a[ind]==b[ind]){
                                return fun()
                            }
                            if(sorttype=='up'){
                                 return a[ind].localeCompare(b[ind]) 
                            }
                            else {
                                 return b[ind].localeCompare(a[ind]) 
                            }
                        }
                        function otherTextNumberFun (a,b,ind,sorttype,fun){ 
                            if(sorttype=='up'){
                                 return parseInt(a[ind])-parseInt(b[ind])  
                            }
                            else {
                                 return parseInt(b[ind])-parseInt(a[ind]) 
                            }
                        }
                    }
                 
                    //////开始排序 三重排序
                    newdata.sort(function(a,b){
                        return getDataTypeFun(a,b,moresorts.word01.thindex,moresorts.word01.sorttype,function(){
                            return getDataTypeFun(a,b,moresorts.word02.thindex,moresorts.word02.sorttype,function(){
                                return getDataTypeFun(a,b,moresorts.word03.thindex,moresorts.word03.sorttype,function(){

                                });
                            });
                        });
                    })

                    // 是否相反排序
                    // if (isreverse){ newdata.reverse() }
                    return newdata;
                }
                //输出html
                function outputTableHtml (moresorts,jsondata){
                    var arr=[];
                    for (var x in jsondata ){
                        arr.push('<tr>')
                        for (var c in jsondata[x] ){
                            arr.push('<td>'+jsondata[x][c]+'</td>')
                        }
                        arr.push('</tr>')
                    }
                    var w,c;
                    var ww  = function(ww){
                        return $SPtanle.find('[sort-important='+ww+']').outerWidth();
                    }

                    $SPtanle.find('tr th[sort-important]').attr('style', '');
                    $SPtanle.find('tbody').html(arr.join('')); 
                    if (moresorts){
                        //待优化！！！不用循环 直接sort-important属性判断那行需要sticky就行
                       for (var i = 1; i < 4; i++) {
                           if(moresorts['word0'+i].thindex){
                                
                            if (i==1){
                                w =0; c='rgb(109, 177, 132)';
                            }
                            else if (i==2){
                                w = ww(1); c='rgba(120, 197, 146, 0.92)';
                            }
                            else if (i==3){
                                w = ww(1)+ww(2); c='rgba(145, 214, 168, 0.92)';
                            }
                            $SPtanle.find('tr td:nth-child('+(moresorts['word0'+i].thindex+1)+')').css({
                                    'background-color':c,
                                    'border': '1px solid rgba(37, 118, 64,'+ (1-(0.03*i))+')',
                                    'position': 'sticky',
                                    'left': w,
                                    'z-index':1
                                    // 'right': w
                                })
                            // $SPtanle.find('tr th').css({
                            //         'position': 'relative',
                            //         'left': 0
                            //     })

                            $SPtanle.find('tr th:nth-child('+(moresorts['word0'+i].thindex+1)+')').css({
                                    'position': 'sticky',
                                    'left': w,
                                    'z-index':100
                                })
                            
                                
                           
                           }
                       } 
                    }
                    console.log('输出html')
                }
        }
        else{
            console.log('jump')
        }
    }());

    ///////////////////////////////拖放2019-01-04
    (function(){
       
    }())    
}
 //表格自动调整高度
function taleAutoHeight (Class01,Class02,Otherelementheight){
    //表格调整宽高
    var fixed_box_h = $(Class01).outerHeight()
    var page123_h = $(Class02).outerHeight() 
    $(".fixed_box_div").height(fixed_box_h-20)

    var hei = $(window).height() - 170-Otherelementheight
    $("div.SP_tableContent").height(hei)
}

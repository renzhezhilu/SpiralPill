
getCalendar (new Date(),".SP_calendar")

//获取日历
function getCalendar (whatDate,className){
	//设置时间
	var getCalendarTime = new Date(whatDate);  //new Date("2018/1/3");
	//获取年月日，获取上下非本月区间
	var now_Y = getCalendarTime.getFullYear()
	var now_M = getCalendarTime.getMonth()
	var now_D = getCalendarTime.getDate()
	var daynum = monthHowDay(getCalendarTime)
	var start = getCalendarTime,end = getCalendarTime
	start.setDate(0) //从星期几开始
	start = start.getDay()	
	start = 1-start
	end.setDate(monthHowDay(getCalendarTime))
	end = end.getDay()
	end = 12-end
	//容器
	var m_html,m_class;
	var tem = "\
	<div class='title'>\
		<li>星期一</li>\
		<li>星期二</li>\
		<li>星期三</li>\
		<li>星期四</li>\
		<li>星期五</li>\
		<li>星期六</li>\
		<li>星期天</li>\
	</div>\
	<ul class='content'></ul>"
	$(className).html(tem)
	for (var i = start; i < (daynum+end); i++) {
		var all = new Date(now_Y+"/"+(now_M+1));
        all.setDate(i)
        var li_date = all.getFullYear()+'/'+(all.getMonth()+1)+'/'+all.getDate()
        //判断是否节日
		var icon =''; lunarDay=''  //lunarDay=dateToLunar(all).lunarDay;
		if (ifHoliday(all)) { icon = "<i class='fa fa-bookmark'></i>"; lunarDay=''; }

		//非本月
		if (i<=0 || i>daynum ) { m_class= 'othermonth' }
		//指定日/今日
		else if (all.getDate()==new Date().getDate()&&all.getMonth()==new Date().getMonth()&&all.getFullYear()==new Date().getFullYear()) { 
			m_class= 'nowmonth on'; lunarDay='今日' 
		}
		//本月
		else { 
			if (all.getDay()==6 || all.getDay()==0) {
				m_class= 'nowweekend' 
			}
			else {
				m_class= 'nowmonth' 
			}
		}
		if (ifHoliday(all)) { 
			
			if (i<=0 || i>daynum) {
				m_class= 'nowmonth p4 othermonth'; 
			}
			else m_class= 'nowmonth p4'; 
		 }

		
		//输出
		m_html = 
			"<li date='"+li_date+"' class='"+m_class+"'>"+
			"<span class='getDate'>"+all.getDate()+"</span><span class='nDate'>"+
			ifHoliday(all) + lunarDay +
			"</span>"+icon+"<b class='beizhu'></b></li>"
		$(className).find("ul").append(m_html)
	}
    //双击编辑
    var popupboxtem = "\
        <div class='popupbox'>\
            <div class='date'>2018/09/01</div>\
            <div>\
                <p class='p1'>正常上班</p>\
                <p class='p2'>上半天班</p>\
                <p class='p3'>周末</p>\
                <p class='p4'>节假日</p>\
            </div>\
            <input type='text' placeholder='备注'>\
        </div>\
        "
	$(className).find("li").not('.othermonth').dblclick(function (e) { 
        $(className).find(".popupbox").remove()
        $(this).append(popupboxtem)
        $(this).find(".date").html($(this).attr("date"))

        var _that = $(this)

        $(this).find("p").click(function(event) {
	    	$(this).parents("li").attr("class",($(this).attr("class")))

	    	_that.find('.beizhu').text(_that.find('input').val()).attr({
	    		title: _that.find('input').val()
	    	});
	    	$(className).find(".popupbox").remove()
	    });
    
    });

    //顶部
    var topboxtem = "\
    <div class='topbox clearfloat'>\
		<h2 class='dateshow left'>"+now_Y+"年"+(now_M+1)+"月</h2>\
		<div class='datebut left' >\
			<span class='prvebut'>\
				<i class='fa fa-chevron-circle-left'></i>\
			</span>\
			<span class='today'>今天</span>\
			<span class='nextbut'><i class='fa fa-chevron-circle-right'></i></span>\
		</div>	\
		<div class='whatbox right'>\
			<span></span>\
			<span><b class='p1'></b>上班</span>\
			<span><b class='p2'></b>半天班</span>\
			<span><b class='p3'></b>周末</span>\
			<span><b class='p4'></b>节假日</span>\
		</div>\
	</div>"
	$(className).prepend(topboxtem)
    //切换月份
    $(className).find('.nextbut').click(function(event) {
    	getCalendar(new Date(now_Y,now_M+1),$(className))
    });
    $(className).find('.prvebut').click(function(event) {
    	getCalendar(new Date(now_Y,now_M-1),$(className))
    });
    $(className).find('.today').click(function(event) {
    	getCalendar(new Date(),$(className))
    });
    

}

//判断节假日 
function ifHoliday(time){
	var jg;
	var holiday = {
		"元旦":"11",
		"妇女节":"38",
		"劳动节":"51",
		"青年节":"54",
		"儿童节":"61",
		"国庆节":"101",
		"除夕":"腊月三十",
		"春节":"正月初一",
		"元宵节":"正月十五",
		"清明节":"二月廿七",
		"端午节":"五月初五",
		"中秋节":"八月十五",
		"重阳节":"九月初九",
	}
	time = new Date(time)
	var time_m = time.getMonth()+1
	var time_d = time.getDate()
	var time_n = dateToLunar(time)
	for (var key in holiday) {
		if (holiday.hasOwnProperty(key)) {
			if ( holiday[key]==(time_m+''+time_d) || holiday[key]==(time_n.lunarMonth+'月'+time_n.lunarDay) ) {
				jg=key
			}
		}
	}
	if (!jg) {jg=""}
	console.log(jg)
	return jg
}
//这个月有几天
//console.log(dateToLunar(whatDate).lunarDay)
function monthHowDay (datestring) {
	var date = new Date(datestring)
	var month = date.getMonth()
	for (var i = 1; i < 33; i++) {
		date.setDate(i)
		if (date.getMonth()!==month) {
	    	return i-1
		}
	}
}
//阳历转阴历
function dateToLunar(time){
	var lunarYearArr=[0x0b557,0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,0x0d520],lunarMonth=['正','二','三','四','五','六','七','八','九','十','冬','腊'],lunarDay=['一','二','三','四','五','六','七','八','九','十','初','廿'],tianGan=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'],diZhi=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];if(typeof time=="object"){var sy=time.getFullYear();var sm=time.getMonth()+1;var sd=time.getDate()}else{var time=new Date(time);var sy=time.getFullYear();var sm=time.getMonth()+1;var sd=time.getDate()}
	return sloarToLunar(sy,sm,sd)
	function sloarToLunar(sy,sm,sd){sm-=1;var daySpan=(Date.UTC(sy,sm,sd)-Date.UTC(1949,0,29))/(24*60*60*1000)+1;var ly,lm,ld;for(var j=0;j<lunarYearArr.length;j++){daySpan-=lunarYearDays(lunarYearArr[j]);if(daySpan<=0){ly=1949+j;daySpan+=lunarYearDays(lunarYearArr[j]);break}}
	for(var k=0;k<lunarYearMonths(lunarYearArr[ly-1949]).length;k++){daySpan-=lunarYearMonths(lunarYearArr[ly-1949])[k];if(daySpan<=0){if(hasLeapMonth(lunarYearArr[ly-1949])&&hasLeapMonth(lunarYearArr[ly-1949])<=k){if(hasLeapMonth(lunarYearArr[ly-1949])<k){lm=k;}else if(hasLeapMonth(lunarYearArr[ly-1949])===k){lm='闰'+k;}else{lm=k+1;}}else{lm=k+1;}
	daySpan+=lunarYearMonths(lunarYearArr[ly-1949])[k];break}}
	ld=daySpan;if(hasLeapMonth(lunarYearArr[ly-1949])&&(typeof(lm)==='string'&&lm.indexOf('闰')>-1)){lm=`闰${lunarMonth[/\d/.exec(lm)-1]}`}else{lm=lunarMonth[lm-1];}
	ly=getTianGan(ly)+getDiZhi(ly);if(ld<11){ld=`${lunarDay[10]}${lunarDay[ld-1]}`}else if(ld>10&&ld<20){ld=`${lunarDay[9]}${lunarDay[ld-11]}`}else if(ld===20){ld=`${lunarDay[1]}${lunarDay[9]}`}else if(ld>20&&ld<30){ld=`${lunarDay[11]}${lunarDay[ld-21]}`}else if(ld===30){ld=`${lunarDay[2]}${lunarDay[9]}`}
	return{lunarYear:ly,lunarMonth:lm,lunarDay:ld,}}
	function hasLeapMonth(ly){if(ly&0xf){return ly&0xf}else{return false}}
	function leapMonthDays(ly){if(hasLeapMonth(ly)){return(ly&0xf0000)?30:29}else{return 0}}
	function lunarYearDays(ly){var totalDays=0;for(var i=0x8000;i>0x8;i>>=1){var monthDays=(ly&i)?30:29;totalDays+=monthDays;}
	if(hasLeapMonth(ly)){totalDays+=leapMonthDays(ly);}
	return totalDays}
	function lunarYearMonths(ly){var monthArr=[];for(var i=0x8000;i>0x8;i>>=1){monthArr.push((ly&i)?30:29);}
	if(hasLeapMonth(ly)){monthArr.splice(hasLeapMonth(ly),0,leapMonthDays(ly));}
	return monthArr}
	function getTianGan(ly){var tianGanKey=(ly-3)%10;if(tianGanKey===0)tianGanKey=10;return tianGan[tianGanKey-1]}
	function getDiZhi(ly){var diZhiKey=(ly-3)%12;if(diZhiKey===0)diZhiKey=12;return diZhi[diZhiKey-1]}
}


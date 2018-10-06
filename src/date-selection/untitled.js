
function howManyDayInYear (datestring,par){
	var date = new Date(datestring)
	var month = date.getMonth()
	var howmanyday=0,endofmonth=0,endofyear=0,endday=0,daynum=0
	for (var i = 0; i < 12; i++) {
		daynum = daynum + monthHowDay(date.setMonth(i))
		if (i==month){
			endofmonth = monthHowDay(date.setMonth(i))-date.getDate() //当月剩余天数
			howmanyday= daynum-endofmonth //今天是今年的第几天
		}
		if(i>month){
			endday= endday + monthHowDay(date.setMonth(i)) 
		}
	}
	endofyear = endday + endofmonth //今年剩余天数

	console.log ( 
		"今天是今年的第几天:" + howmanyday + 
		"今天是今年的第几周:" + Math.ceil((howmanyday/7)) + 
		"今年剩余天数:" + endofyear +
		"当月剩余天数:" + endofmonth +
		"今年的总天数："+daynum 
	 )
	if (par==="howmanyday") { return howmanyday }
	else if (par==="howmanyweek") { return Math.ceil((howmanyday/7)) }
	else if (par==="endofyear") { return endofyear }
	else if (par==="endofmonth") { return endofmonth }
	else { return daynum }
	
}
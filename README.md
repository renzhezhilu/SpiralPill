### Testing...    
```javascript
var mongoose = require('mongoose');  
mongoose.connect('mongodb://localhost/test');  
mongoose.Promise = global.Promise;  
//创建一个模型（设计数据库）  
var Cat = mongoose.model('Cat', { name: String,other:Number });  
var kitty = new Cat({ name: '喵喵',other:'123',fer:             {color:'blue',shuzu:[1,2,3,4,5]}})  
// 持久化保存 kitty 实例  
{nnnn:123}.save(function (err) {  
if (err) {  
console.log(err);  
} else {  
console.log('meow');  
}  
}); 
```
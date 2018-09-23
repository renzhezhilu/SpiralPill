
<!-- * [横线](#横线) -->
## 功能
* 双击全选
* 表头固定
~~~
用transform的translateY属性可以轻松实现，但是
ie9下<tr> -transform:translateY(10px); 完全无效，改成复制一份表头，用<table>包起来，再做position: absolute; scroll事件改top实现，wcnmgb ie
~~~
* 排序
    * 按数字
    * 按时间
    * 按名字
* 转格式
	* json
	* csv
* 分页
* 搜索

## 限制
* 必须按有表头<tr><th></th>...</tr>

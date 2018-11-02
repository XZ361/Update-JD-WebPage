# Update-JD-WebPage
用原生js封装模块技术实现京东移动端首页的顶部搜索+轮播图效果和定时器功能<br/>
==
主要用js原生技术实现顶部搜索栏的透明效果，和轮播图以及定时器效果<br/>
--
实现的页面效果如下：<br/>
![image](https://github.com/wangxiaozhan/Update-JD-WebPage/tree/master/images/01.png)   ![image](https://github.com/wangxiaozhan/Update-JD-WebPage/tree/master/images/02.png)      ![image](https://github.com/wangxiaozhan/Update-JD-WebPage/tree/master/images/03.png)<br/>
主要方法：<br/>
1：原生js 封装函数模块调用<br/>
2：引用外部插件<br/>
文件结构如下：<br/>
│  category.html          移动端分类页  <br/>
│  index.html              首页 <br/>
├─css             <br/>
│      base.css             基本样式<br/>
│      category.css           分类页样式<br/>
│      index.css            < br/>
├─images            <br/>
└─js                      <br/>
        category.js                 业务逻辑=》调用了Iscroll插件<br/>
        index.js                        通过原生js封装对应的函数模块来实现相应的效果，如轮播图函数banner(),然后再加载页面是进行调用<br/>
        iscroll.js                滚动插件<br/>

/*业务逻辑*/
window.onload = function () {
    /*1.顶部搜索*/
    search();
    /*2.轮播图*/
    banner();
    /*1.倒计时*/
    downTime();
};
var search = function () {
    /*1.默认固定顶部，并且透明背景*/
    var searchBox=document.querySelector('.jd_search_box');
    var banner=document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    /*监听页面的滚动*/
    window.onscroll = function () {
        /*两种获取滑动高度的方式*/
        // var scrollTop = window.pageYOffset;
        var scrollTop = document.documentElement.scrollTop;
        /*默認的透明度*/
        var opacity = 0;
        if (scrollTop < height) {
            /*2.当页面发生滚动时，--随着卷曲高度的变大，透明度变大*/
            opacity = scrollTop / height * 0.85;
        } else {
            /*2.当页面发生滚动时，--超过某一个高度时，透明度不变*/
            opacity = 0.85;

        }
        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';
    };
};
var banner = function () {
    /*1.自动轮播且无缝     定时器，过渡*/
    /*2.点要随着图片的轮播而改变    根据索引切换*/
    /*3.滑动效果    利用youch事件完成*/
    /*4.滑动结束时，若滑动距离不超过屏幕的三分之一 ，则吸附回去    过渡*/
    /*5.滑动结束时，若滑动距离超过平【屏幕的三分之一，切换（上一章，下一章）  根据滑动的方向，过渡*/

    /*轮播图*/
    var banner = document.querySelector('.jd_banner');
    /*屏幕宽度*/
    var width = banner.offsetWidth;
    /*图片容器*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点容器*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');
    /*加过渡*/
    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';

    }
    /*清过渡*/
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }
    /*作位移*/
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        /*兼容*/
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }


    /*程序的核心*/
    var index = 1;
    var timer = setInterval(function () {
        index++;
        /*加过渡*/
        addTransition();
        /*加位移*/
        setTranslateX(-index * width);
    }, 1000);
    /*需要等最后一张动画结束后判断，是否瞬间定位第一张*/
    imageBox.addEventListener('transitionend', function () {
        /*自动滚动的无缝实现方式*/
        if (index >= 9) {
            index = 1;
            /*瞬间定位*/
            /*实现方式：1清过渡*/
            removeTransition();
            /*作位移*/
            setTranslateX(-index * width);
        }
        /*滑动的时候也需要无缝*/
        else if (index <= 0) {
            index = 8;
            /*瞬间定位*/
            /*实现方式：1清过渡*/
            removeTransition();
            /*作位移*/
            setTranslateX(-index * width);

        }
        /*根据索引设置点*/
        /*此时此刻index的取值范围1-8*/
        /*点索引为index-1*/
        setPoint();
    })
    /*设置点的方法*/
    var setPoint = function () {
        /*index1-8*/
        /*清除样式*/
        for (var i = 0; i < points.length; i++) {
            var obj = points[i];
            obj.classList.remove('now');
        }
        /*给对应的点加上样式*/
        points[index - 1].classList.add('now');
    };
    /*绑定事件*/
    var startX;
    var distanceX;
    var isMove=false;
    imageBox.addEventListener('touchstart', function (e) {
        /*当产生触摸点时，清掉定时器*/
        clearInterval(timer);
        /*记录触摸点起始点的x坐标*/
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
        /*记录滑动过程中的x坐标*/
        var moveX = e.touches[0].clientX;
        /*计算位移 有正负方向*/
        distanceX = moveX - startX;
        /*计算目标元素的位移 不用管正负*/
        /*元素将要做的定位=当前定位+手指移动的距离*/
        var translateX = -index * width + distanceX;
        /*滑动---》元素随手指的滑动做位置的改变*/
        /*为了让图片随手指做实时的滑动就得先把原先的过渡动画效果清掉*/
        removeTransition();
        setTranslateX(translateX);
        isMove=true;
    });
    imageBox.addEventListener('touchend',function (e) {
        if(isMove){
            /*要使用移动的距离*/
            if(Math.abs(distanceX)<width/3) {
                /*吸附回去*/
                /*要实现吸附效果，就要先加动画*/
                addTransition();
                /*位移就是当前位移*/
                setTranslateX(-index * width);
            }else {
                /*切换*/
                /*上一章 右滑动*/
                if(distanceX>0){
                    index--;
                }
                /*下一章 左滑动*/
                else{
                    index++;
                }
                addTransition();
                setTranslateX(-index* width);
            }
        }

        /*最好做一次参数的重置*/
        startX=0;
        distanceX=0;
        isMove=false;
        /*滑动结束后加上定时器*/
        /*加之前再做一次清除定时器，防止定时器被多次绑定*/
        clearInterval(timer);
        timer=setInterval(function () {
            index++;
            /*加过渡*/
            addTransition();
            /*加位移*/
            setTranslateX(-index * width);
        },5000);
    })
};
var downTime=function () {
    /*倒计时的时间*/
    var time=2*60*60;
    /*事件盒子*/
    var spans =document.querySelector('.time').querySelectorAll('span');
    /*每一秒区更新显示的时间*/
    var timer=setInterval(function () {
        time--;
        /*时间格式要转换*/
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=time%60;

        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;

        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%20;
        if(time<=0){
            clearInterval(timer);
        }
    },1000);
};
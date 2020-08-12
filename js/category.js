window.onload = function () {
    /*区域滚动效果*/
    /*條件：一个容器的装着一个容器的HTML结构*/
    /*找到大容器*/
    new IScroll(document.querySelector('.jd_cateLeft'), {
        scrollX: false,
        scrollY: true
    });
    new IScroll(document.querySelector('.jd_cateRight'), {
        scrollX: false,
        scrollY: true
    })
};


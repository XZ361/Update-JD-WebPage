window.onload = function () {
    /*區域滾動效果*/
    /*條件：一個容器的裝著一個容器的HTML結構*/
    /*找到大容器*/
    new IScroll(document.querySelector('.jd_cateLeft'),{
        scrollX:false,
        scrollY:true
    });
    new IScroll(document.querySelector('.jd_cateRight'),{
        scrollX:false,
        scrollY:true
    })
};


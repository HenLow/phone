// 查找单个元素
var getElem = function(selector){
    return document.querySelector(selector);
}
// 查找多个元素
var getAllElem = function(selectro,parent){
    parent = parent || document;
    return parent.querySelectorAll(selectro);
}
// 获取Class
var getCls = function(element){
    return element.getAttribute('class');
}
// 增加class
var addCls = function(ele,cls){
    var clsName = ele.className.split(" ");
    var clsNameMap = {};
    for(var i=0; i<clsName.length; i++){
        clsNameMap[clsName[i]] = 1;
    }
    clsNameMap[cls] = 1;
    clsName = [];
    for(k in clsNameMap){
        clsName.push(k);
    }
    ele.className = clsName.join(" ");
}
// 删除某个Class
var removeCls = function(ele,cls){
    var clsName = ele.className.split(' ');
    var clsNameMap = {};
    for(var i=0,len=clsName.length; i<len; i++){
        clsNameMap[clsName[i]] = 1;
    }
    delete clsNameMap[cls];
    clsName = [];
    for(k in clsNameMap){
        clsName.push(k);
    }
    ele.className = clsName.join(' ');
}

// 初始化init
var screenAnimateElements = {
    '.screen-1': [
        '.screen-1__heading',
        '.screen-1__phone',
        '.screen-1__shadow',
    ],
    '.screen-2': [
        '.screen-2__heading',
        '.screen-2__phone',
        '.screen-2__subHeading',
        '.screen-2__point_i_1',
        '.screen-2__point_i_2',
        '.screen-2__point_i_3',
    ],
    '.screen-3': [
        '.screen-3__heading',
        '.screen-3__phone',
        '.screen-3__subHeading',
        '.screen-3__featres',
    ],
    '.screen-4': [
        '.screen-4__heading',
        '.screen-4__subHeading',
        '.screen-4__type-item_i_1',
        '.screen-4__type-item_i_2',
        '.screen-4__type-item_i_3',
        '.screen-4__type-item_i_4',
    ],
    '.screen-5': [
        '.screen-5__heading',
        '.screen-5__subHeading',
        '.screen-5__back',
    ]
}
var setScreenAnimateInit = function (screenCls) {
    var screen = document.querySelector(screenCls); // 获取当前屏元素
    var animateElements = screenAnimateElements[screenCls] //需要设置动画的元素
    for (var i = 0; i < animateElements.length; i++) {
        // 先获取元素
        var element = document.querySelector(animateElements[i]);
        // 元素的默认样式
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
    }
}
// 设置播放动画
var playScreenAnimateDone = function (screenCls){
    var screen = document.querySelector(screenCls); // 获取当前屏元素
    var animateElements = screenAnimateElements[screenCls] //需要设置动画的元素
    for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
    }
}

window.onload = function(){
    for (k in screenAnimateElements) {
        if(k === '.screen-1'){
            continue;
        }
        setScreenAnimateInit(k);
    }
    playScreenAnimateDone('.screen-1');
}

// 滚动到哪播放动画
window.onscroll = function(){
    var top = document.documentElement.scrollTop;
    if(top > 80){
        addCls(getElem('.header'),'header_status_back');
        addCls(getElem('.outline'), 'outline_status_in');
    }else{
        removeCls(getElem('.header'),'header_status_back');
        removeCls(getElem('.outline'), 'outline_status_in');
    }

    if(top < 1){
        playScreenAnimateDone('.screen-1');
        switchNavItemsActive(0);    
        navTip.style.left = 20 + 'px';
    }
    if(top > 700){
        playScreenAnimateDone('.screen-2');
        switchNavItemsActive(1);
        navTip.style.left = (1 * 100) + 20 + 'px';
    }
    if(top > 800*2 -100){
        playScreenAnimateDone('.screen-3');
        switchNavItemsActive(2);
        navTip.style.left = (2 * 100) + 20 + 'px';
    }
    if(top > 800*3 -100){
        playScreenAnimateDone('.screen-4');
        switchNavItemsActive(3);
        navTip.style.left = (3 * 100) + 20 + 'px';
    }
    if(top > 800*4 -100){
        playScreenAnimateDone('.screen-5');
        switchNavItemsActive(4);
        navTip.style.left = (4 * 100) + 20 + 'px';
    }
}

// 导航条点击定位
var navItems = getAllElem('.header__nav-item');
var outLineItems = getAllElem('.outline__item ');
var setNavClick = function(i,lib){
    var item = lib[i];
    item.onclick = function(){
        document.documentElement.scrollTop = i*800;
    }
}

for(var i=0; i<navItems.length; i++){
    setNavClick(i,navItems);
}
for(var i=0; i<outLineItems.length; i++){
    setNavClick(i,outLineItems);
}

// 选定状态
var switchNavItemsActive = function( idx ){
    for(var i=0; i<navItems.length; i++){
        removeCls(navItems[i],'header__nav-item_status_active')
    }
    addCls(navItems[idx],'header__nav-item_status_active')
    for(var i=0; i<outLineItems.length; i++){
        removeCls(outLineItems[i], 'outline__item_status_active')
    }
    addCls(outLineItems[idx], 'outline__item_status_active')
}
switchNavItemsActive(0);

// nav滑动条
var navTip = getElem('.header__nav-tip');
var setTip = function(idx,lib){
    lib[idx].onmouseover = function(){
        navTip.style.left = (idx * 100) + 20 + 'px';
    }
    var activeIdx = 0;
    lib[idx].onmouseout = function(){
        for(var i=0; i<lib.length; i++){
            if (getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
                activeIdx = i;
            }
        }
        navTip.style.left = (activeIdx * 100) + 20 + 'px';
    }
}
for(var i=0; i<navItems.length-1; i++){
    setTip(i,navItems);
}
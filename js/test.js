
var screenAnimateElements = {
    '.screen-1' : [
        '.screen-1__heading',
        '.screen-1__phone',
        '.screen-1__shadow',
    ],
    '.screen-2' : [
        '.screen-2__heading',
        '.screen-2__phone',
        '.screen-2__subHeading',
        '.screen-2__point_i_1',
        '.screen-2__point_i_2',
        '.screen-2__point_i_3',
    ],
    '.screen-3' : [
        '.screen-3__heading',
        '.screen-3__phone',
        '.screen-3__subHeading',
        '.screen-3__featres',
    ],
    '.screen-4' : [
        '.screen-4__heading',
        '.screen-4__subHeading',
        '.screen-4__type-item_i_1',
        '.screen-4__type-item_i_2',
        '.screen-4__type-item_i_3',
        '.screen-4__type-item_i_4',
    ],
    '.screen-5' : [
        '.screen-5__heading',
        '.screen-5__subHeading',
        '.screen-5__back',
    ]
}

function setScreenAnimate(screenCls){
    var screen = document. querySelector(screenCls); // 获取当前屏元素
    var animateElements = screenAnimateElements[screenCls]//需要设置动画的元素

    var isSetAnimateClass = false; // 是否有初始化子元素的样式
    var isAnimateDone = false; // 是否是完成状态
    screen.onclick = function(){
        // 初始化样式,增加init
        if(isSetAnimateClass === false){
            for(var i=0; i<animateElements.length; i++){
                // 先获取元素
                var element = document.querySelector(animateElements[i]);
                // 元素的默认样式
                var baseCls = element.getAttribute('class');
                element.setAttribute('class',baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
            }
            isSetAnimateClass = true;
            return;
        }
        // 切换所有animateElements 的init-> done
        if(isAnimateDone === false){
            for(var i=0; i<animateElements.length; i++){
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute('class');
                element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
            }
            isAnimateDone = true;
            return;
        }
        // 切换所有animateElements 的 done -> init
        if(isAnimateDone === true){
            for(var i=0; i<animateElements.length; i++){
            var element = document.querySelector(animateElements[i]);
            var baseCls = element.getAttribute('class');                
            element.setAttribute('class',baseCls.replace('_animate_done','_animate_init'));
            }
            isAnimateDone = false;
            return;
        }
    }
}

for (k in screenAnimateElements){
    setScreenAnimate(k);
}
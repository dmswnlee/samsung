//main2.js

window.onload = function(){
    /* 주메뉴 */

    var gnbMenu = document.querySelectorAll('.gnb>ul>li'); 
    var headerWrap = document.querySelector(".header_wrap"); 
    console.log(gnbMenu);

    for(var i=0; i<gnbMenu.length; i++){
        gnbMenu[i].addEventListener('mouseover',function(){
            this.className += 'on'; 
            var ht = this.children[1].offsetHeight; 
            headerWrap.style.height = 70 + ht + 'px';
        });

        gnbMenu[i].addEventListener('mouseout',function(){
            this.classList.remove('on'); // on 제거 
            headerWrap.style.height = '70px';
        });   
    }

    /* 검색 */
    var srchBtn = document.querySelector('.btn_srch');
    var srchCloseBtn = document.querySelector('.btn_srch_close');
    var srchWrap = document.querySelector('.srch_wrap');

    srchBtn.addEventListener("click",function(){
        srchWrap.className += ' on'
    });

    srchCloseBtn.addEventListener("click",function(){
        srchWrap.classList.remove('on');
    });

    /* 오토배너 */
    var btnNext = document.querySelector('.btn_next');
    var btn_prev = document.querySelector('.btn_prev');
    var slide = document.querySelectorAll('.slide');
    var slideRoll = document.querySelectorAll('.slide_roll li');
    var btnPlay = document.querySelector('.btn_play');

    var bnnNum = 0;
    var lastNum = document.querySelectorAll('.slide_wrap > li').length -1;

    // next 버튼
    btnNext.addEventListener("click",function(){
        bnnNum++;
        if(bnnNum > lastNum) bnnNum = 0;

        slide.forEach(function(item){ 
            item.classList.remove('active');
        });
        slide[bnnNum].classList.add('active');

        slideRoll.forEach(function(idx){
            idx.classList.remove('on')
        });
        slideRoll[bnnNum].classList.add('on');
    });

    // prev 버튼
    btn_prev.addEventListener("click",function(){
        bnnNum--;
        if(bnnNum < 0) bnnNum = lastNum;

        slide.forEach(function(item){ 
            item.classList.remove('active');
        });
        slide[bnnNum].classList.add('active');

        slideRoll.forEach(function(idx){
            idx.classList.remove('on')
        });
        slideRoll[bnnNum].classList.add('on');
    });

    // 오토배너
    function autoBanner(){
        bnnNum++;
        if(bnnNum > lastNum) bnnNum = 0;

        slide.forEach(function(item){ 
            item.classList.remove('active');
        });
        slide[bnnNum].classList.add('active');

        slideRoll.forEach(function(idx){
            idx.classList.remove('on')
        });
        slideRoll[bnnNum].classList.add('on');
    }
    var autoBnn = setInterval(autoBanner,5000);

    // 배너 재생/멈춤 버튼
    var flag = true;
    btnPlay.addEventListener("click",function(){
        if(flag){
            clearInterval(autoBnn);
            this.classList.add('on');
            flag = false;
        }else{
            autoBnn = setInterval(autoBanner,5000);
            this.classList.remove('on');
            flag = true;
        }
    });

    // 롤링버튼

    slideRoll.forEach(function(item){ 
        item.addEventListener("click",rollAction);
    });

    function rollAction(item){
        curRoll = item.currentTarget; 
        parentRoll = curRoll.parentElement; 
        childRoll = parentRoll.children; 
        curIdx = Array.from(childRoll).indexOf(curRoll); 

        slide.forEach(function(item){ 
            item.classList.remove('active');
        });
        slide[curIdx].classList.add('active');

        slideRoll.forEach(function(idx){
            idx.classList.remove('on')
        });
        slideRoll[curIdx].classList.add('on');
        bnnNum = curIdx
    }

    /* top 버튼 */
    var btnTop = document.querySelector('.btn_top');

    window.addEventListener('scroll',function(){
        var scroll = document.querySelector('html').scrollTop;

        if(scroll <= 0){
            btnTop.classList.remove("on", "ab");
        }else if(scroll > 0 && scroll < 2700){
            btnTop.classList.remove("ab");
            btnTop.classList.add("on");
        }else{
            btnTop.classList.add("ab");
        }
    });

    btnTop.addEventListener('click',function(e){
        e.preventDefault();
        window.scroll({
            top: 0,
            left : 0,
            behavior : 'smooth'
        });    
    });

}


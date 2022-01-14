//여기서부터 윈도우 resize 이벤트 발생시 스크롤바 유무(내용길이에 따라)에 따른 상태제어 프로그램
var deviceSize1 = 1024;
var deviceSize2 = 768;

function scrollOX(status) {
    $('html').css({
        overflowY:status //overflowY:status = hidden(스크롤 x) , scroll(스크롤 o)
    })
    var htmlWidth = $('html').width()
    return htmlWidth
}//스크롤바가 있느냐 없느냐 
var scX = scrollOX('hidden') //(스크롤 X)
var scO = scrollOX('scroll') //(스크롤 o)
//console.log(scO, scX) // O, X 는 17px 차이가 생김 항상.
var scD = scX - scO
//console.log(scD)
if (scD>0) {
    deviceSize1 = deviceSize1 - scD
    deviceSize2 = deviceSize2 - scD
}
//여기까지 윈도우 크기 작아지게 하면 17px씩 차이가 생겨 문제나는것을 뭐라하면 이 공식 사용하기
//스크롤바는 윈도우일때만 생겨야 정상, 태블릿, 스마트폰에서는 생기면 안됨 (화면크기 볼 수 있는 곳에서 확인 네모 두개)

function init(){ //초기화 함수 init
    var ww = $(window).width()
    if (ww>=deviceSize1 && !$('html').hasClass('pc')) {
        $('html').addClass('pc').removeClass('tablet mobile') //윈도우 넓이가 1025보다 크거나 같으면 html에 pc라는 class 추가
        $('html').css({
            overflow:'auto'
        }) //opennav에서 overflow;hidden해놔서 auto로 바꾸지 않으면 pc화면으로 갑자기 화면 키우면 스크롤바가 안생김
        $('#header #nav').css({
            position:'absolute', 
            top:'50%', 
            transform:'translateY(-50%)', 
            right:'0', 
            background:'none', 
            left:'unset', 
            overflow:'unset',  //unset = 기존속성 취소, overflow unset할때는 X, Y 붙이면 안먹음
            bottom:'unset'
        })
        $('#header #nav .depth1').css({
            position:'unset',
            top:'unset',
            height:'unset',
            right:'unset',
            width:'unset',
            background:'unset',
            paddingTop:'unset',
        })
        $('#header #nav .depth1 > li > a').next().hide()// display:block 시켜야 하니까 일단 닫기(hide), 대부분 sildetoggle로 열고 닫고 하닌까 hide 대신 slideup 해도 ㄱㅊ
        $('html').scrollTop(0)

    }else if (ww>deviceSize2 && ww<=deviceSize1 && !$('html').hasClass('tablet')) {
        $('html').addClass('tablet').removeClass('pc mobile')
        $('html').css({
            overflow:'auto'
        })
        $('#header #nav').css({
            position:'fixed',
            top:'0px',
            transform:'translateY(0%)',
            right:'0px',
            background:'rgba(0,0,0,0.5)',
            left:'100%',
            bottom:'0px',
            overflowY:'auto',
            overflowX:'hidden'
        })//큰 화면에서 작은 화면으로 돌아오면 nav가 보이는 현상 제거
        $('#header #nav .depth1').css({
            position:'absolute',
            top:'0',
            height:'100%',
            right:'-200px',
            width:'200px',
            background:'#fff',
            paddingTop:'50px',
        })
        $('#header .opennav').removeClass('on')
        $('#header .opennav i').removeClass('fa-times').addClass('fa-bars')
        $('html').scrollTop(0)

    }else if (ww<=deviceSize2 && !$('html').hasClass('mobile')){
        $('html').addClass('mobile').removeClass('tablet pc')
        $('html').css({
            overflow:'auto'
        })
        $('#header #nav').css({
            position:'fixed',
            top:'0px',
            transform:'translateY(0%)',
            right:'0px',
            background:'rgba(0,0,0,0.5)',
            left:'100%',
            bottom:'0px',
            overflowY:'auto',
            overflowX:'hidden'
        })
        $('#header #nav .depth1').css({
            position:'absolute',
            top:'0',
            height:'100%',
            right:'-200px',
            width:'200px',
            background:'#fff',
            paddingTop:'50px',
        })
        $('#header .opennav').removeClass('on')
        $('#header .opennav i').removeClass('fa-times').addClass('fa-bars')
        $('html').scrollTop(0)
    }//console 창 element에서 확인 가능 
}
init()

$(window).on('resize', function(){
    init()
})

$('.search label').on('click', function(){ //돋보기 클릭했을 때 검색창 열고 닫기
    $('.search').toggleClass('on')
})



// click 이벤트는 a 한테 적용
// mouseover 이벤트는 li 한테 적용
$('#header #nav .depth1 > li').on('mouseover mouseout', function(e){ //모바일에서는 click 이벤트 사용, mouseover,out은 pc에서만 사용
    e.preventDefault()
    // $(this).toggleClass('on')
    if ($('html').hasClass('pc')){ // 테블릿, 모바일 화면에서는 depth2 안보이게 설정
        $(this).find('.depth2').stop().slideToggle(200)//.depth2를 열려있으면 닫고, 닫혀있으면 열어라
    }
})

$('#header #nav .depth1 > li > a').on('click', function(e){//모바일에서는 click 이벤트 사용
    e.preventDefault()
    if (! $('#header').hasClass('pc') ) {   // this = 클릭한
    $(this).next().stop().slideToggle(1000) //.stop = 애니메이션 멈춰줘 , depth2 하나씩 보여줘
    $(this).parent().siblings().find('.depth2').hide()//slidetoggle 했으니 slideup 사용하기로 했는데 갑분 hide,,,
    
    }
})


$('#header .opennav').on('click', function(){ //햄버거 클릭했을 때 
    //     $('#nav').animate({
    //         right:'0%'
    //     },300) //display:none을 보이게 하려면 .show(),.css({display:'block'})

    // $('#header').toggleClass('on') //transition 사용할때는 toggleClass 가능, 어차피 클릭하면 사라져야 하니까 위에보다 toggle이 나음
    // if ( !$('#header').hasClass('on') ){ //pc화면 등 아예 보이지 않을때는 depth2 무조건 닫아줘
    //     $('#header #nav .depth1 > li .depth2').hide()
    // }

    if( !$(this).hasClass('on') ) { //on 이 없으면
        $('html').css({
            overflow:'hidden'
        })
        $(this).addClass('on')  //on 붙여줘
        $(this).next().animate({left:0},300)
        // $('body').append('<div class="navOuter"></div>')
        //$('#header #nav').appendTo('.navOuter')
        // $('.navOuter').css({
        //     position:'fixed',
        //     top:0, left:'100%', right:0, bottom:0,
        //     background:'rgba(0,0,0,0.5)',
        //     zIndex:999999
        // }).animate({left:'0'}, 300)
        // $('.navOuter #nav').animate({right:0},300) //진행시간 300, nav박스를 opacity:1하고 오른쪽으로 들어가서 사라져
        $(this).next().find('.depth1').animate({right:0},300)
        $(this).find('i').removeClass('fa-bars').addClass('fa-times')
    
    }else{
        $('html').css({
            overflowY:'auto',
        })
        $(this).removeClass('on') // on 있으면 떼줘
        // $(this).next().animate({right:'-200px'},300, function() { //콜백함수
        //     $(this).css({opacity:0})
        // })
        $(this).next().animate({left:'100%'},300)
        $(this).next().find('.depth1').animate({right:'-200px'},300)
        $(this).next().find('.depth2').hide() //햄버거의 네비게이션에서 depth2찾아서 숨겨줘
        $(this).find('i').removeClass('fa-times').addClass('fa-bars')
    }  
})

// 모바일 화면에서 nav 상단에 고정, 스크롤 내릴때 같이 내려가는거 방지
$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
   if( sct>10) {
       $('#header').css({
           position:'fixed',
           top:0, left:0, 
           width:'100%',
           zIndex:99999,
           background:'#fff'
        })
       //$('#header #nav').css({top:'96px'})
   } else {
    $('#header').css({ //#header의 자식이 가진 .row
        position:'static',
        width:'100%'
    })
    //$('#header #nav').css({top:'123px'})

   }
   
   //위로 올라가는 버튼 만들기
   if (sct>500 && !$('html').hasClass('gotopflag')){ //>500 만 하면 화살표 깜빡거림
        $('html').addClass('gotopflag')
        $('body').append('<div class="gotop"><a href="javascript:;"><i class="fas fa-arrow-alt-circle-up"></i></a></div>')
        $('.gotop').css({
            position:'fixed',
            right:'50px',
            bottom:'50px',
            fontSize:'50px',
            zIndex:9999,
            opacity:'0'
        }).animate({opacity:1},300)

    } else if(sct<=500 && $('html').hasClass('gotopflag')) {
        $('html').removeClass('gotopflag')
        $('.gotop').animate({opacity:0}, 300, function(){
            $(this).remove()
        })
    }
})

//화살표 누르면 scrollTop (맨 위로) 올라감
$('body').on('click', '.gotop', function(){ //$('gotop').on('click', function() ~ 하면 화살표 .gotop은 html에 있는 애가 아닌 우리가 js에서 가공한 애 이기 때문에 적용이 안됨
    $('html').animate({
        scrollTop:0
    }, 500)
})

$('#footer .privacy .fam').on('click', function(){
    $(this).find('ul').slideToggle()
})
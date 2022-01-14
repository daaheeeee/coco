$('.article4 li > div').on('mouseover mouseout', function(){
    $(this).toggleClass('on')
})//돋보기도 보이고, 사진도 커짐 , css에서 .on했던 애들 전부


$('.article4 li > div .zoom > a:first-child').on('click', function(){
    var href = $(this).attr('href')
    var src = $(this).parent().prev().attr('src') // a의 부모 div의 형제인 img지목
    console.log(src)
    $('body').append('<div class="outbox"><div class="inbox"></div></div>') //변수가 안들어가도 되는 부분은 굳이 `` 필요 없음
    $('.inbox').append(`<a href="${href}" target="_blank"><img src="${src}" alt="설명문구"></a>`)
    $('.inbox').append('<button type="button">닫기</button>')
    $('.outbox').css({display:'block'})
    // $('.inbox a').attr({ href:href })
    // $('.inbox img').attr({ src:src }) //a의 src를 변수 src로 변경
    return false    
})
//a:first-child는 돋보기만 지목
// .eq(0) = 2개 a중 1번째 a = .article4 li > div .zoom a:first(:first-child)
// css에 display:none을 block으로 변경 $('.outbox').css({display:'block'})
// 돋보기 누르면 우리가 none한 inbox 사진이 (block)보이게

// $('.outbox button').on('click', function(){
//     $(this).parents('.outbox').css({display:'none'})
// }) 
// html에서 주석처리하고 append를 만드니 닫기 버튼이 안먹혀서 밑에로 변경

$('body').on('click', '.outbox button', function(){
    $('.outbox').remove()
})


$('.cs_board .tabmenu li').on('click', function(){
    $(this).addClass('active')
    .siblings().removeClass('active')
    // == $(this).addClass('active')
    // == $(this).siblings().removeClass('active')
    // console.log($(this).index())
    var index = $(this).index()
    $(this).parent().next().children('div').eq(index).addClass('active')//0번 li 선택하면 eq 1번인 애 선택됨
    .siblings().removeClass('active')
    // $(this).parent().next().children('div').eq(index).siblings().removeClass('active')
})
//클릭받은 애만 불이 켜져야 하기 때문에 toggle X
//siblings : 나를 제외한 나의 모든 형제관계 지목

// // .articel1 슬라이드 구역
// function slideTarget(n) {  // 1, 2, 3
//     // .slideInner의 left값 : -100%, -200%, -300% 
//     var pos = n*(-100)+'%'
//     // console.log(pos)
//     $('.slide-group').animate({left:pos}, 500)
// }


// var count = 0;
// $('.article1 .next').on('click', function(){
//    if (count<2) {
//         count++;
//         $('.article1 .slickdots li').eq(count).addClass('active')
//         $('.article1 .slickdots li').eq(count).siblings().removeClass('active')
//         slideTarget(count)
//    }
// })

// $('.article1 .prev').on('click', function(){
//     if (count>0) {
//         count--;
//         $('.article1 .slickdots li').eq(count).addClass('active')
//         $('.article1 .slickdots li').eq(count).siblings().removeClass('active')
//         slideTarget(count)
//     }
    
// })

// $('.slickdots li button').on('click', function(){
//    $(this).parent().addClass('active')
//    $(this).parent().siblings().removeClass('active')
//     var liIndex = $(this).parent().index()
//     slideTarget(liIndex)
// })

//슬릭슬라이더 플러그인 연결
$('.slide-group').slick({
    autoplay:true,
    autoplaySpeed:1000,
    speed:600,
    dots:true,
    // arrows:false, 화살표 안쓸래
    prevArrow:'<button class="slick-arrow slick-prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow:'<button class="slick-arrow slick-next"><i class="fas fa-angle-right"></i></button>',
    //pauseOnDotsHover:true,
    fade:false,
    vertical: false, /*슬라이드가 가로로 변경, true면 위아래 세로로 올라와서 변경 */
    slidesToShow:1,
    slidesToScroll:1,
    responsive:[{ //슬라이드 화살표 보이지 말기 , 밑줄은 dots:false
        breakpoint:769, //768하면 보임 
        settings:{
            fade:true,
            arrows:false
        }
    }]
})

//슬릭슬라이더 자동재생멈춤 버튼 연결
$('.article1 .plpa').on('click', function(){
    if ( $(this).find('i').hasClass('fa-pause') ) {
        $('.slide-group').slick("slickPause")
        $(this).find('i').removeClass('fa-pause').addClass('fa-play')
    } else {
        $('.slide-group').slick("slickPlay")
        $(this).find('i').removeClass('fa-play').addClass('fa-pause')
    }
})

//product 구역의 p요소의 글자수 제한하기
$('.article4 ul li').each(function(){
    // var text = $(this).find('p').text()
    // var newtext = text.substr(0,40)
    // if (text.length<40){
    //     $(this).find('p').text(newtext)
    // }else{
    //     $(this).find('p').text(newtext+'...')
    // }
    var text = $(this).find('p').text()
    var newtext = text.substr(0,40)
    if (text.length<40){
        let count = 40 - text.length
        for (let i=0; i<=count; i++){
            text += " &nbsp; " //&nbsp; = 스페이스바를 의미하는 엔틱티 코드, "" 안에서 띄어쓰기 필수 안하면 ""까지 단어로 인식
        }
        $(this).find('p').html(text)
    }else{
        $(this).find('p').text(newtext+'...')
    }
})//each = for반복문

var article2Near = $('.article2').offset().top - $(window).height() // 자기자신이 애니메이션 될 부모박스의 offset 구하고 한 화면의 높이 빼주기
var article4Near = $('.article4').offset().top - $(window).height()
$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
    if (sct>10) {
        $('.article2').addClass('on')
    }else { 
        $('.article2').removeClass('on')
    }
    if (sct>article4Near) {
        $('.article4').addClass('on')
    }else { 
        $('.article4').removeClass('on')
    }
})


//동영상 팝업박스
$('.cs_movie .tubewrap img').on('click', function(){
    $('body').append('<div class="youtubeVideoOuter"><div class="youtubeVideoInner"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/h7C3RyiZfYs?controls=1&amp;mute=1&amp;autoplay=1&amp;rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>')
    $('.youtubeVideoOuter').css({
        position:'fixed',
        top:0, left:0, width:'100%', paddingTop:'56.25%',
        //background:'rgba(0,0,0,0.5)',
        zIndex:999999999999
    })
    $('.youtubeVideoInner').css({  //유튜브는 100 : 56.25 비율이 맞춰져야 함
        position:'absolute',
        top:'10%', left:'10%', bottom:'10%', right:'10%',  //부모박스를 fixed시킨 후 자식 박스 만들 때 사방에 50px주면 부모박스의 50px작은  넓이 높이 생김
    })
    $('.youtubeVideoInner').append('<button type="">닫기</button>')
    $('.youtubeVideoInner button').css({
        position:'absolute', top:0, right:0,
    })
})

$('body').on('click', '.youtubeVideoOuter button', function(e){ //.on('click', 'cs_movie의 후손들만 올 수 있는 자리',
    e.preventDefault()
    $('.youtubeVideoOuter').remove()
})//body의 마지막 자식 append로 들어왔으니
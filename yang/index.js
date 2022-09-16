// @ts-nocheck
$(function(){
  game()
})
//第一层是铺满的，第二层在第一层随机抽取，第三层在第二层随机抽取……
var column = 5;
var layerArr1 = []
var layerArr2 = [] 
var layerArr3 = []
var boxSize = 100; //尺寸
var bg = ['1.jpg','2.jpg','3.jpg','4.jpg']
var choosedArry = []
var canRandom = false
var limitRandom = false //避免连续点击
var gameNum = 0 || localStorage.getItem('gameNum')
var boss = false;
function game(){
  layerArr1 = []
  layerArr2 = [] 
  layerArr3 = []
  choosedArry = []
  $('.choosed').empty()
  $('.layer1').find('.box').detach()
  init()
  
}

function init(){
  var num_layer1 = 25;
  var num_layer2 = 2;
  var num_layer3 = 2;
  initLayer1(num_layer1)
  layerArr2 = randomArr(layerArr1,num_layer2,2)
  layerArr3 = randomArr(layerArr2,num_layer3,3)
  console.log(layerArr1)
  console.log(layerArr2)
  render(layerArr1,'#layer1')
  render(layerArr2,'#layer1')
  render(layerArr3,'#layer1')
  covered()
  $('.con').off('click')
  $('.con').on('click','.box', function(e){clickHandle(this)})
  $('.con').on('click','.random', function(e){randomHandle(this)})

}

function initLayer1( num ){
  //i = 列
  for(var i= 0; i < 5; i++){
    for(var j = 0; j < 5; j++){
      var obj = {
        x: (j) % column ,
        y: i,
        z: 1
      }
      layerArr1.push(obj)
    }
  }
}

/**
 * 
 * @param {[]} arr 
 * @param {number} ranNum  
 * @param {number} level 
 * @returns 
 */
function randomArr(arr,ranNum,level){
  
  var hash = {};
  var result = [];
  while(ranNum > 0) {
    var ran = Math.floor(Math.random() * arr.length);
    if (!hash[ran]) {
    hash[ran] = 1;
    result.push(JSON.parse(JSON.stringify(arr[ran])));
    result[result.length-1].z = level
    ranNum--;
    };

  }
  return  result
}
//第一个向左偏移，最后一个向右偏移
function render(arr,container){
  for(var i = 0; i< arr.length; i++){
    let div = $('<div>')
    div.addClass('box')
    div.attr('x', arr[i].x)
    div.attr('y', arr[i].y)
    div.attr('z', arr[i].z)
    div.addClass(`${arr[i].x}-${arr[i].y}-${arr[i].z}`)
    div.css('top', arr[i].y*boxSize+(arr[i].z-1)*boxSize/2+'px')
    if(arr[i].x===0){
      div.css('left',arr[i].x*boxSize-(arr[i].z-1)*boxSize/2+'px') //层级偏移
    }else if(arr[i].x=== 4){
      div.css('left',arr[i].x*boxSize+(arr[i].z-1)*boxSize/2+'px') 
    }else{
      div.css('left',arr[i].x*boxSize+'px') 
    } 
    var randomBg = bg[Math.floor(Math.random()*bg.length)]
    div.attr('bg', randomBg)
    div.css('background','url(./imgs/'+randomBg+')')
    $(container).append(div)
  }
}

function covered(){
  //只有两边覆盖规则为4种情况，中间覆盖规则为正上和上
  $('.box').each((i,e) => {
    let x = $(e).attr('x')*1
    let y = $(e).attr('y')*1
    let z = $(e).attr('z')*1
    let rule1 = $(`.${x}-${y}-${z+1}`) //正上
    let rule2 = $(`.${x+1}-${y}-${z+1}`) //右
    let rule3 = $(`.${x+1}-${y+1}-${z+1}`) //右下
    let rule4 = $(`.${x+1}-${y-1}-${z+1}`) //右上
    let rule5 = $(`.${x}-${y-1}-${z+1}`) //上
    if(x===0){
      if (rule1.length ||  rule5.length) {
        $(e).addClass('disabled')
      }else{
        $(e).removeClass('disabled')
      }
    }else if(x===4){
      if (rule1.length ||rule4.length || rule5.length) {
        $(e).addClass('disabled')
      }else{
        $(e).removeClass('disabled')
      }
    }else{
      if (rule1.length ||  rule5.length) {
        $(e).addClass('disabled')
      }else{
        $(e).removeClass('disabled')
      }
    }
   
  })
}

function clickHandle(e){
  
  if( !$(e).hasClass('disabled')){
    $(e).remove()
    covered()
    choosedArry.push($(e).attr('bg'))
    console.log(choosedArry)
    if(choosedArry.length>7){
      gameover()
    }
    renderChoosed(choosedArry)
  }
}



function renderChoosed(arr){
  $('.choosed').empty()
  var temp = choosedArry[choosedArry.length-1]
  var count = 0
  for(var i = 0; i< arr.length; i++){
    let div = $('<div>')
    div.addClass('item')
    div.css('background','url(./imgs/'+arr[i]+')')
    $('.choosed').append(div)

    //消除逻辑
    if(temp===arr[i]){
      count++
    }else{
      temp = arr[i]
      count = 1
    }
    if(count===3){
      clearAni(i)
    }
  
  }
  checkPass()

}

function gameover(){
  gameNum++
  
  if(gameNum>1){
    var r=confirm("失败这么多次，是否需要氪金一下？");
    if (r==true){
      var money = prompt("请输入充值金额$:","");
      if(money.length>4){
        alert('开启老板模式')
        boss = true
        canRandom = true
        game()

      }else{
        alert('这点钱我很难给你办事啊')
        gameover()
      }
    }else{
       alert('又不要你真花钱，祝你好运！')
       window.location.reload()
    }
  }else{
    alert('GameOver!')
    localStorage.setItem('gameNum',gameNum)
    window.location.reload()
  }
  
}

function clearAni(index){
  //console.log(index)
  choosedArry.splice(index-2,3)
  //console.log(choosedArry)
  setTimeout(function(){
    $('.choosed .item').eq(index).addClass('die')
    $('.choosed .item').eq(index-1).addClass('die')
    $('.choosed .item').eq(index-2).addClass('die')
  },100)
 
}

function randomHandle(e){
  if(!canRandom){
    var token =prompt("这个功能需要口令: 12345","");
    if(token=='上山打老虎'){
      canRandom = true
    }else{
      alert('口令错误')
      return
    }
  }
  if($(e).hasClass('hasImg')){
    $(e).removeClass('hasImg')
    return
  }

  if(!limitRandom){
    limitRandom = true
    var randomBg = boss?choosedArry[choosedArry.length-1]:bg[Math.floor(Math.random()*bg.length)]
    $(e).find('.hole').fadeIn().delay(2000).fadeOut(function(){
      let div = $('<div>')
      div.addClass('box')
      div.css('background','url(./imgs/'+randomBg+')')
      div.attr('bg',randomBg)
      $(e).append(div)
      $(e).addClass('hasImg')
      limitRandom = false
    })
  }

 
 
}

function checkPass(){
  var boxNum = $('.layer1 .box').length;
  var choosedNum =  choosedArry.length;
  console.log(boxNum,choosedNum)
  if(boxNum===0&&choosedNum===0){
    $('body').empty()
    $('body').append('<div class="msg"><h2>午福！</h2><h1> 恭喜通关!!</h1></div>')
    $('body').addClass('success')
  }
}
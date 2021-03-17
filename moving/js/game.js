//game start
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var can, ctx;
var velocity = 5;
var pool = [];
var sx = WIDTH/2;
var sy = HEIGHT/2;
var spriteSize = 40; //绘制帧初始尺寸
var monsterNum = 4; //怪物的数量
var curtain; //帷幕
var lastTime, deltaTime;
var data; //数据层
var dataPass = 1; //官卡
var gameTime = 10; //游戏时间
var img = new Image();
img.src = './img/sprite.png';
var nextPassTimeOut;


// document.body.onload = game;
document.querySelector('.play').addEventListener('click',function(){
  document.querySelector('.cover').style.display = "none";
  game()
})

 function game(){
  lastTime = Date.now();
  init();
  creatObject(monsterNum);
  addRandomPositionObject();//执行1次生产1个
  curtain = new Curtain();
  data = new DataObject();
  loop();

  //点击操作
  can.addEventListener('mousedown',pickHandle)
};

function init(){
  can = document.getElementById('canvas');
  ctx = can.getContext('2d');
  can.width = WIDTH;
  can.height = HEIGHT;

  canBg = document.getElementById('canvasBG');
  ctxBg = canBg.getContext('2d');
  canBg.width = WIDTH;
  canBg.height = HEIGHT;

  
}



//在固定坐标处增加一个随机速度的怪物
function addRandomSpeedObject(){
  pool.push({
    x: sx, //出生坐标x
    y: sy, //出生坐标y
    v:{
      x:velocity * Math.random(), //x方向的速度
      y:velocity * Math.random() //y方向的速度
    },
    growingSize : spriteSize //长大的尺寸
  })
}

//在随机坐标处增加一个静止的怪物
function addRandomPositionObject(){
    pool.push({
    x: randInt(5, WIDTH-45), 
    y: randInt(5, HEIGHT-45), 
    v:{
      x:0, //x方向的速度
      y:0 //y方向的速度
    },
    silent:true,//静止的
    growingSize : spriteSize //长大的尺寸
  })
}

//根据num生成一定数量的怪物
function creatObject(num){
  for(var i = 0; i<num; i++){
     pool.push({
      x: randInt(5, WIDTH-5), //[5, WIDTH-5]
      y: randInt(5, HEIGHT-5),
      v:{
        x:velocity * Math.random(),
        y:velocity * Math.random()
      },
      growingSize: spriteSize,
      showDialogue: false,
      dialogue: "不是我", //对话
      dialogueTime:3000 //对话存在时长
    })
  }
}

function draw(){
  //运动
  for(var i in pool){
    if(pool[i].x < 5 ||  WIDTH - pool[i].x < 5){
      pool[i].v.x *= -1;
    };
     if(pool[i].y < 5 ||  HEIGHT - pool[i].y < 5){
      pool[i].v.y *= -1;
    };
    pool[i].x += pool[i].v.x;
    pool[i].y += pool[i].v.y;

   
    //增长动画
    if(pool[i].toSize){
      if( pool[i].growingSize == pool[i].toSize){
         pool[i].growingSize = pool[i].toSize;
      }else{
         pool[i].growingSize+=1;
      }
      ctx.drawImage(img, pool[i].x, pool[i].y, pool[i].growingSize, pool[i].growingSize);
    }else{
      ctx.drawImage(img, pool[i].x, pool[i].y, spriteSize, spriteSize);
    }
    //显示会话
    if(pool[i].showDialogue){
      ctx.save();
      ctx.font = '14px Verdana';
      ctx.fillText(pool[i].dialogue,  pool[i].x,  pool[i].y);
      ctx.restore();
      //dialogueTime时间后，对话消失
      pool[i].dialogueTime<=0 ? pool[i].showDialogue = false  :  pool[i].dialogueTime-= deltaTime;
    }
    
  }
}

//背景
function drawBackground(){
  ctxBg.fillStyle = 'green';
  ctxBg.fillRect(0, 0, WIDTH, HEIGHT)
}



//开场拉开帷幕动画
var Curtain = function(){
  this.width = WIDTH;
  this.height = HEIGHT;
  this.alpha = 1;
}
Curtain.prototype.play = function(){

  if(this.width>0 || this.alpha > 0){
    this.width < 0 ? 0 : this.width -=15; 
    this.alpha < 0.1 ? 0 : this.alpha -=0.002; 
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,'+ this.alpha+')';
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }
 
}


function loop() {
  var now = Date.now();
  deltaTime = now - lastTime;
  lastTime = now;
  //console.log(deltaTime)
  requestNextAnimationFrame(loop),
  ctx.clearRect(0,0, WIDTH, HEIGHT);
  ctxBg.clearRect(0,0, WIDTH, HEIGHT);
  drawBackground();
  draw();
  curtain.play();
  data.draw();
}


 //window.addEventListener('mousedown',addObject);

//判断点中了怪物
function pickHandle(ev){
  //console.log(ev.clientX,ev.clientY)
  !data.gameOver && pool.forEach(function(e,i){
    var rules =  ev.clientX - e.x < spriteSize &&  ev.clientX - e.x >0 &&   ev.clientY - e.y  >0  &&  ev.clientY - e.y < spriteSize;
    if(rules && e.silent== undefined){
      e.showDialogue = true;//显示对话
    }
    if(rules && e.silent==true){
      //alert('被你找到了')
      e.v.x = 0;
      e.v.y = 0;
      e.toSize  = 80;
      nextPassTimeOut = setTimeout(function(){
        gameReset();//下一关
      },500)
      
    }

  })
}

//下一关重置
function gameReset(){
  monsterNum += 2;
  dataPass += 1;
  pool = [];
  creatObject(monsterNum);
  addRandomPositionObject();
  curtain = new Curtain();
  data = new DataObject();
  clearTimeout(nextPassTimeOut)
}



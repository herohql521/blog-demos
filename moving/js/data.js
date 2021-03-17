function DataObject(){
	this.pass = dataPass; //关卡
	this.alpha = 0;
	this.time = gameTime;
	this.interval = 1000; //1s
	this.countTimer = 0;
}

DataObject.prototype.reset = function(){
	this.alpha = 0;
	this.time = 30;
	this.gameOver = false;
}

DataObject.prototype.draw = function(){
	this.calcTime();
	ctx.save();
	ctx.shadowBlur = 10;
	ctx.shadowColor = "white";
	ctx.fillStyle = "white";
	ctx.font = "18px Verdana";
	ctx.textAlign = "center";
	ctx.fillText("第 " + this.pass + " 关"+"   "+"剩余:" + this.time + "秒", WIDTH*0.5, HEIGHT-30);
	//ctx.fillText("剩余:" + this.time + "秒", WIDTH*0.5+120, HEIGHT-30);

	if(this.gameOver){
		this.alpha +=   0.008;
		if(this.alpha > 1){

			this.alpha = 1;
		}
		ctx.font = "32px Verdana";
		ctx.fillStyle = "rgba(0,0,0,"+ this.alpha/2 +")";
		ctx.fillRect(0,0,WIDTH,WIDTH);
		ctx.fillStyle = "rgba(255,255,255,"+ this.alpha +")";
		ctx.fillText("GAMEOVER",WIDTH*0.5, HEIGHT*0.5);
	}
	ctx.restore();
}

//倒计时计算
DataObject.prototype.calcTime = function(){
	if(!this.gameOver){
		this.countTimer += deltaTime;
		//console.log(this.countTimer)
		if(this.countTimer>= this.interval && this.time >0){
			this.time -= 1;
			this.countTimer %= this.interval;
		}
		if(this.time == 0){
			this.gameOver = true
		}
	}
	

}

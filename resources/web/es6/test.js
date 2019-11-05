/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com=require('./common');
  	
  class  EventEmitter  {
	 /*  功能实现  */
    constructor(){
        this.eventPool = {};
    }
    //移除
    off(topicName){
        delete this.eventPool[topicName]
    }
    //发布
    emit(topicName,...args){
        this.eventPool[topicName]&&
        this.eventPool[topicName].forEach(callback => {
            callback(...args)
        });
    }
    //订阅
    on(topicName,callback){
        let topic = this.eventPool[topicName]
        if(!topic){
            this.eventPool[topicName] = []
        }
        this.eventPool[topicName].push(callback)
    }
}
const event  = new EventEmitter()
event .on('abc',(e)=>{
	console.log('第二题：发布订阅的abc事件,参数值为'+e)
})
event .emit('abc','456')

  	
  
});
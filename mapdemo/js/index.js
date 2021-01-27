// 百度地图API功能
var map = new BMap.Map("mapBox");    // 创建Map实例
map.centerAndZoom(new BMap.Point(121.477558,37.453041), 13);  // 初始化地图,设置中心点坐标和地图级别
 
map.setCurrentCity("烟台");      // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

var data = {
	points:[
		{
			areaName:'芝罘区',
			areaCoordinate:[121.402514,37.544254],
			builds:[{
				buildName:'新世界花园',
				coordinate:[121.360006,37.570026],
				price:'0.9万/平'
			},{
				buildName:'德蚨家园',
				coordinate:[121.371612,37.559347],
				price:'1.4万/平'
			}]
		},{
			areaName:'莱山区',
			areaCoordinate:[121.437008,37.523371],
			builds:[{
				buildName:'万科翡翠大道',
				coordinate:[121.477558,37.453041],
				price:'1.3万/平'
			},{
				buildName:'绿色家园',
				coordinate:[121.432249,37.45662],
				price:'1.2万/平'
			}]
		},{
			areaName:'高新区',
			areaCoordinate:[121.485069,37.45525],
			builds:[{
				buildName:'中海国际社区',
				coordinate:[121.491978,37.448803],
				price:'1.2万/平'
			},{
				buildName:'力高阳光海岸',
				coordinate:[121.533557,37.448678],
				price:'1.1万/平'
			},{
				buildName:'福地隆城',
				coordinate:[121.479483,37.455211],
				price:'1.1万/平'
			},{
				buildName:'金海名园',
				coordinate:[121.484557,37.455137],
				price:'1.1万/平'
			},{
				buildName:'澜怡园小区',
				coordinate:[121.487485,37.456182],
				price:'1.1万/平'
			},{
				buildName:'中海·紫御公馆',
				coordinate:[121.49829,37.455759],
				price:'1.1万/平'
			}]
		}
	]
}

// 区域覆盖物
function areaOverlay(point, areaName,num){
  this._point = point;
  this._areaName = areaName;
  this._num = num;
}
areaOverlay.prototype = new BMap.Overlay();
areaOverlay.prototype.initialize = function(map){
  this._map = map;
  var div = this._div = document.createElement("div");
  div.className = 'area_circle';
  div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
  
  var span = this._span = document.createElement("span");
  div.appendChild(span);
  span.appendChild(document.createTextNode(this._areaName));
  var span2 = this._span2 = document.createElement("span");
  div.appendChild(span2);
  span2.appendChild(document.createTextNode(this._num+'个'));         
  var that = this;
  div.addEventListener('touchstart',function(){
  	$(this).addClass('cur');
  }) 


  map.getPanes().labelPane.appendChild(div);
  
  return div;
}

areaOverlay.prototype.draw = function(){
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = pixel.x  + "px";
  this._div.style.top  = pixel.y - 30 + "px";
}

//生成区级范围的覆盖物
function buildAreaCircle(){
	var areaData = data.points;
	for(var i=0; i<areaData.length; i++){
		var OverlayObj = new areaOverlay(new BMap.Point(areaData[i].areaCoordinate[0],areaData[i].areaCoordinate[1]),areaData[i].areaName,areaData[i].builds.length);
		map.addOverlay(OverlayObj);
	}
}
buildAreaCircle();

//小区覆盖物
function houseOverlay(point, text, mouseoverText){
  this._point = point;
  this._text = text;
  this._overText = mouseoverText;
}
houseOverlay.prototype = new BMap.Overlay();
houseOverlay.prototype.initialize = function(map){
  this._map = map;
  var div = this._div = document.createElement("div");
  div.className = 'house_info';
  div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
  var span = this._span = document.createElement("span");
  div.appendChild(span);
  span.appendChild(document.createTextNode(this._text));      
  var that = this;

  div.addEventListener('touchstart',function(){
  	$(this).addClass('cur');
  	this.getElementsByTagName("span")[0].innerHTML = that._overText;
  }) 
 

  map.getPanes().labelPane.appendChild(div);
  
  return div;
}
houseOverlay.prototype.draw = function(){
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = pixel.x  + "px";
  this._div.style.top  = pixel.y - 30 + "px";
}

//生成小区覆盖物
function buildHouseInfo(){
	var areaData = data.points;
	for(var i=0; i<areaData.length; i++){
		for(var j=0; j<areaData[i].builds.length; j++){
			var OverlayObj = new houseOverlay(new BMap.Point(areaData[i].builds[j].coordinate[0], areaData[i].builds[j].coordinate[1]), areaData[i].builds[j].buildName, areaData[i].builds[j].buildName+areaData[i].builds[j].price);
				map.addOverlay(OverlayObj);
		}
	}
}





var historyZoom = 13;
map.addEventListener('zoomend', function () {
  // 打印出当前缩放值
  console.log(map.getZoom());
  
  if(map.getZoom()>=15&&historyZoom<15){
  	map.clearOverlays();
  	console.log('xiaohui')
  	buildHouseInfo()
  	
  }else if(map.getZoom()<15&&historyZoom>=15){
  	map.clearOverlays();
  	console.log('xiaohui')
		buildAreaCircle()
  }

  historyZoom = map.getZoom();
})
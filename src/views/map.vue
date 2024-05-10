<script>
import { ref , defineComponent , createApp , onMounted} from 'vue';
import 'leaflet/dist/leaflet.css'
import L, { CRS } from 'leaflet'
import imageUrl from '../img/Map.jpg'
import Introducation from './introducation.vue';


export default {

    components:{
      Introducation
    },

    mounted() {
    const map = L.map('map',{crs :L.CRS.Simple}).setView([40.740194, -74.166242], 13)
    map.setMinZoom(13);
    //放图片
    var imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
    L.imageOverlay(imageUrl, imageBounds).addTo(map);
    //展台
    var Booth1 = L.divIcon({
        html:  '<div></div>',
        className: 'Booth', 
        
      });
    L.marker([40.733643, -74.166403], {
        icon: Booth1}).addTo(map);
    //边界设定
    var southWest = L.latLng(40.712646, -74.226258),
        northEast = L.latLng(40.774048, -74.125692);
    var bounds = L.latLngBounds(southWest, northEast);
    
    // 将maxBounds添加到地图上
    map.setMaxBounds(bounds);



    // 图标修改定位时用，点击地图获取坐标
    var popup = L.popup();

      function onMapClick(e) {
          popup
              .setLatLng(e.latlng)
              .setContent("You clicked the map at " + e.latlng.toString())
              .openOn(map);
      }

      map.on('click', onMapClick);
  }
    
}

// 以下是websocket+短点重连
const booth = ref({
    minutes: '',
    count: '',
    cardCover: ''
})
//修改路径
var wsUrl ="ws://" + window.location.host + "/webSocket";
var lockReconnect = false;
var ws;
var tt;
function createWebSocket() {
	try {
    	ws = new WebSocket(wsUrl);
    	init();
	} catch(e) {
    	console.log('catch' + e);
    	reconnect();
	}
}
function init() {
	ws.onclose = function (e) {
		console.log('链接关闭' + e.code + new Date().getTime());
		if (e.code != 1006){
			reconnect();
		}
	};
	ws.onerror = function(e) {
	    console.log('发生异常了' + new Date().getTime());
	};
	ws.onopen = function (e) {
		console.log('连接成功' + new Date().getTime());
	};
	ws.onmessage = function (e) {
	    console.log('接收到消息' + e.data + new Date().getTime());
        var msg = JSON.parse(e.data);
        //修改数据路径
        booth.value.one = msg.
        booth.value.tow = msg.
        booth.value.three = msg.
        booth.value.four = msg
	}
}
//断点重连
function reconnect() {
	if(lockReconnect) {
    	return;
    };
    lockReconnect = true;
    tt && clearTimeout(tt);
    tt = setTimeout(function () {
    	createWebSocket();
    	lockReconnect = false;
    }, 2000);
}


</script>

<template>
    <div>
        <!-- 地图 -->
        <div id="map" class="map"></div>
        <!-- 这是下面的走马灯 -->
        <div class="block">
          <el-carousel trigger="click" height="167px" >
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 简介卡片 -->
        <div>
          <Introducation></Introducation>
        </div>
    </div>
    
</template>

<style>
#map { height: 500px; }

.map{
  position: relative;
  z-index: 1;
}

.block{
  position: absolute;
  z-index: 2;
  bottom: 0px;
  width: 100%;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 167px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .Booth{
        /*设置相对定位模式 作为绝地定位元素的父元素*/
    text-align: center;
        /*定义元素大小、外形*/
		display: block;
		border-radius: 100%;
		width: 40px !important;
		height: 40px !important;
 
        /*设置元素阴影*/
		filter: drop-shadow(0 2px 4px #000000a3);
 
        /*设置元素背景图样式*/
    background-color: #ffffff;
		/* background-image: linear-gradient(0deg, red, #ff8484); */
 
        /*设置元素动画效果*/
		animation: jump infinite 2s ease;
	}
  .Booth::before{
		content: '';
        /*绝对定位元素*/
		position: absolute;
 
        /*设置元素位置*/
		bottom: 0;
		left: 50%;
 
        /*设置元素层级关系,和走马灯一个层级*/
		z-index: -2;
 
        /*定义元素大小、背景色*/
		display: block;
		margin-left: -5px;
		width: 10px;
		height: 10px;
		background-color: #ffffff;
 
        /*设置X轴缩放比例、旋转图形、调整Y轴位置*/
		transform: scaleX(1.3) translateY(2px) rotate(45deg)
	}
  .my-div-icon{
    background-color: #475669;
    height: 50px;
    width: 50px;
  }
  .leaflet-div-icon{
    width: 50px;
    height: 50px;
  }
    </style>
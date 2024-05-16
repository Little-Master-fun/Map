<script>
import { onMounted } from "vue";
import leaflet  from "leaflet";
import imgUrl from './icon/sdu.jpg'
import axios from "axios"
export default {
    name: "maps"
}
</script>

<script setup>

        const list = getItem();
        const ws = useWebSocket(handleMessage);

        onMounted(() => {
            var map
            map = leaflet.map('map', {
                crs: leaflet.CRS.Simple
            }).setView([0, -40], 2);
            var imageUrl = imgUrl,
                imageBounds = [[-108, -154.7], [108, 154.7]];
            leaflet.imageOverlay(imageUrl, imageBounds,{zIndex: 0}).addTo(map)
            var myIcon = leaflet.divIcon({
                className: 'my-div-icon',
                html: '<div style="width: 30px; height: 30px; background-color: white;"></div>'
            });
            leaflet.marker([50, 30], {icon: myIcon}).addTo(map);
        });

        function getItem(){
            var list
            axios({
                method: "get",
                url: "https://api.booth-map-202405.0nline.tech/get_booths/"
            }).then(
                res =>{
                    console.log(res)
                    list = res.data
                }
            )

            return list
        }


        function useWebSocket(handleMessage){
            // 这个url还没定，webSocket还没有经过测试
            const ws = new WebSocket("wss://api.booth-map-202405.0nline.tech/ws");

            const init = () => {
                change();
            }

            function change (){
                ws.addEventListener('open', handleOpen, false);
                ws.addEventListener('close', handleClose, false);
                ws.addEventListener('error', handleError, false);
                ws.addEventListener('message', handleMessage, false);
            }

            function handleOpen(e){
                console.log("Websocket open", e)
            }

            function handleClose(e){
                console.log("Websocket closed", e)
            }

            function handleError(e){
                console.log("Websocket error", e)
            }

            init();

            return ws
        }

        function handleMessage(msg){
            console.log(msg)
        }

</script>

<template>
    <div id="map"></div>
    <div class="card">
        <!-- <div v-for="item in list">
            <img src="item.url" alt="">
            <p>{{ item.name }}</p>
            <p>{{ item.info }}</p>
        </div> -->
    </div>

</template>

<style>
#map {
    height: 100%;
    width: 100%;
}

.card {
    /* 这个zindex不起作用 */
    z-index: 99;
    position: absolute;
    top: 620px;
    left: 37.5px;
    width: 300px;
    height: 100px;
    background-color: white;
    border-radius: 5px;
}
</style>
<!-- 
npm i leaflet -->
<template>
  <div class="hello">
    
    <div>
      <div>
       <router-link to="index">傾斜輪播</router-link>
      </div>
      <div>
       <router-link to="/">首頁</router-link>
      </div>
      <div>
       <router-link to="column">column</router-link>
      </div>
      <div class="swiper-inner">
      <!-- swiper -->
        <swiper :options="swiperOption">
          <swiper-slide>Slide 1</swiper-slide>
          <swiper-slide>Slide 2</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
          <swiper-slide>Slide 4</swiper-slide>
          <swiper-slide>Slide 5</swiper-slide>
          <swiper-slide>Slide 6</swiper-slide>
          <swiper-slide>Slide 7</swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div id="charts">
      <div id="main" :style="{width: '600px', height: '400px'}"></div>
    </div>

    <div class="wrapper">
       <div class="line1"></div>
       <div class="line2"></div>
       <div class="line3"></div>
       <div class="line4"></div>
       <div class="line5"></div>
       <div class="line6"></div>
       <div class="line7"></div>
       <div class="line8"></div>
      <div class="line9"></div>
      <div class="line10"></div>
      <div class="line11"></div>
      <div class="line12"></div>
 </div>

 <div class="d1">
   <img src="../assets/images/loading.png">
 </div>
 <p>loading</p>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import echarts from 'echarts/lib/echarts'
  export default {
    name: 'hello',
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        // msg: '123',
        currentIndex: 0,
        timer: '',
        current: 1,
        showItem: 5,
        allpage: 13,
        swiperOption: {
          pagination: '.swiper-pagination',
          effect: 'cube',
          grabCursor: true,
          autoplay: 2000,
          cube: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94
          }
        }
      }
    },
    mounted () {
      var myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        title: {text: '对数轴示列', left: 'center'},
        tooltip: {trigger: 'item', formatter: '{a} <br/> {b} : {c}'},
        legend: {left: 'left', data: ['2的指数', '3的指数']},
        xAxis: {
          type: 'category',
          name: 'x',
          splitLine: {show: false},
          data: ['一', '二', '三', '四', '五', '六', '七', '八']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'log',
          name: 'y'
        },
        series: [{
          name: '3的指数',
          type: 'line',
          data: [1, 20, 15, 10, 10, 30, 240, 500]
        }, {
          name: '2的指数',
          type: 'line',
          data: [1, 2, 50, 100, 270, 30, 240, 300]
        }, {
          name: '1的指数',
          type: 'line',
          data: [1, 20, 18, 30, 50, 80, 140, 400]
        }]
      })
    },
    methods: {
      default () {
        console.log('default')
      },
      primary () {
        console.log('primary')
      },
      info () {
        console.log('info')
      },
      success () {
        console.log('success')
      },
      warning () {
        console.log('warning')
      },
      danger () {
        console.log('danger')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .swiper-inner {
    position: relative;
    overflow: hidden;
    height: 330px;
    padding: 15px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    background: #eee;
  }
  .swiper-container{
    width: 300px!important;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -150px;
  }

 @-webkit-keyframes loading {
    from {opacity: 1;width:5px;height:20px;}
    to {opacity: 0.25;width:5px;height:20px;}
  }
  .wrapper {
    position: relative;
    top:50%;
    left:50%;
    display: inline-block;
   zoom: 0.3;
 }
 .wrapper div {
   width:3px;
   height:16px;
   background: #a4a2a4;
   position: absolute;
   left: 100%;
   top: 100%;
   opacity: 0;

   -webkit-animation: loading 1.2s linear infinite;
 }
 .wrapper .line1 {-webkit-transform:rotate(0deg) translate(0, -34px); -webkit-animation-delay: 0s;}
 .wrapper .line2 {-webkit-transform:rotate(30deg) translate(0, -34px); -webkit-animation-delay: 0.1s;}
 .wrapper .line3 {-webkit-transform:rotate(60deg) translate(0, -34px); -webkit-animation-delay: 0.2s;}
 .wrapper .line4 {-webkit-transform:rotate(90deg) translate(0, -34px); -webkit-animation-delay: 0.3s;}
 .wrapper .line5 {-webkit-transform:rotate(120deg) translate(0, -34px); -webkit-animation-delay: 0.4s;}
 .wrapper .line6 {-webkit-transform:rotate(150deg) translate(0, -34px); -webkit-animation-delay: 0.5s;}
 .wrapper .line7 {-webkit-transform:rotate(180deg) translate(0, -34px); -webkit-animation-delay: 0.6s;}
 .wrapper .line8 {-webkit-transform:rotate(210deg) translate(0, -34px); -webkit-animation-delay: 0.7s;}
 .wrapper .line9 {-webkit-transform:rotate(240deg) translate(0, -34px); -webkit-animation-delay: 0.8s;}
 .wrapper .line10 {-webkit-transform:rotate(270deg) translate(0, -34px); -webkit-animation-delay: 0.9s;}
 .wrapper .line11 {-webkit-transform:rotate(300deg) translate(0, -34px); -webkit-animation-delay: 1.0s;}
 .wrapper .line12 {-webkit-transform:rotate(330deg) translate(0, -34px); -webkit-animation-delay: 1.1s;}



 .d1 img{
  width: 50px;
  height: 50px;
  animation: xz 2s linear infinite;
 }
 p {
  color: #3EC1FF;
  margin: 10px 0px;
 }
 @keyframes xz {
  0% {
    transform: rotatex(0deg) rotatey(1deg) rotateZ(0deg)
  }
  100% {
    transform: rotatex(0deg) rotatey(1deg) rotateZ(360deg)
  }
 }
</style>

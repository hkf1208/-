<template>
  <div class="hello">
    <div>
      <!-- <md-card-actions v-md-ink-ripple>
        <md-button class="md-icon-button" target="_blank" href="https://github.com/surmon-china/vue-awesome-swiper/blob/master/examples/18-effect-coverflow.vue">
        <md-icon>code</md-icon>
        </md-button>
      </md-card-actions> -->
      <div>
       <router-link to="/">首頁</router-link>
      </div>
      <div>
       <router-link to="cube">3D輪播</router-link>
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
        swiperOption: {
          pagination: '.swiper-pagination',
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          autoplay: 1000,
          coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100, // 倾斜度
            modifier: 1,
            slideShadows: true,
            autoplayDisableOnInteraction: false
          }
        },
        text: {}
      }
    },
    created () {
      var text = this.$route.params.text
      console.log(text)
      this.text = text
      this.instance()
    },
    mounted () {
      var myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        title: {text: '动态数据', subtext: '纯属虚构'},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {
          data: ['最新成交价', '预购队列']
        },
        toolbox: {
          show: true,
          feature: {
            detaView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          data: (function () {
            var now = new Date()
            var res = []
            var len = 10
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
              now = new Date(now - 2000)
            }
            return res
          })()
        }, {
          type: 'category',
          boundaryGap: true,
          data: (function () {
            var res = []
            var len = 10
            while (len--) {
              res.push(len + 1)
            }
            return res
          })()
        }],
        yAxis: [{
          type: 'value',
          scale: true,
          name: '价格',
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }, {
          type: 'value',
          scale: true,
          name: '预购量',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }],
        series: [{
          name: '预购队列',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: (function () {
            var res = []
            var len = 10
            while (len--) {
              res.push(Math.round(Math.random() * 1000))
            }
            return
          })()
        }, {
          name: '最新成交价',
          type: 'line',
          data: (function () {
            var res = []
            var len = 0
            while (len < 10) {
              res.push((Math.random() * 10 + 5).toFixed(1) - 0)
              len++
            }
            return res
          })()
        }]
      })
    },
    methods: {
      instance () {
        setInterval(function () {
          this.axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '')
          var data0 = this.option.series[0].data
          var data1 = this.option.series[1].data
          data0.shift()
          data0.push(Math.round(Math.random() * 1000))
          data1.shift()
          data1.push((Math.random() * 10 + 5).toFixed(1) - 0)
          this.option.xAxis[0].data.shift()
          this.option.xAxis[0].data.push(this.axisData)
          this.option.xAxis[1].data.shift()
          this.option.xAxis[1].data.push(this.app.count++)
          this.myChart.setOption(this.option)
        }, 2100)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .swiper-inner {
    width: 100%;
    height: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
    background: #eee;
  }
  .examples>.example .swiper-container .swiper-slide {
    background: #eee;
    font-size: 38px;
    font-weight: 400;
    display: flex;
    justify-content: center;
  }
</style>

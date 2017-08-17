<template>
  <div class="hello">
    <div>
      <router-link to="index">傾斜輪播</router-link>
    </div>
    <div>
      <router-link to="cube">3D輪播</router-link>
    </div>
    <div>
      <router-link to="column">column</router-link>
    </div>
    <div class="carousel-wrap">
    <!-- //轮播图列表 -->
    <transition-group tag="ul" class='slide-ul' name="list">
      <li v-for="(list,index) in slideList" :key="index" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="go" style="position:absolute;width:100%;height:90%;list-style-type:none">
        <img :src="list.image" style="width:100%;height:100%" :alt="list.desc"/>
        <span style="width: 100%; display: block;height: 50px;z-index: 1000">{{list.desc}}</span>
    </li>
    </transition-group>
    <!-- // 轮播图位置指示 -->
      <div class="carousel-items">
        <span v-for="(item,index) in slideList.length" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
      </div>
    </div>
    
    <!-- 分页 -->
    <div id="page">
      <ul class="pagination">
        <li v-show="current !== 1" @click="current-- && goto(current)"><a href="#">上一页</a></li>
        <li v-for="index in pages" @click="goto(index)" :class="{'active':current === index}" :key="index"><a href="#">{{index}}</a></li>
        <li v-show="allpage !== current && allpage !== 0" @click="current++ && goto(current++)"><a href="#">下一页</a></li>
      </ul>
    </div>
    <!-- 图 -->
    <div id="charts">
      <div id="main" :style="{width: '600px', height: '400px'}"></div>
    </div>
    <div>
      <table cellspacing="0" cellpadding="0">
        <tr @click="aa">
          <td class="t1">aa</td>
          <td>11</td>
        </tr>
        <tr>
          <td>bb</td>
          <td>22</td>
        </tr>
        <tr>
          <td>cc</td>
          <td>33</td>
        </tr>
      </table>
    </div>
    <button id="switch" @click="mySwitch()">点击显示</button>
    <button id="show" @click="myShow()">点击</button>
    <div id="123">
      <div style="width: 200px;height: 100px;background: #eee;align:center">显示内容</div>
    </div>
    <div id="text">
      <div style="width: 200px;height: 100px;background: #eef;align:center">显示的文字</div>
    </div>
    
    <div class="scrollBtn">
      <div class="scroll">
        <span class="scroll1 one"></span>
        <span class="scroll2 two"></span>
        <span class="scroll3 three"></span>  
      </div>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/lines'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/toolbox'
import $ from 'jquery'
export default {
  name: 'hello',
  props: {
    list: {
      type: Array,
      required: true,
      default: [],
      twoWays: true
    },
    height: {
      type: Number,
      default: 44
    },
    canScroll: {
      type: Function
    }
  },
  data () {
    return {
      // msg: '123',
      lastScrollTop: null,
      distance: 44,
      lineTopHeight: 0,
      lineBottomHeight: 0,
      canLoadmore: true,
      previewList: [],
      displayCount: 0,
      slideList: [
        {
          'clickUrl': '#',
          'desc': '1111',
          'image': 'http://dummyimage.com/1745x492/f1d65b'
        },
        {
          'clickUrl': '#',
          'desc': '2222',
          'image': 'http://dummyimage.com/1745x492/40b7ea'
        },
        {
          'clickUrl': '#',
          'desc': '3333',
          'image': 'http://dummyimage.com/1745x492/40b7ea'
        }
      ],
      currentIndex: 0,
      timer: '',
      current: 1,
      showItem: 5,
      allpage: 13
    }
  },
  created () {
    this.timer = setInterval(() => {
      this.autoPlay()
    }, 2000)
  },
  computed: {
    // 分页
    pages () {
      var pag = []
      if (this.current < this.showItem) {
        var i = Math.min(this.showItem, this.allpage)
        while (i) {
          pag.unshift(i--)
        }
      } else {
        var middle = this.current - Math.floor(this.showItem / 2)
        i = this.showItem
        if (middle > (this.allpage - this.showItem)) {
          middle = (this.allpage - this.showItem) + 1
        }
        while (i--) {
          pag.push(middle++)
        }
      }
      return pag
    }
  },
  mounted () {
    this.initDate()
    var myChart = echarts.init(document.getElementById('main'))
    myChart.setOption({
      title: {text: 'ECharts'},
      tooltip: {},
      xAxis: {
        data: ['羊毛衫', '雪纺衫', '裤子', '高跟鞋', '鞋子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'line',
        data: [5, 10, 5, 15, 10]
      }]
    })
  },
  methods: {
    initDate () {
      this._rowInWindow = Math.ceil(this.$el.offsetHeight / this.height)
      this._above = this._rowsInWindow * 2
      this._below = this._rowsInWindow
      this._max = this._rowsInWindow * this.height
    },
    aa () {
      $('.t1').css('color', 'red')
    },
    mySwitch () {
      document.getElementById('switch').style.color = 'red'
      document.getElementById('show').style.color = ''
      document.getElementById('text').style.display = 'none'
      document.getElementById('123').style.display = 'block'
    },
    myShow () {
      document.getElementById('switch').style.color = 'black'
      document.getElementById('show').style.color = 'red'
      document.getElementById('123').style.display = 'none'
      document.getElementById('text').style.display = 'block'
    },
    goto (index) {
      if (index === this.current) return
      this.current = index
    },
    go () {
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 2000)
    },
    stop () {
      clearInterval(this.timer)
      this.timer = null
    },
    change (index) {
      this.currentIndex = index
    },
    autoPlay () {
      this.currentIndex++
      if (this.currentIndex > this.slideList.length - 1) {
        this.currentIndex = 0
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vue-list {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  &:scroll-bar {
    width: 0;
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      text-decoration: none;
      height: 44px;
      font-size: 14px;
      line-height: 3;
      text-align: left;
      padding-left: 15px;
      border-bottom: 1px solid #ddd;
      box-sizing: border-box;
      background: #fff;
      &:.line-top, &:.line-bottom {
        border-bottom: 0;
      }
    }
  }
  .load-more-gif {
    width: 100%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    background: #fff;
    border-top: none;
    color: #48B884;
  }
}
#text {
  display: none;
}
#switch {
  color: red
}
.list-enter-active {
 transition: all 1s ease;
 transform: translateX(0)
}

.list-leave-active {
 transition: all 1s ease;
 transform: translateX(-100%)
}

.list-enter {
 transform: translateX(100%)
}

.list-leave {
 transform: translateX(0)
}
.carousel-wrap {
  position: relative;
  height: 453px;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  /*background: yellow;*/
}
.slide-ul {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.carousel-items {
  position: absolute;
  z-index: 10;
  top: 380px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
  span {
    display: inline-block;
    height: 6px;
    width: 30px;
    margin: 0 3px;
    background: #b2b2b2;
    cursor: pointer;
  }
  .active {
    background: $btn-color;
  }
}
/*分页*/

.pagination {
  position: relative;
}
.pagination li {
  width: 48px;
  height:17px;
  display: inline-block;
  text-decoration: none;
  margin: 0 5px;
  float: left;
}
.pagination li:first-child {
  width: 100px;
}
.pagination li:last-child {
  width: 100px;
}
.pagination li a {
  text-decoration: none;
  padding: .5rem 1rem;
  display: inline-block;
  border: 1px solid #ddd;
  background: #fff;
  color: #0e90D2;
}
.pagination li a:hover {
  background: #eee;
}
.pagination li.active a{
  background: #0E90D2;
  color: #fff;
}
#page {
  margin-bottom: 100px;
}
table{
  width: 300px;
  height: 200px;
}
tr {
  width: 100%;
  height: 50px;
}
td {
  width: 50px;
  border: 1px solid #eee;
}

.scrollBtn {
  width: 100px;
  height: 30px;
  background: yellow;
  border: 1px solid transparent;
}
.scroll {
  width: 19px;
  height: 16px;
  text-align: center;
  font-size: 10px;
  display: inline-block;
  margin: 0!important;
  vertical-align: middle;
  padding: 0!important;


}
.scroll > span {
    background-color: #d9d7d7;
    width: 2px;
    margin: 0 2px 0 2px;
    float: left;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out; 
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
    padding: 0!important;
}
.scroll .one {
  height: 16px;
}
.scroll .two {
  height: 16px;
}
.scroll .three {
  height: 16px;
}
@-webkit-keyframes sk-stretchdelay {
  0%, 40%, 100% {
    -webkit-transform: scaleY(0.4);
    background: #d9d7d7;
  }
  20% {
    -webkit-transform: scaleY(1.0);
    background: #fff;
  }
}
@keyframes sk-stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
    background: #d9d7d7;
  }
  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
    background: #fff;
  }
}
.scroll > .scroll2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.scroll > .scroll3 {
      -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}
</style>

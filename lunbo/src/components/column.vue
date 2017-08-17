<template>
  <div class="hello">
    <div style="width: 200px;background: #f99e1c;border-radius: 10px;">
      <span>dsdfsfs</span>
      <br>
      <span>dsdsf</span>
    </div>
    <div>
      <div>
       <router-link to="index">傾斜輪播</router-link>
      </div>
      <div>
       <router-link to="/">首頁</router-link>
      </div>
      <div>
       <router-link to="cube">3D轮播</router-link>
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
          <swiper-slide>Slide 8</swiper-slide>
          <swiper-slide>Slide 9</swiper-slide>
          <swiper-slide>Slide 10</swiper-slide>
          <swiper-slide>Slide 11</swiper-slide>
          <swiper-slide>Slide 12</swiper-slide>
          <swiper-slide>Slide 13</swiper-slide>
          <swiper-slide>Slide 14</swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <button>aaa</button>
    <div class="wow slideInLeft" data-wow-duration="2s" data-wow-delay="5s"></div>
    <div class="wow slideInRight" data-wow-offset="10"  data-wow-iteration="10"></div>
    <section>
      <ul>
        <li class="bg_gray" id="section-1">
          <div class="container">
            <figure class="wow fadeInLeft" style="visibility:visible;animation-name:fadeInleft;">
              <img width="294" height="524">
            </figure>
          </div>
        </li>
      </ul>
    </section>
    <table width="400" border="0" cellspacing="0" cellpadding="0"> 
<tr> 
<td width="105">站名</td> 
<td width="181">网址</td> 
<td width="112">说明</td> 
</tr> 
<tr> 
<td>DIVCSS5</td> 
<td>www.divcss5.com</td> 
<td>CSS学习</td> 
</tr> 
<tr> 
<td>CSS5</td> 
<td>www.css5.com.cn</td> 
<td>CSS切图</td> 
</tr> 
</table> 
   <!--  <ul v-infinite-scroll='loadMore' infinite-scroll-disabled='loading'  infinite-scroll-distance="10">
      <li v-for='item in list'>{{ item }}</li>
    </ul> -->
    <h1>mint-ui-example</h1>
  <!-- <mt-button
    type="primary"
    @click="sheetVisibles(actions.name)">
    选择操作
  </mt-button> -->
  <mt-actionsheet
    cancel-text=""
    :actions="actions"
    :visible.sync="sheetVisible">
  </mt-actionsheet>
  <div class="ict-item-questionnaire" :disabled="disabled" :class="{'ict-item-disabled': disabled, 'ict-item-active': btnActive}" v-touch:tap="onTop">
    {{title}}
  </div>
  
  <input v-model="example0">
  <input v-model="example1">
  <input v-model="example2.inner0">
  <input v-model="links.text1">
  <input v-model="links.text2">
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { Toast, messageBox } from 'mint-ui'
  // import animate from 'animate.css'
  export default {
    name: 'alert',
    // props: {
    //   disabled: Boolean,
    //   title: String,
    //   order: String,
    //   option: String,
    //   btnActive: Boolean
    // },
    components: {
      swiper,
      swiperSlide
    },
    transitions: {
      bounce: {
        enterClass: 'bounceInLeft',
        leaveClass: 'bounceOutRight'
      }
    },
    data () {
      return {
        example0: '',
        example1: '',
        example2: {
          inner0: 1,
          inner1: 2
        },
        links: {
          text1: 1,
          text2: 2
        },
        showAlert: false,
        loading: false,
        sheetVisible: false,
        actions: [{
          name: '展示 Toast',
          method: this.showToast
        }, {
          name: '展示 messageBox',
          method: this.showMsgbox
        }],
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 3,
          slidesPerColumn: 2,
          paginationClickable: true,
          spaceBetween: 30,
          autoplay: 2000
        },
        list: [],
        wow: {
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 2000,
          mobile: true,
          live: true
        }
      }
    },
    watch: {
      links: {
        handler (newValue, oldValue) {
          console.log(newValue)
        },
        deep: true
      },
      example0 (curVal, oldVal) {
        console.log(curVal, oldVal)
      },
      example1: 'a',
      example2: {
        handler (curVal, oldVal) {
          console.log(curVal, oldVal)
        },
        deep: true
      }
    },
    methods: {
      a (curVal, oldVal) {
        console.log(curVal, oldVal)
      },
      cancel () {
        if (this.cancelBtn) {
          this.cancelBtn.apply(this.context)
        }
        this.close()
      },
      sure () {
        if (this.sureBtn) {
          this.sureBtn.apply(this.context)
        }
        this.close()
      },
      show () {
        this.showAlert = true
      },
      close () {
        this.showAlert = false
      },
      onTop () {
        this.btnActive = !this.btnActive
      },
      sheetVisibles (text) {
        this.$router.push({name: 'index', params: {text: name}})
      },
      showToast () {
        Toast('这是一个Toast')
      },
      showMsgbox () {
        messageBox('提示', '这是一个Message Box')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .alert {
    position: fixed;
    top: 0;
    left: 0;
    rigth: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    z-index: 1000;
    transition: all .3s ease-in-out;
  }
  .warp {
    position: absolute;
    z-index: 1002;
    min-width: 400px;
    background: #fff;
    left: 50%;
    top: 50%;
    transfrom: translate(-50%, -50%);
    border-radius: 4px;
  }
  .head {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #dedede;
    padding-left: 10px;
    color: #333;
  }
  .body {
    text-align: center;
    padding: 40px 20px;
  }
  .foot {
    height: 50px;
    text-align: center;
    button {
      margin-left: 20px;
      &:last-right {
        margin-right: 0;
      }
    }
  }

  .swiper-slide {
    height: 200px;
    background: #eee;
  }
  .swiper-container{
    height: auto!important;
    margin-left: auto;
    margin-right: auto;
  }
  // button{
  //   background: #eee;
  // }
  // button:active{
  //   background: red!important;
  // }
  img {
    background-image: url('../assets/images/1.jpg');
  }
  .ict-item-questionnaire{
    color: #666;
    height: .8rem;
    border-radius: .675rem;
  }
  .ict-item-active{
    color: white;
    background: #00b0f0;
  }
</style>

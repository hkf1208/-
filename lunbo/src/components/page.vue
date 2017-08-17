<template>
  <div class="pagenation">
    <ul>
      <li @click="pre()"><</li>
      <li v-for="item in show_page_numbers" @click="setIndex(item)" :class="{active: item === current_index}">{{item}}</li>

      <li @click="next()">></li>
    </ul>
    <div class="edit-time-components">
      <div class="time-box" v-for="(index, item) in deteList">
        <div class="year-month-box">
          <p v-if="item.switch" class="pre-month" @click="changeYearMonth(item.year, item.month - 1, index)">&lt;</p>
          <div v-if="item.switch" class="year-list-box">
            <div class="year-month">
              <span @click="yearMonthList($event, index, 0)">{{item.year}}年</span>
              <span @click="yearMonthList($event, index, 1)">{{item.month}}月</span>
            </div>
            <ul v-if="showYearList === index" @mousewheel="mousewheel($event)" class="year-list">
              <li v-for="y in 25" @click="changeYearMonth(2000 + y, item.month, index)" class="year-item">{{2000 + y}}</li>
            </ul>
            <ul v-if="showMonthList === index" @mousewheel="mousewheel($event)" class="month-list">
              <li v-for="m in 12" @click="changeYearMonth(item.year, m + 1, index)" class="month-item">{{m + 1}}</li>
            </ul>
          </div>
          <p v-if="!item.switch" class="year-month">{{item.year + '年' + item.month + '月'}}</p>
          <p v-if="item.switch" class="next-month" @click="changeYearMonth(item.year, item.month + 1, index)">&gt;</p>
        </div>
        <ul class="ul-box">
          <li class="li-item week">周日</li>
          <li class="li-item week">周一</li>
          <li class="li-item week">周二</li>
          <li class="li-item week">周三</li>
          <li class="li-item week">周四</li>
          <li class="li-item week">周五</li>
          <li class="li-item week">周六</li>
        </ul>
        <!-- <ul class="ul-box">
          <li class="li-item" v-for="i in item.week"></li>
          <li v-for="i in item.monthDay" id="{{item.id + '=' + (i + 1)}}" class="{{'li-item day' + (isDisable(item.year, item.month, i + 1) ? 'disable' : '')}}" :style="{background: (selected.has(formatDate(item.year, item.month, i + 1)) ? '#5bc0de' : ''), color: (selected.has(formatDate(item.year, item.month, i + 1)) ? '#fff' : '')}" select="{{(selected.has(formatDate(item.year, item.month, i + 1)) ? 'true' : 'false')}}" data-index="{{i + 1}}" @click="detaClick($event, item, i + 1)" @dblclick="dbDateClick($event, item, i + 1)" @mouseover="mouseover(item, i + 1)">{{i + 1}}</li>
        </ul> -->
      </div>
    </div>
  </div>
</template>
<script>
  let DEFAULT_DATELTST = [{
    year: undefined,
    month: undefined,
    multiSelect: true,
    switch: true
  }]
  let DEFAULT_OPTIONS = {
    disable: [],
    selected: [],
    callback: undefined
  }
  export default {
    name: 'pagenation',
    props: {
      current: {
        type: Number,
        default: 1
      },
      total: {
        type: Number
      },
      currentChange: {
        type: Function
      },
      detelist: {
        type: Array,
        required: false,
        default: function () {
          return DEFAULT_DATELTST
        },
        coerce: function (val) {
          return val.length === 0 ? DEFAULT_DATELTST : val
        }
      },
      options: {
        type: Object,
        required: false,
        default: function () {
          return DEFAULT_OPTIONS
        },
        coerce: function (val) {
          val.disable = val.disable || []
          val.selected = val.selected || []
          return val
        }
      }
    },
    data () {
      return {
        show_page_numbers: [],
        item: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        display_limit: 8,
        current_index: this.current,
        detelist: [],
        selected: new Set(),
        isdbclick: false,
        domId: null,
        dbDay: null,
        dom: new Array(33),
        showYearList: null,
        showMonthList: null
      }
    },
    mounted () {
      this.refreshPage()
    },
    methods: {
      refreshPage () {
        this.show_page_numbers = []
        for (let i = 0; i <= this.total; i++) {
          this.show_page_numbers.push(i)
        }
        if (this.total <= this.display_limit) {
          return
        }
        let begin = this.current_index - 3
        let end = this.current_index + 3
        begin = begin <= 1 ? 1 : begin
        end = end <= this.display_limit ? this.display_limit : end
        begin = begin >= this.total - this.display_limit ? this.total - this.display_limit : begin
        end = end >= this.total ? this.total : end
        let arr = this.show_page_numbers.slice(begin - 1, end)
        this.show_page_numbers = arr
      },
      pre () {
        let current = this.current_index
        if (current <= 1) {
          return
        }
        this.setIndex(current - 1)
        console.log(current)
      },
      next () {
        let current = this.current_index
        if (current >= this.total) {
          return
        }
        this.setIndex(current + 1)
        console.log(current)
      },
      setIndex (index) {
        this.current_index = index
        this.refreshPage()
      },
      mousewheel (event) {
        let pNode = event.currentTarget
        let scrollTop = pNode.scrollTop
        let scrollHeight = pNode.scrollHeight
        let height = pNode.clientHeight
        let delta = (event.wheelDelta) ? event.wheelDelta : -(event.detail || 0)
        if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
          pNode.scrollTop = delta > 0 ? 0 : scrollHeight
          event.preventDefault()
        }
      },
      hideList () {
        this.showYearList = null
        this.showMonthList = null
      },
      yearMonthList (event, index, type) {
        event.stopPropagation()
        this.hideList()
        if (type === 0) {
          this.showYearList = index
        } else if (type === 1) {
          this.showMonthList = index
        }
      },
      changeYearMonth (year, month, index) {
        this.isdbclick = false
        this.domId = null
        let date = JSON.parse(JSON.stringify(this.dateList[index]))
        if (month < 1) {
          year -= 1
          month = 12
        } else if (month > 12) {
          year += 1
          month = 1
        }
        date.year = year
        date.month = month
        this.getDayConfig(date)
        this.dateList.$set(index, date)
      },
      isDisable (year, month, day) {
        let date = this.formatDate(year, month, day)
        if (this.options.enable) {
          return this.options.enable.indexOf(date) === -1
        } else {
          return this.options.disable.indexOf(date) !== -1
        }
      },
      formatDate (year, month, day) {
        month = (month + '').length === 2 ? month : '0' + month
        day = (day + '').length === 2 ? day : '0' + day
        return year + '-' + month + '-' + day
      },
      init (options, dateList) {
        this.isdbclick = false
        this.domId = null
        this.dbDay = null
        let tempList = JSON.parse(JSON.stringify(dateList))
        tempList.forEach((item, index) => {
          item.id = index
          item.lastSelect = null
          this.getDayConfig(item)
        })
        this.selected = new Set(options.selected)
        this.dateList = tempList
      },
      getDayConfig (item) {
        let year = item.year || (new Date()).getFullYear()
        let month = item.month || (parseInt((new Date()).getMonth()) + 1)
        let monthDay = (new Date(year, month, 0)).getDate()
        let week = (new Date(year, parseInt(month - 1), 1)).getDay()
        item.year = parseInt(year)
        item.month = parseInt(month)
        item.monthDay = monthDay
        item.week = week
      },
      getdbClickData (item) {
        for (let i = 0; i <= item.monthDay; ++i) {
          let dom = this.dom[i]
          let tMonth = (item.month + '').length === 2 ? item.month : '0' + item.month
          let tDay = (i + '').length === 2 ? i : '0' + i
          let date = item.year + '-' + tMonth + '-' + tDay
          if (dom.style.background !== '') {
            dom.setAttribute('select', 'true')
            this.selected.add(date)
          }
        }
      },
      cleardbClick () {
        for (let i = 1; i <= this.dom.length; i++) {
          let dom = this.dom[i]
          if (!dom) return
          if (dom.getAttribute('select') !== 'true') {
            dom.style.background = ''
            dom.style.color = '#000'
          }
        }
      },
      dateClick (event, item, day) {
        if (this.isDisable(item, item.year, item.month, day)) return
        if (this.isdbclick) {
          if (item.id === this.domId) {
            this.isdbclick = false
            this.getdbClickData(item)
            if (this.options.callback) {
              this.options.callback([...this.selected])
            }
            return
          } else {
            this.cleardbClick()
          }
        }
        this.isdbclick = false
        let date = this.formatDate(item.year, item.month, day)
        if (event.target.getAttribute('select') !== 'true') {
          if (item.multiSelect === false && item.lastSelect) {
            this.selected.delete(this.formatDate(item.year, item.month, item.lastSelect))
            let lastDom = document.getElementById(item.id + '-' + item.lastSelect)
            lastDom.style.background = ''
            lastDom.style.color = '#000'
            lastDom.setAttribute('select', 'false')
          }
          event.target.style.background = '#5bc0de'
          event.target.style.color = '#fff'
          event.target.setAttribute('select', 'true')
          this.selected.add(date)
          item.lastSelect = day
        } else {
          event.target.style.background = ''
          event.target.style.color = '#000'
          event.target.setAttribute('select', 'false')
          this.selected.delete(date)
        }
        if (this.options.callback) {
          this.options.callback([...this.selected])
        }
      },
      dbDateClick (event, item, day) {
        if (item.multiSelect === false) return
        if (this.isDisable(item.year, item.month, day)) return
        event.target.style.background = '#5bc0de'
        event.target.style.color = '#fff'
        let id = item.id
        this.isdbclick = true
        this.dbDay = day
        if (this.domId === id) {
          return
        }
        this.domId = item.id
        let dom = document.getElementById(id + '').getElementsByClassName('day')
        for (let i = 0; i < dom.length; ++i) {
          let item = dom[i]
          this.dom[item.dataset.index] = item
        }
        this.dom[dom.length + 1] = null
      },
      mouseover (item, day) {
        if (!this.isdbclick || !this.dbDay) return
        if (this.domId !== item.id) return
        let left = day > this.dbDay ? this.dbDay : day
        let right = day > this.dbDay ? day : this.dbDay
        for (let i = 1; i <= item.monthDay; ++i) {
          if (this.isDisable(item.year, item.month, i)) continue
          let dom = this.dom[i]
          if (left <= i && i <= right) {
            dom.style.background = '#5bc0de'
            dom.style.color = '#fff'
          } else if (dom.getAttribute('select') !== 'true') {
            dom.style.background = ''
            dom.style.color = '#000'
          }
        }
      }
    },
    watch: {
      detelist: function (val, oldVal) {
        this.init(this.options, val)
      },
      options: {
        handler: function (val, oldVal) {
          this.init(val, this.datelist)
        },
        deep: true
      }
    },
    created () {
      this.init(this.options, this.datelist)
      document.addEventListener('click', this.hideList)
    },
    destroyed () {
      document.removeEventListener('click', this.hideList)
    }
  }
</script>
<style lang="scss" scoped>
  li {
    list-style: none;
    display: inline-block;
    margin: 5px -0.5px;
    border: 1px solid #2c3e50;
    padding: 5px;
    min-width: 30px;
    min-height: 30px;
    line-height: 200%;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
  }
  .active, li:hover {
    background: rgba(65, 182, 131, .5);
    color: #ffffff;
    border-color: rgba(65, 182, 131, .5);
  }
  a {
    display: inline-block;
    color: inherit
  }
  .clearfix {
    clear: both;
  }

  edit-time-components {
    overflow:hidden;
    line-height: normal;
    div, ul, li, p {
      padding: 0;
      margin: 0;
      background: none;
      border: none;
      outline: none;
      user-select: none;
    }
    .year-month-box {
      text-align: center;
      .year-month {
        display: inline-block;
        font-size: 20px;
        color: #7b7777;

        span {
          display: inline-block;
          cursor: pointer;
          &:hover {
            color: #2494f2;
          }
        }
      }
      .year-list-box {
        display: inline-block;
        position: relative;
        .year-list, .month-list {
          position: absolute;
          background: #fff;
          width: 65px;
          height: 200px;
          overflow-y: auto;
          border: 1px solid #ddd;
          left: 0;
          text-align: center;
          .year-item, .month-item {
            cursor: pointer;
            color: #333;
            font-size: 14px;
            padding: 3px 0px;

            &:hover{
              background: #363636;
            }
          }
        }
        .month-list {
          left: initial;
          right: 0;
        }
      }
      .pre-month, .next-month {
        display: inline-block;
        color: #7b7777;
        cursor: pointer;
        transfrom: scaleY(1.5);
        height: 13px;
        line-height: 6px;
        vertical-align: middle;
        padding: 0 5px;
        &:hover {
          color: #2494f2;
        }
      }
    }
    .time-box {
      background: #fff;
      width: 240px;
      text-align: center;
      float: left;
      margin: 5px;
      border: 1px solid #ddd;
      padding: 5px;
      box-sizing: content-box;
      overflow: hidden;
    }
    .li-item {
      display: inline-block;
      float: left;
      width: 34px;
      height: 34px;
      line-height: 34px;
      font-size: 15px;
      text-align: center;
      border-radius: 50%;
    }
    .week {
      color: #b5b5b5;
      padding: 0;
    }
    .day {
      cursor: pointer;
      &:hover {
        background: #ddd;
      }
    }
    .ul-box {
      width: 100%;
    }
    .disable {
      color: rgba(57, 57, 57, .3);
      cursor: not-allowed;
      &:hover {
        background: none;
      }
    }
  }
</style>

<template>
  <section class="notifyapp">
    <!-- header -->
    <header class="header">
      <input class="new-notify" autocomplete="off" placeholder="通知公告" @keyup.enter="addNotify">
    </header>
    <!-- main section -->
    <section class="main" v-show="notifys.length">
      <!--  <input class->="toggle-all" id="toggle-all" type="checkbox" :checked="allChecked" @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all"></label> -->
      <ul class="notify-list">
        <notify @toggleNotify='toggleNotify' @editNotify='editNotify' @deleteNotify='deleteNotify' v-for="(notify, index) in filteredNotifys" :key="index"
          :notify="notify"></notify>
      </ul>
    </section>
  </section>
</template>

<script>
import Notify from './Notify.vue'

const STORAGE_KEY = 'notifys'
const filters = {
  all: notifys => notifys,
  active: notifys => notifys.filter(notify => !notify.done),
  completed: notifys => notifys.filter(notify => notify.done)
}
const defalutList = [
  { text: '工程质量管理平台用户手册', done: false },
  { text: '关于组织工程质量管理平台培训的通知', done: false },
  { text: '关于调整工程质量管理平台的通知', done: false },
  { text: '系统培训会议记录', done: false },
  { text: '关于工程质量管理平台的功能改进', done: false },
  { text: '对系统平台的使用建议', done: true },
  { text: '对系统平台的使用建议', done: true },
  { text: '对系统平台的使用建议', done: true }
]
export default {
  components: { Notify },
  data() {
    return {
      visibility: 'all',
      filters,
      // notifys: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      notifys: defalutList
    }
  },
  computed: {
    allChecked() {
      return this.notifys.every(notify => notify.done)
    },
    filteredNotifys() {
      return filters[this.visibility](this.notifys)
    },
    remaining() {
      return this.notifys.filter(notify => !notify.done).length
    }
  },
  methods: {
    setLocalStorgae() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notifys))
    },
    addNotify(e) {
      const text = e.target.value
      if (text.trim()) {
        this.notifys.push({
          text,
          done: false
        })
        this.setLocalStorgae()
      }
      e.target.value = ''
    },
    toggleNotify(val) {
      val.done = !val.done
      this.setLocalStorgae()
    },
    deleteNotify(notify) {
      this.notifys.splice(this.notifys.indexOf(notify), 1)
      this.setLocalStorgae()
    },
    editNotify({ notify, value }) {
      notify.text = value
      this.setLocalStorgae()
    },
    clearCompleted() {
      this.notifys = this.notifys.filter(notify => !notify.done)
      this.setLocalStorgae()
    },
    toggleAll({ done }) {
      this.notifys.forEach(notify => {
        notify.done = done
        this.setLocalStorgae()
      })
    }
  },
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>

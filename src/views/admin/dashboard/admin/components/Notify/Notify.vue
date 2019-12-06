<template>
  <li class="notify" :class="{ completed: notify.done, editing: editing }">
    <div class="view">
      <input class="toggle"
        type="checkbox"
        :checked="notify.done"
        @change="toggleNotify( notify)">
      <label v-text="notify.text" @dblclick="editing = true"></label>
      <button class="destroy" @click="deleteNotify( notify )"></button>
    </div>
    <input class="edit"
      v-show="editing"
      v-focus="editing"
      :value="notify.text"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit">
  </li>
</template>

<script>
export default {
  name: 'Notify',
  props: ['notify'],
  data() {
    return {
      editing: false
    }
  },
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  methods: {
    deleteNotify(notify) {
      this.$emit('deleteNotify', notify)
    },
    editNotify({ notify, value }) {
      this.$emit('editNotify', { notify, value })
    },
    toggleNotify(notify) {
      this.$emit('toggleNotify', notify)
    },
    doneEdit(e) {
      const value = e.target.value.trim()
      const { notify } = this
      if (!value) {
        this.deleteNotify({
          notify
        })
      } else if (this.editing) {
        this.editNotify({
          notify,
          value
        })
        this.editing = false
      }
    },
    cancelEdit(e) {
      e.target.value = this.notify.text
      this.editing = false
    }
  }
}
</script>

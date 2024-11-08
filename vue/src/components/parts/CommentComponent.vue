<template>
  <div class="comment">
    <p><b>{{ getUserById(comment.userId).username }}</b></p>
    <p class="additional-text">{{ formatDate(comment.date) }} </p>
    <p>{{ comment.content }} </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CommentComponent',
  props: {
    comment: {
      type: Object
    }
  },
  computed: {
    ...mapGetters('users', [
      'getUserById'
    ]),
  },
  methods: {
    formatDate(dateStr) {
      let date = new Date(dateStr)
      let formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString().slice(0, 5)
      return formattedDate
    }
  }
}
</script>

<style lang="less" scoped>
.additional-text {
  color: #7d7d7d;
}
</style>
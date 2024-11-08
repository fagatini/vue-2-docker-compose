<template>
    <form class="comment-form" @submit.prevent="onSubmit">
      <textarea class="comment-form__textarea" v-model="content" ></textarea>
      <br>
      <button class="comment-form__button" type="submit">Сохранить</button>
    </form>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'CommentForm',
  props: {
    recipeId: {
      type: Number,
      required: true
    },
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      content: "",
    }
  },
  computed: {
    ...mapGetters('comments', [
      'getCommentsByRecipeId'
    ]),
    comments() {
      return this.getCommentsByRecipeId(this.recipeId)
    },
  },
  methods: {
    ...mapActions('comments', [
      'addComment',
      'removeComment'
    ]),
    onSubmit() {
      if (!this.content) {
        return
      } 
      {
        let comment = {
          id: this.comments.length + 1,
          recipeId: this.recipeId,
          userId: this.userId,
          content: this.content,
          date: new Date()
        }
        this.addComment(comment)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .comment-form {

    &__textarea {
      resize: none;
      font-size: medium;
      width: 70%;
      padding: 10px 10px 10px 10px;
      height: 120px;
      overflow-y: scroll;
      background-color: #ECECEC;
      border-radius: 8px;
      border-style: none;
    }

    &__button {
      background: #ECECEC;
      color: #7d7d7d;
      font-size: medium;
      font-weight: bold;
      border-radius: 25px;
      border: none;
      padding: 8px 32px 3px 32px;
      margin-top: 10px;
      width: fit-content;
      height: 40px;
    }

    &__button:hover {
      background-color: #d6d6d6;
      color: #555555;
    }
  }
</style>
<template>
    <div class="add-ingredient">
      <form class="add-ingredient__form">
        <label class="add-ingredient__label">Название:</label>
        <input class="add-ingredient__input" type="text" v-model="newIngredient.name"><br>
        <label class="add-ingredient__label">Описание:</label>
        <input class="add-ingredient__input" type="text" v-model="newIngredient.description"><br>
        <label class="add-ingredient__label">Единица измерения:</label>
        <input class="add-ingredient__input" type="text" v-model="newIngredient.measure_unit"><br>
        <label class="add-ingredient__label">Обложка:</label>
        <input class="add-ingredient__input" @change="loadTextFromFile" type="file" accept="image/*"><br><br>
        <button class="add-ingredient__button" type="submit" @click="addIngredient">Добавить Ингредиент</button>
      </form>
    </div>
</template>

<script>

import Vue from "vue";

export default {
  name: 'CreateIngredientForm',
  data() {
    return {
      text: "",
      ingredients: [],
      images: [],
      newIngredient: {
        id: "",
        name: "",
        cover: "",
        description: "",
        measure_unit: "",
      }
    }
  },
  mounted() {
    console.log(localStorage.key(0))
    if (localStorage.getItem('ingredients')) {
      try {
        this.ingredients = JSON.parse(localStorage.getItem('ingredients'));
      } catch(e) {
        localStorage.removeItem('ingredients');
      }
    }
  },
  methods: {
    addIngredient() {
      // ensure they actually typed something
      if (!this.newIngredient) {
        return;
      }
      this.newIngredient.id = this.ingredients.length + 1
      this.ingredients.push(Vue.util.extend({}, this.newIngredient));
      this.saveIngredient();
    },
    removeIngredient(x) {
      this.ingredients.splice(x, 1);
      this.saveIngredient();
    },
    saveIngredient() {
      const parsed = JSON.stringify(this.ingredients);
      localStorage.setItem('ingredients', parsed);
    },
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = e => this.newIngredient.cover = e.target.result;
      reader.readAsDataURL(file);
    },
  }
}

</script>

<style lang="less" scoped>

.add-ingredient {
  box-sizing: content-box;
  padding: 24px 32px;

  margin-left: auto;
  margin-right: auto;
  width: 575px;
  height: auto;
  margin-bottom:30px;

  border: 1px solid #D9D9D9;
  border-radius: 8px;

  &__label {
    width: 167.14px;
    height: 19px;
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: inherit;
  }

  &__input{
    padding: 8px 24px;
    width: 511px;
    height: auto;
    margin-bottom:15px;

    background: #ECECEC;
    border-radius: 8px;
    border-style: none;
  }

  &__button {
  background-color: #ECECEC;
  width: max-content;
  border: none;
  border-radius: 100px;
  padding: 15px 32px;
  font-weight: bold;
  color: #7D7D7D;
  font-size: 14px;
  cursor: pointer;
}

}

</style>

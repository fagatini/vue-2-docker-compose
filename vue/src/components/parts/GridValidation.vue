<template>
    <div class="editor-settings">
      <div class="editor-settings__header-text">Валидация карты</div>
      <div class="editor-settings__row">
        <div class="editor-settings__subheader-text">Цветок: </div>
        <div class="editor-settings__text">{{ getValidationResults.flower }}</div>
      </div>
      <div class="editor-settings__row">
        <div class="editor-settings__subheader-text">Стена: </div>
        <div class="editor-settings__text">{{ getValidationResults.wall }}</div>
      </div>
      <div class="editor-settings__row">
        <div class="editor-settings__subheader-text">Земля: </div>
        <div class="editor-settings__text">{{ getValidationResults.ground }}</div>
      </div>           
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    name: "GridValidation",
    computed: {
      ...mapGetters("game", ["getValidationResults"]),
    },
  };
  </script>
  
  <style scoped lang="less">
  .editor-settings {
    margin: 20px;
    &__header-text {
      font-family: "Adigiana Ultra", sans-serif;
      font-size: 36px;
      margin-bottom: 16px;
    }

    &__subheader-text {
      font-family: "Adigiana Ultra", sans-serif;
      font-size: 26px;
      margin-right: 10px;
    }

    &__text {
      font-family: "Babayka", sans-serif;
      font-size: 26px;
      flex: 1;
      text-align: left;
    }

    &__row {
      display: flex;
      margin-bottom: 10px;
    }
  }
  </style>
  
<template>
  <div class="enemy center-horizontal center-vertical noselect"
    @click="() => onEnemyClick()"
  >
    <div class="enemy__image">
      <img class="enemy_image" :src="enemy.base.image" draggable="false"/>
    </div>
    <HealthbarComponent :health="[enemy.health, enemy.base.maxHealth]"/>
  </div>
</template>

<script>
import HealthbarComponent from '../common/HealthbarComponent.vue';
//import { mapGetters } from "vuex";

export default {
  components: {
    HealthbarComponent
  },
  props: {
    enemy: Object,
  },
  data() {
    return {
    };
  },
  computed: {

  },
  methods: {
    onEnemyClick() {
      this.$emit("onEnemyClick", this.enemy);
    }

  },
};
</script>

<style scoped lang="less">
.enemy {
  height: 400px;
  margin-left: 10px;
  aspect-ratio: 1/1;
  //width: 200px;
  background: #0000002f;

  &__image {
    height: 80%;
    width: fit-content;
    background: rgba(255, 0, 0, 0.199);

    img {
      height: 100%;
    }
  }
}
</style>

<template>
  <div class="healthbar">
    <span>{{this.health[0]}}/{{this.health[1]}}</span>
    <div class="healthbar__background">
      <div class="healthbar__fill"
        :style="{ '--health': `${healthPercent}%` }"
      >
      </div>
    </div>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";

export default {
  props: {
    health: [],
  },
  data() {
    return {
    };
  },
  computed: {
    healthPercent() {
      return (Math.max(0, this.health[0] / this.health[1])*100);
    }
  },
};
</script>

<style scoped lang="less">
.healthbar {
  height: 13px;
  width: 100%;
  padding: 2px;
  margin: 0;
  border-radius: 20px;
  background: #000000;
  display: flex;
  position: relative;
  
  span {
    position: absolute;
    width: 100%;
    top: -2px;
    left: 0;
    font-size: 17px;
    font-weight: bold;
    text-shadow: #fff 0px 1px 1px ;
  }

  &__background {
    height: 100%;
    width: 100%;
    border-radius: 20px;
    background: #a09595;
  }

  &__fill {
    height: 100%;
    width: var(--health);
    border-radius: 20px;
    padding: 0;
    margin: 0;
    background: rgb(197, 48, 48);
  }
}
</style>

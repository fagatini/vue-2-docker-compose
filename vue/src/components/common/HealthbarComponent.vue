<template>
  <div class="healthbar">
    <span>{{this.health[0]}}/{{this.health[1]}}</span>
      <div class="healthbar__fill" 
        :style="{ '--health': `${healthPercent}%` }">
      </div>
      <div class="healthbar__shield"
        :style="{ '--shield': `${shieldPercent}%` }">
      </div>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";

export default {
  props: {
    health: [],
    shield: Number,
  },
  data() {
    return {
    };
  },
  computed: {
    healthPercent() {
      return (Math.max(0, Math.min((100, this.health[0] / this.health[1])*100)));
    },
    shieldPercent() {
      return (Math.max(0, Math.min(100, this.shield / this.health[1])*100));
    }
  },
};
</script>

<style scoped lang="less">
.healthbar {
  position: relative;
  height: 15px;
  width: 95%;
  margin: 0;
  border-radius: 20px;
  border: #000 solid 2px;
  background: #a09595;
  display: flex;
  z-index: 0;
  
  span {
    position: absolute;
    width: 100%;
    top: -3px;
    z-index: 1;
    font-size: 17px;
    font-weight: bold;
    text-shadow: #fff 0px 1px 1px;
  }

  &__fill {
    position: absolute;
    height: 100%;
    width: var(--health);
    border-radius: 20px;
    padding: 0;
    margin: 0;
    background: rgb(197, 48, 48);
  }
  &__shield {
    position: relative;
    height: 100%;
    width: var(--shield);
    border-radius: 20px;
    background: rgba(0, 247, 255, 0.678);
  }
}
</style>

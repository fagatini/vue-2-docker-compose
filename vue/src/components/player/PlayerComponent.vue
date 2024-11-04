<template>
  <div class="player center-horizontal center-vertical noselect">
    <img src="../../assets/player/Player.png" />
    <HealthbarComponent :health="[player.health, player.maxHealth]" :shield="player.shield"/>
  </div>
</template>

<script>
import HealthbarComponent from '../common/HealthbarComponent.vue';

//import { mapGetters } from "vuex";

export default {
  components: {
    HealthbarComponent,
  },
  props: {
    player: Object,
  },
  data() {
    return {
    };
  },
  computed: {

  },
  methods: {

  },
};
</script>

<style scoped lang="less">
.player {
  height: 100%;

  img {
    height: 80%;
  }
}
</style>

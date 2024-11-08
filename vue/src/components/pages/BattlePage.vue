<template>
  <div class="battle-screen">
    <div class="header">
      <div class="btn" @click="() => showCardPile(getDeck)">
        deck
      </div>
    </div>

    <div class="middle center-vertical">
      <div class="player-area">
        <PlayerComponent :player="player"/>
      </div>
      <div class="enemy-area center-vertical center-horizontal"
        @click.self="() => tryPlayCard(null)"
      >
        <EnemyComponent
          v-for="(enemy) in enemies"
          :key="enemy.id"
          :enemy="enemy"
          @onEnemyClick="() => handleEnemyClick(enemy)"
        />
      </div>
    </div>

    <div class="footer">
      <div class="btn" @click="() => showCardPile(getDrawPile)">
        draw
      </div>
      <div class="mana">
        2/3
      </div>
      <DeckComponent :bus="bus"/>
      <div class="btn" @click="() => endTurn()">
        end
      </div>
      <div class="btn" @click="() => showCardPile(getDiscardPile)">
        discard
      </div>
    </div>
    <CardPile :bus="bus"/>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from "vuex";
import CardPile from '../card/CardPile.vue';
import DeckComponent from '../deck/DeckComponent.vue';
import EnemyComponent from "../enemy/EnemyComponent.vue";
import PlayerComponent from "../player/PlayerComponent.vue";

export default {
  components: {
    DeckComponent,
    CardPile,
    PlayerComponent,
    EnemyComponent,
  },
  data() {
    return {
      bus: new Vue(),
    }
  },
  computed: {
    ...mapGetters("deck", [
      "getDeck",
      "getHand",
      "getDrawPile",
      "getDiscardPile",
    ]),
    ...mapGetters("battle", [
      "getPlayer",
      "getEnemies",
    ]),

    player() {
      return this.getPlayer;
    },

    enemies() {
      return this.getEnemies;
    }
  },
  mounted() {
    this.addEnemyById(0);
    this.addEnemyById(0);
  },
  methods: {
    ...mapActions("battle", [
      "clearEnemies",
      "addEnemyById",
      "applyEnemyDamage",
    ]),

    showCardPile(cards) {
      this.bus.$emit('setPile', cards);
      this.bus.$emit('showPile', cards);
    },

    handleEnemyClick(enemy) {
      console.log(enemy);
      this.tryPlayCard(enemy)
      this.applyEnemyDamage({enemy: enemy, damage: 12});
    },

    tryPlayCard(target) {
      console.log("tryPlayCard", target);
      this.enemies[0].health -= 1;
    },

    endTurn() {
      console.log("Turn Ended!");
    },
  }
}
</script>

<style scoped lang="less">
.battle-screen {
  position: absolute;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  .header {
    height: 60px;
    width: 100vw;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;

    background: rgba(255, 255, 0, 0.459);
  }

  .middle {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    height: 100px;
    width: 100vw;

    background: rgba(170, 255, 255, 0.336);

    .player-area {
      height: 300px;
      width: 300px;
      margin-left: 5%;

      background: rgba(255, 0, 0, 0.253);
    }

    .enemy-area {
      display: flex;
      flex-grow: 1;
      height: 100%;
      justify-items: center;
      margin-right: 2%;
      margin-left: 5%;

      background: rgba(255, 0, 0, 0.253);
    }
  }

  .footer {
    height: fit-content;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;

    background: rgba(255, 255, 0, 0.219);
  }

  .mana {
    height: 60px;
    width: 60px;

    background: #00f;
  }

  .btn {
    height: 60px;
    width: 60px;

    background: rgb(153, 12, 12);
  }
}
</style>

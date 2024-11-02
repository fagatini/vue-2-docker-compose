<template>
  <div class="battle-screen">
    <div class="header">
      <div class="btn" @click="() => showCardPile(getDeck)">
        deck
      </div>
    </div>

    <div class="middle">
    </div>

    <div class="footer">
      <div class="btn" @click="() => showCardPile(getDrawPile)">
        draw
      </div>
      <div class="mana">
        2/3
      </div>
      <DeckComponent />
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
import { mapGetters } from "vuex";
import CardPile from '../card/CardPile.vue';
import DeckComponent from '../deck/DeckComponent.vue';
import Vue from 'vue';

export default {
  components: {
    DeckComponent,
    CardPile,
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
  },
  methods: {
    showCardPile(cards) {
      //this.$refs.cardPile.setCardList(cards);
      //this.$refs.cardPile.show();
      this.bus.$emit('setPile', cards);
      this.bus.$emit('showPile', cards);
    },

    endTurn() {
      console.log("Turn Ended!");
    },
  }
}
</script>

<style scoped lang="less" >
.battle-screen {
  position: absolute;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
}

.header {
  position: fixed;
  height: 60px;
  width: 100vw;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  
  background: #ff0;
}

.footer {
  position: fixed;
  height: fit-content;
  width: 100vw;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;

  background: #ff0;
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
</style>

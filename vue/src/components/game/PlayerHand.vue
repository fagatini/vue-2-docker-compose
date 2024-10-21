<template>
  <div class="hand">
    <div class="card" v-for="index in numberOfCards" :key="index" :style="index === 1 ? {'margin-left': '0'} : {}">
      {{ index }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerHand',
  props: {
    numberOfCards: {
      type: Number,
      required: true,
      validator: value => value >= 0 && value <= 10
    }
  }
};
</script>

<style scoped>
.hand {
  display: flex;
  position: relative; 
  width: 100%; 
  height: 200px;
  margin: 20px auto;
  padding: 10px;
  overflow: hidden;
}

.card {
  width: 150px;
  height: 200px;
  background-color: #f0f0f0;
  border: 1px solid #000;
  border-radius: 5px;
  margin-left: -50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: black; 
}
</style>

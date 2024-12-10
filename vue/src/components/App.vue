<template>
  <div>
    <RouterView />
    <ModalContainer />
  </div>
</template>

<script>
import ModalContainer from "@/components/parts/ModalContainer";

export default {
  components: {
    ModalContainer
  }
}
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Rubik+Spray+Paint&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Neucha&display=swap');

body {
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5 {
  font-weight: 400;
  font-style: normal;
  color: #EFF1F4;
  margin: 0;
}

h1, h3, h5 {
  font-family: "Rubik Spray Paint", system-ui;
}

h2, h4 {
  font-family: "Neucha", cursive;
}
</style>

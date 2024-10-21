<template>
  <PageLayout>
    <section class="p-16">
      Homepage
      <button @click="() => openHelpModal()">Open modal</button>
    </section>
    
    <GameComponent /> 
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { helpModal } from "@/mixins/modals";
import GameComponent from '../game/GameComponent.vue';

export default {
  name: 'HomePage',
  mixins: [helpModal],
  components: {
    PageLayout,
    GameComponent
  }
}
</script>

<style>
</style>

<template>
    <div>
        <div class="content">
            <HeaderMenu> </HeaderMenu>
            <slot />
        </div>
    </div>
</template>

<script>
import HeaderMenu from '../parts/Header';
export default {
    name: 'PageLayout',
    components: {
        HeaderMenu,
    },
};
</script>

<style scoped lang="less">
.content {
  margin: 0 auto;
  padding: 20px 0;
  height: 100vh;
  max-width: 1208px;
}
</style>

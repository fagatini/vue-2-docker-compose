<template>
  <RouterLink class="card" :to="{ name: ROUTES.RECIPE, params: { id: recipe.id } }">
			<div class="card__title">{{ recipe.name }}</div>
			<img class="card__image" :src="recipe.cover"/>
  </RouterLink>
</template>
  
<script>
import { ROUTES } from '@/router/routes';

export default {
	name: "RecommendationComponent",
	props: {
		recipe: Object
	},
	computed: {
		ROUTES() {
			return ROUTES
		}
	}
}
</script>
  
<style lang="less" scoped>
.card {
	width: 177px;
	height: 243px;
	position: relative;
	margin: 5px;
	border-radius: 8px;

	&__title {
		position: absolute;
		width: inherit;
    box-sizing: border-box;
		bottom: 15px;
		padding: 10px;
		text-decoration: none;
		font-size: 17px;
		font-weight: bold;
		color: white;
		word-wrap: break-word;
		z-index: 1;
	}

	&__image {
		width: inherit;
		height: inherit;
    object-fit: cover;
		border-radius: inherit;
		filter: brightness(55%)
  }
}
</style>
  
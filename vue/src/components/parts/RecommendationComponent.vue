<template>
  <div class="card">
		<div class="card__image">
			<RouterLink class="card__title__text" :to="{ name: ROUTES.RECIPE, params: { id: recipe.id } }">
				<img :src="recipe.cover"/>
			</RouterLink>
		</div>
  </div>
</template>
  
<script>
import { ROUTES } from '@/router/routes';
import { mapGetters } from 'vuex';

export default {
	name: "RecommendationComponent",
	props: {
		recipe: Object
	},
	computed: {
		ROUTES() {
			return ROUTES
		},
		...mapGetters('ingredients', [
			'getIngredientById'
		])
	},
	methods: {
		getIngredientName(id) {
			return this.getIngredientById(id).name
		},
		makeIngredientsList(ingredients) {
			let ingredientsString = ""

			ingredients.forEach(ingredient => {
				ingredientsString += `${this.getIngredientName(ingredient.ingredient_id)}, `
			})
			ingredientsString = ingredientsString.slice(0, ingredientsString.lastIndexOf(',')) + '.'

			return ingredientsString
		}
	},
}
</script>
  
<style lang="less" scoped>
.card {
	width: 170px;
	height: 400px;
	display: flex;
	flex-direction: column;
	margin-left: 25px;
	align-items: center;
	text-align: center;

	&__title {
		width: 100%;
		text-decoration: none;
		font-size: 20px;
		margin-left: 10px;
		color: black;

		&__text {
			word-wrap: break-word;
			color: black;
		}
	}

	&__image img {
		width: 100%;
		height: 300px;
    object-fit: fill;
  }
}
</style>
  
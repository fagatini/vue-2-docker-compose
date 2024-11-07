<template>
    <div class="card-item">
        <div class="card-item__image-cnt">
            <div class="card-item__like">
                <ButtonLike :likeStyle="buttonLikeStyle" @click="() => clickOnLike()" />
            </div>
            <div class="card-item__discount">
                <p class = "card-item__name-discount" v-if="showDiscount"> -{{ calculatingDiscount() }}% </p>
            </div>
            <img class="card-item__image" @click="() => openItemPage()" :src="getImage" alt="" />
        </div>
        <div class="card-item__prices">
            <p class="card-item__current-price">{{ item.price.currentPrice }}₽</p>
            <p v-if="showDiscount" class="card-item__original-price">{{ item.price.originalPrice }}₽ </p>
        </div>
        <div class="card-item__name-cnt">
            <p class="card-item__name">{{ item.name }}</p>
        </div>
        <div class="card-item__add-to-cart">
            <ButtonCart :item=this.item />
        </div>
    </div>
</template>

<script>
import ButtonLike from '../parts/ButtonLike.vue'
import ButtonCart from '../parts/ButtonCart.vue';
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'CartItem',
    components:{
        ButtonLike,
        ButtonCart,
    },
    props: {
        item: Object,
    },
    computed: {
        ...mapGetters('favorites', ["isFavorites"]),
        ...mapGetters('cart', ['getCart']),
        showDiscount() {
            return this.item.price.currentPrice !== this.item.price.originalPrice
        },
        getImage() {
            return this.item.images.find((image) => image.type === 'main').url
        },
        buttonLikeStyle() {
            return this.isFavorites(this.item)
        },
        cartItem() {
            return this.getCart.find((elem) => elem.id === this.item.id);
        }
    },
    methods: {
        ...mapActions('favorites', ['addToFavorites', 'removeFromFavorites']),
        openItemPage() {
            this.$router.push({ path: `/item/:${this.item.id}` })
        },
        clickOnLike() {
            if (this.isFavorites(this.item) === true) {
                this.removeFromFavorites(this.item)
            } else {
                this.addToFavorites(this.item)
            }
        },
        calculatingDiscount() {
            const diff = this.item.price.originalPrice - this.item.price.currentPrice
            return diff * 100 / this.item.price.originalPrice
        },
    },
}
</script>

<style scoped lang="less">
.card-item {
    aspect-ratio: 2 / 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2%;
    border-radius: 4px;
    filter: drop-shadow(3px 3px 3px #00000030);
    background-color: @cBaseWhite;

    &__image-cnt {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;

        height: 60%;
        width: 100%;
    }

    &__like {
        position: absolute;
        right: 5%;
        top: 5%;
    }

    &__discount {
        position: absolute;
        left: 5%;
        top: 80%;
    }

    &__name-discount {
        font-size: 15px;
        border-radius: 5px;
        font-family: @ffOne;
        background-color: @cBaseTwelve;
        color: @cBaseWhite;
        padding: 3px 5px;
    }

    &__image {
        max-width: 100%;
        max-height: 100%;
        background-color: @cBaseEight;
        border-radius: 3px;
    }

    &__name-cnt {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &__name {
        text-align: center;
        font-size: 16px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-family: @ffOne;
    }

    &__prices {
        display: flex;
        align-items: center;
        width: fit-content;
        justify-content: space-between;
        width: 90%;
    }

    &__current-price,
    &__original-price {
        font-size: 17px;
        font-family: @ffOne;
    }

    &__current-price {
        font-weight: 600;
    }

    &__original-price {
        font-weight: 400;
        opacity: 0.7;
        margin-right: 10px;
    }

    &__add-to-cart {
        width: 94%;
    }

    &__to-cart {
        height: 35px;
        width: 94%;
        border-radius: 4px;
        color: @cBaseEleven;
        border: 1px solid @cBaseEleven;
        background-color: @cBaseWhite;
        transition-duration: 0.3s;
        cursor: pointer;
        font-family: @ffOne;
        &:hover {
            background-color: @cBaseTwelve;
            color: @cBaseWhite;
            border: 2px solid @cBaseTwelve;
        }
    }
}
</style>
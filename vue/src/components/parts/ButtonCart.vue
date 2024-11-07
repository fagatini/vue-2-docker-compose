<template>
    <div class="cart"> 
        <CustomButton
            class="cart__add-to-cart"
            type="filledOrange"
            @click="handleAddToCartClick"
            v-if="!cartItem"
        >
            В корзину
        </CustomButton>
        <div class="cart__count__amount" v-if="cartItem">
            <button
                class="cart__count__amount__button"
                @click="() => onChangeCount(-1)"
            >
                -
            </button>
            <div class="cart__count__amount__number">
                {{ cartItem.selectCount }}
            </div>
            <button
                class="cart__count__amount__button"
                @click="() => onChangeCount(1)"
            >
                +
            </button>
        </div>
    </div>
</template>

<script>
import CustomButton from '../parts/Button.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ButtonCart',
    components: {
        CustomButton
    },
    props: {
        item: Object
    },
    computed: {
        ...mapGetters('cart', ['getCart']),
        cartItem() {
            return this.getCart.find((elem) => elem.id === this.item.id);
        },
    },
    methods: {
        ...mapActions('cart', [
            'addItemToCart',
            'removeItemFromCart',
            'changeItem',
        ]),
        handleAddToCartClick() {
            this.addItemToCart({
                id: this.item.id,
                name: this.item.name,
                brand: this.item.information[0].value,
                price: {
                    currentPrice: this.item.price.currentPrice,
                    originalPrice: this.item.price.originalPrice,
                },
                images: this.item.images,
                count: this.item.count,
                selectCount: '1',
            });
        },
        onChangeCount(value) {
            const count = Number(this.cartItem.selectCount) + Number(value);
            console.log(count, this.cartItem.count, count <= this.cartItem.count);
            
            if (count <= this.cartItem.count && count > 0) {
                this.cartItem.selectCount = count;
                this.changeItem(this.cartItem);
            }
            if (count < 1) this.removeItemFromCart(this.cartItem);
        },
    }
}
</script>

<style scoped lang="less">
.cart {
    width: 100%;
    height: 100%;

    &__add-to-cart {
        width: 100%;
        height: 100%;
    }

    &__add-to-cart-child {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 16px;
    }

    &__cart-btn-text {
        height: 28px;
        flex-grow: 1;

        font-family: @ffOne;
        font-size: 24px;
        font-weight: 400;
        text-align: center;
    }

    &__cart-btn-icon {
        width: 32px;
        height: 32px;
    }

    &__count {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-left: auto;

        &__amount {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            height: 40px;
            padding: 8px;
            background-color: @cBaseEleven;
            border-radius: 4px;

            &__button {
                width: 24px;
                height: 24px;
                padding: 0;
                background-color: @cBaseEleven;
                color: @cBaseWhite;
                border: none;
                cursor: pointer;
                font-size: 20px;
                text-align: center;
            }

            &__number {
                background-color: @cBaseEleven;
                color: @cBaseWhite;
                border: none;
            }
        }
    }
}
</style>
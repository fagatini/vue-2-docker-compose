<template>
    <div >
        <nav class="header">
            <div class="header__left">
                <RouterLink class="header__left__catalog-route" :to="{ name: ROUTES.CATALOG }"> 
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 12C2.5 11.7239 2.72386 11.5 3 11.5H21C21.2761 11.5 21.5 11.7239 21.5 12C21.5 12.2761 21.2761 12.5 21 12.5H3C2.72386 12.5 2.5 12.2761 2.5 12Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 6C2.5 5.72386 2.72386 5.5 3 5.5H21C21.2761 5.5 21.5 5.72386 21.5 6C21.5 6.27614 21.2761 6.5 21 6.5H3C2.72386 6.5 2.5 6.27614 2.5 6Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 18C2.5 17.7239 2.72386 17.5 3 17.5H21C21.2761 17.5 21.5 17.7239 21.5 18C21.5 18.2761 21.2761 18.5 21 18.5H3C2.72386 18.5 2.5 18.2761 2.5 18Z" fill="white"/>
                    </svg>
                    <span class="header__left__catalog-hint">
                        Каталог
                    </span>
                </RouterLink> 
            </div>
            
            <div class="header__right">
                <RouterLink class="header__right__favorites-route" :to="{ name: ROUTES.FAVORITES }"> 
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2046 4.25632C14.3299 3.13054 15.8564 2.49805 17.4482 2.49805C19.0399 2.49805 20.5664 3.13051 21.6916 4.25624C22.8174 5.38152 23.45 6.90816 23.45 8.49987C23.45 10.0916 22.8175 11.6181 21.6917 12.7434C21.6917 12.7435 21.6917 12.7434 21.6917 12.7434L12.8517 21.5834C12.6565 21.7787 12.3399 21.7787 12.1446 21.5834L3.30461 12.7434C0.960963 10.3998 0.960963 6.59997 3.30461 4.25632C5.64826 1.91267 9.44807 1.91267 11.7917 4.25632L12.4982 4.96277L13.2046 4.25632C13.2046 4.25629 13.2046 4.25635 13.2046 4.25632ZM17.4482 3.49805C16.1217 3.49805 14.8496 4.02515 13.9118 4.96334L12.8517 6.02343C12.758 6.11719 12.6308 6.16987 12.4982 6.16987C12.3656 6.16987 12.2384 6.11719 12.1446 6.02343L11.0846 4.96343C9.13149 3.0103 5.96484 3.0103 4.01172 4.96343C2.05859 6.91655 2.05859 10.0832 4.01172 12.0363L12.4982 20.5228L20.9846 12.0363C21.9228 11.0986 22.45 9.82636 22.45 8.49987C22.45 7.17338 21.9229 5.90126 20.9847 4.96351C20.0469 4.02532 18.7747 3.49805 17.4482 3.49805Z" fill="#414141"/>
                    </svg>
                    <span class="header__right__favorites-hint">
                        Избранное
                    </span>
                </RouterLink>
            
                <RouterLink class="header__right__cart-route" :to="{ name: ROUTES.CART }"> 
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 21C5.5 19.6193 6.61929 18.5 8 18.5C9.38071 18.5 10.5 19.6193 10.5 21C10.5 22.3807 9.38071 23.5 8 23.5C6.61929 23.5 5.5 22.3807 5.5 21ZM8 19.5C7.17157 19.5 6.5 20.1716 6.5 21C6.5 21.8284 7.17157 22.5 8 22.5C8.82843 22.5 9.5 21.8284 9.5 21C9.5 20.1716 8.82843 19.5 8 19.5Z" fill="#414141"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 21C17.5 19.6193 18.6193 18.5 20 18.5C21.3807 18.5 22.5 19.6193 22.5 21C22.5 22.3807 21.3807 23.5 20 23.5C18.6193 23.5 17.5 22.3807 17.5 21ZM20 19.5C19.1716 19.5 18.5 20.1716 18.5 21C18.5 21.8284 19.1716 22.5 20 22.5C20.8284 22.5 21.5 21.8284 21.5 21C21.5 20.1716 20.8284 19.5 20 19.5Z" fill="#414141"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0.5C0.723858 0.5 0.5 0.723858 0.5 1C0.5 1.27614 0.723858 1.5 1 1.5H4.58051C5.33783 5.79147 6.10333 10.0643 6.74931 14.3709C6.93288 15.5947 7.98416 16.5 9.22165 16.5H19.3597C20.5514 16.5 21.5774 15.6588 21.8111 14.4903L23.2503 7.29417C23.436 6.36599 22.726 5.5 21.7795 5.5H7.16046C6.8575 5.5 6.57797 5.58901 6.34436 5.74093L5.49239 0.913107C5.45023 0.674179 5.24262 0.5 5 0.5H1ZM6.666 7.07417C6.62065 6.77187 6.85478 6.5 7.16046 6.5H21.7795C22.095 6.5 22.3316 6.78866 22.2698 7.09806L20.8305 14.2942C20.6903 14.9953 20.0747 15.5 19.3597 15.5H9.22165C8.47916 15.5 7.84839 14.9568 7.73825 14.2225L6.666 7.07417Z" fill="#414141"/>
                    </svg>
                    <span class="header__right__cart-hint">
                        Корзина
                    </span>
                </RouterLink>
            </div>
        </nav>
        <RouterView />
  </div> 
</template>

<script>
    import { RouteNames } from '../../router/routes'
    export default {
        name: 'HeaderMenu',
        computed: {
        ROUTES () {
        return RouteNames
        },
    },
};
</script>

<style scoped lang="less">
.header {
    width: 100%;
    display: flex;
    justify-content: start;

    &__left {
        width: 50%;
        display: flex;
        justify-content: start;

        &__catalog-route {
        width: 140px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: @cBaseEleven;
        border-radius: 4px;
        padding: 10px;
        text-decoration: none;
        }

        &__catalog-hint {
            width: 92px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: @ffOne;
            font-size: 20px;
            color: @cBaseWhite;
        }
    }
    

    &__right {
        width: 50%;
        display: flex;
        justify-content: end;
        gap: 20px;

        &__favorites-route {
            width: 65px;
            height: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            text-decoration: none;
        }

        &__favorites-hint {
            width: 65px;
            height: 18px;
            display: flex;
            justify-content: center;
            font-size: 12px;
            font-family: @ffOne;
        }

        &__cart-route {
            width: 50px;
            height: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            text-decoration: none;
        }

        &__cart-hint {
            width: 50px;
            height: 18px;
            display: flex;
            justify-content: center;
            font-size: 12px;
            font-family: @ffOne;
        }
    }
}
</style>

<template>
    <div
        :class="computeClassForBlock"
        ref="block"
        :style="sizeStyle"
        @pointermove="handlePointerMove"
        @pointerdown="handlePointerDown"
        @pointerup="handlePointerUp"
    >
        <div
            class="moveable-block__connector"
            @pointerdown="handleConnectorDown"
            @pointerup="handleConnectorUp"
        ></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'MovableBlock',
    props: {
        startLeft: Number,
        startTop: Number,
        handleMoved: Function,
        handleStartConnection: Function,
        handleEndConnection: Function,
        selected: Boolean,
    },
    data() {
        return {
            isPointerDown: false,
        };
    },
    computed: {
        ...mapGetters('blocks', ['getSize']),
        computeClassForBlock() {
            return [
                'moveable-block',
                this.selected ? 'moveable-block_selected' : '',
            ];
        },
        sizeStyle() {
            return {
                width: `${this.getSize}px`,
                height: `${this.getSize}px`,
                left: this.startLeft + 'px',
                top: this.startTop + 'px',
                zIndex: this.zIndex,
            };
        },
        zIndex() {
            return this.isPointerDown ? 2 : 1;
        },
    },
    methods: {
        handlePointerDown(event) {
            event.stopPropagation();

            this.isPointerDown = true;
            this.$refs.block.setPointerCapture(event.pointerId);
        },
        handlePointerUp(event) {
            event.stopPropagation();

            this.isPointerDown = false;
            this.$refs.block.releasePointerCapture(event.pointerId);
        },
        handlePointerMove(event) {
            event.preventDefault();

            if (this.isPointerDown) {
                const newLeft =
                    event.pageX <= this.getSize / 2
                        ? 0
                        : event.pageX > 800 - this.getSize / 2
                        ? 800 - this.getSize
                        : event.pageX - this.getSize / 2;
                const newTop =
                    event.pageY <= this.getSize / 2
                        ? 0
                        : event.pageY > 800 - this.getSize / 2
                        ? 800 - this.getSize
                        : event.pageY - this.getSize / 2;

                this.handleMoved(newLeft, newTop);
            }
        },
        handleConnectorDown(event) {
            event.stopPropagation();
            this.handleStartConnection(event);
        },
        handleConnectorUp(event) {
            event.stopPropagation();
            this.handleEndConnection(event);
        },
    },
};
</script>

<style scoped lang="less">
.moveable-block {
    position: absolute;
    background-color: @cBaseFive;
    border-radius: 10px;

    &_selected {
        background-color: green;
    }

    &:not(&_selected):active {
        background-color: @cBaseFour;
    }

    &__connector {
        z-index: 4;
        position: absolute;
        top: 95%;
        left: 25%;
        width: 50%;
        height: 10%;
        background-color: @cBaseTwo;
        border-radius: 10px;
    }
}
</style>

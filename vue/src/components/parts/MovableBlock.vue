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
            currentLeft: this.startLeft,
            currentTop: this.startTop,
            isPointerDown: false,
        };
    },
    computed: {
        sizeStyle() {
            return {
                left: this.startLeft + 'px',
                top: this.startTop + 'px',
                zIndex: this.zIndex,
            };
        },
        computeClassForBlock() {
            return [
                'moveable-block',
                this.selected ? 'moveable-block_selected' : '',
            ];
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
                this.currentLeft =
                    event.pageX <= 50
                        ? 0
                        : event.pageX > 750
                        ? 700
                        : event.pageX - 50;
                this.currentTop =
                    event.pageY <= 50
                        ? 0
                        : event.pageY > 750
                        ? 700
                        : event.pageY - 50;

                this.handleMoved(this.currentLeft, this.currentTop);
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
    width: 100px;
    height: 100px;
    background-color: @cBaseFive;
    border-radius: 10px;

    &_selected {
        background-color: green;
    }

    &:not(&_selected):active {
        background-color: @cBaseFour;
    }
    
    &__connector {
        z-index: 3;
        position: absolute;
        top: 95px;
        left: 25px;
        width: 50px;
        height: 10px;
        background-color: @cBaseTwo;
        border-radius: 10px;
    }
}
</style>

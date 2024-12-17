export default {
    namespaced: true,
    state: {
        blocks: [],
        connections: [],
    },
    getters: {
        getBlocks: (state) => state.blocks,
        getBlock: (state) => (id) =>
            state.blocks.find((block) => block.id == id),
        getConnections: (state) => state.connections,
    },
    mutations: {
        ADD_ITEM_TO_BLOCKS: (state, newItem) => {
            state.blocks.push({ id: Date.now(), ...newItem, selected: false });
        },
        CHANGE_BLOCK: (state, { id, newBlockData }) => {
            const currentBlock = state.blocks.find((block) => block.id === id);

            if (currentBlock.selected) {
                const changeX = currentBlock.left - newBlockData.left,
                    changeY = currentBlock.top - newBlockData.top;

                state.blocks = state.blocks.map((elem) => {
                    if (elem.selected) {
                        return {
                            id,
                            ...elem,
                            left: elem.left - changeX,
                            top: elem.top - changeY,
                        };
                    }

                    return elem;
                });
                console.log(JSON.stringify(state.blocks));
            } else {
                state.blocks = state.blocks.map((elem) => {
                    if (elem.id == id) {
                        return {
                            id,
                            ...elem,
                            ...newBlockData,
                        };
                    }
                    return elem;
                });
            }
        },
        ADD_CONNECTION: (state, connection) => {
            state.connections.push({ id: Date.now(), ...connection });
        },
        SELECT_BLOCK_BY_AREA: (state, areaInfo) => {
            state.blocks = state.blocks.map((block) =>
                block.left + 100 > areaInfo.left &&
                block.left <= areaInfo.left + areaInfo.width &&
                block.top + 100 > areaInfo.top &&
                block.top <= areaInfo.top + areaInfo.height
                    ? { ...block, selected: true }
                    : block
            );
        },
        CLEAR_SELECTION: (state) => {
            state.blocks = state.blocks.map((block) => ({
                ...block,
                selected: false,
            }));
        },
    },
    actions: {
        addItemToBlocks({ commit }, newItem) {
            commit('ADD_ITEM_TO_BLOCKS', newItem);
        },
        changeBlockById({ commit }, { id, newBlockData }) {
            commit('CHANGE_BLOCK', { id, newBlockData });
        },
        addConnection({ commit }, connection) {
            commit('ADD_CONNECTION', connection);
        },
        chooseBlockByArea({ commit }, areaInfo) {
            commit('SELECT_BLOCK_BY_AREA', areaInfo);
        },
        clearSelection({ commit }) {
            commit('CLEAR_SELECTION');
        },
    },
};

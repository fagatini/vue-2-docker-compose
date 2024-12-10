import { mapMutations } from "vuex";
import ResultGameModal from "@/components/modals/ResultGameModal.vue";

export const resultGameModal = {

  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),

    openResultGameModal (params = {}) {
      this.openModal({
        component: ResultGameModal,
        params
      })
    }
  }
}

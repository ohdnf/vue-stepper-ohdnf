<template>
  <div class="container mx-auto py-4" style="width: 80%;">
    
    <h1 class="display-3 mb-4 text-center">You can select only one option here</h1>

    <div class="container py-4">
      <div class="row">
        <div class="col-xl-3 col-lg-4 col-md-6" v-for="item of singleOptions" :key="item.value">
          <button
            type="button"
            class="btn my-2"
            style="min-width: 180px; min-height: 60px; !important"
            :class="{'btn-primary': !!item.status, 'btn-outline-primary': !item.status}"
            @click="selectsingleOptions(item.value)"
          >
            <div>
              <span>{{item.name}}</span>
            </div>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "single-select",
  computed: {
    ...mapState({
      singleOptions: state => state.stepper.singleOptions
    }),
  },
  methods: {
    selectsingleOptions(value) {
      this.$store.commit('stepper/selectSingleOptions', value)
    }
  }
};
</script>
<style scoped>
.card {
  min-height: 757px;
  cursor: pointer;
}
</style>

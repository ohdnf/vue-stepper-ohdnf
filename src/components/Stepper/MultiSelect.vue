<template>
  <div class="container mx-auto py-4">
    
    <h1 class="display-3 text-center">You can select multiple options here!</h1>
    <div class="text-center mb-4">
      <small>(you will see description when hover the options!)</small>
    </div>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div
          class="zoom p-0 col-md-6 col-lg-3 mb-2 text-center"
          style="margin: 0.5rem 1rem;"
          v-for="item of multiOptions"
          :key="item.value"
          :class="{ selected: !!item.status }"
          @click="selectMultiOptions(item.value)"
        >
          <div class="check">
            <div class="title mt-2 mb-3">
              <b>{{ item.name }}</b>
              <div class="tooltip-text h5 mx-2">
                {{ item.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "video-skills",
  data() {
    return {
      activeItem: null,
    };
  },
  computed: {
    ...mapState({
      multiOptions: (state) => state.stepper.multiOptions,
    }),
  },
  methods: {
    selectMultiOptions(value) {
      this.$store.commit("stepper/selectMultiOptions", value);
    },
  },
};
</script>
<style scoped>
.check {
  min-height: 100px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
}
.icon {
  /* display: inline-block; */
  width: 100px;
  height: 100px;
}
.selected {
  border: 1px solid darkblue;
  border-radius: 0.375rem;
}

.check .tooltip-text {
  visibility: hidden;
  width: 220px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  /* left: 0; */
  z-index: 99999 !important;
}

.check:hover .tooltip-text {
  visibility: visible;
}

.zoom:hover {
  -ms-transform: scale(1.1);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  z-index: 2;
}
</style>

<template>
  <div class="d-flex justify-content-center">
    <div
      class="border-top-0 text-center px-4 py-1"
      v-for="stage of stages"
      :key="stage.name"
      :class="{ done: !!stage.status, notyet: !stage.status,current: currentStep == stage.num }"
      @click="changeStep(stage.num)"
    >
      <span class="stage-name"
      >{{ stage.name }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "progress-bar",
  props: ['currentStep'],
  data() {
    return {
      initStages: [
        {name: 'Single Opt.', value: 'None', num: 0, status: false},
        {name: 'Multi Opt.', value: 'None', num: 1, status: false},
        {name: 'Date Opt.', value: 'None', num: 2, status: false},
      ],
    }
  },
  computed: {
    stages() {
      this.initStages.forEach(stage => {
        if (this.$store.getters['stepper/isChecked'](stage.num)) {
          if (stage.num == 0) {
            stage.value = this.$store.getters['stepper/getSingleOption'].name
          } else if (stage.num == 1) {
            let options = this.$store.getters['stepper/getMultiOptions']
            if (options.length > 1) {
              stage.value = options[0] + '외 ' + (options.length - 1) + '개'
            } else {
              stage.value = options.toString()
            }
          }
          stage.status = true
        } else {
          stage.status = false
          stage.value = '없음'
        }
      })
      return this.initStages
    },
    selectedFilters() {
      let arr = new Array();
      for (const item of this.initStages) {
        if (item.status) {
          arr.push(item.value)
        }
      }
      return arr
    }
  },
  methods: {
    changeStep(stageNum) {
      this.$emit("change-step", stageNum);
    },
  },
};
</script>
<style scoped>
.done {
  cursor: pointer;
  border-bottom: 10px solid darkblue;
}
.notyet {
  cursor: default;
  border-bottom: 10px solid lightgray;
}

.stage-name {
  font-size: 1.5rem;
  font-weight: bold;
}

.current{
  cursor: default;
  border-bottom: 10px solid #bcb9ed ;
}
</style>
<template>
  <div>
    <div class="container mt--7 mb-8">
      <div class="card shadow border-0">
        <div class="card-header pb-0">
          <progress-bar :currentStep="currentStep" @change-step="changeStep"></progress-bar>
        </div>
        <div class="card-body border-0">
          <single-select v-if="currentStep === 0"></single-select>
          <multi-select v-if="currentStep === 1"></multi-select>
          <date-select v-if="currentStep === 2"></date-select>
        </div>
        <div class="card-footer d-flex justify-content-end">
          <div class="px-2">
            <button class="btn ex-btn" @click.prevent="backStep">prev</button>
            <button class="btn btn-primary ml-4" @click.prevent="nextStep">next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProgressBar from "./ProgressBar.vue";
import SingleSelect from "./SingleSelect.vue";
import MultiSelect from "./MultiSelect.vue";
import DateSelect from "./DateSelect.vue";

export default {
  name: "stepper",
  components: {
    ProgressBar,
    SingleSelect,
    MultiSelect,
    DateSelect,
  },
  data() {
    return {
      currentStep: 0,
      totalStep: 3,   // total steps
    };
  },
  methods: {
    backStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      } else {
        // this.currentStep = 0
        this.$router.push({ name: "mainpage" });
      }
    },
    changeStep(stepNum) {
      if (this.$store.getters["stepper/isChecked"](stepNum)) {
        // console.log(stepNum)
        this.currentStep = stepNum;
      }
    },
    // 각 단계 verification 확인 ==> `다음` 버튼 활성화
    nextStep() {
      if (this.currentStep < this.totalStep-1) {
        switch (this.currentStep) {
          case 0:
            if (!this.$store.getters["stepper/getSingleOption"]) {
              alert("Select the option!");
            } else {
              this.currentStep++;
            }
            break;
          case 1:
            if (this.$store.getters["stepper/getMultiOptions"].length === 0) {
              alert("Select the option!");
            } else {
              this.currentStep++;
            }
            break;
        }
      } else {
        // after final step
        if (this.$store.getters["stepper/getSelectedDate"].length < 2) {
          alert("Select the dates!");
        } else {
          // you can link to result page
          this.$router.push("/about");
        }
      }
    },
    // Vuex stepper 초기화
    clearSteps() {
      this.$store.commit("stepper/clearStepperStatus");
    },
  },
  created() {
    this.clearSteps();
  },
};
</script>
<style scoped>
#maincard {
  box-shadow: 3px 3px 3px gray;
}

.ex-btn:hover{
  box-shadow:none;
}
</style>
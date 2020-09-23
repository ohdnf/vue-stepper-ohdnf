<template>
  <div class="container mx-auto py-4" style="width: 80%">
    
    <h1 class="display-3 mb-0">Select date term here!</h1>

    <div class="container my-4 py-4">
      <flat-pickr
        v-model="dates"
        @on-change="changeDates"
        :config="config"
        class="form-control"
        placeholder="Select dates"
      ></flat-pickr>
    </div>
  </div>
</template>
<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "date-select",
  components: { flatPickr },
  methods: {
    changeDates(selectedDates, dateStr) {
      this.$store.commit("stepper/selectDate", dateStr);
    },
  },
  data() {
    return {
      dates: '',
      config: {
        allowInput: true,
        mode: "range",
        // minDate: "today",
      },
    };
  },
};
</script>
<style scoped></style>

export const stepper = {
  namespaced: true,
  state: {
    singleOptions: [
      {
        name: "Sunny",
        value: 'sunny',
        status: false,
      },
      {
        name: "Cloudy",
        value: 'cloudy',
        status: false,
      },
      {
        name: "Rainy",
        value: 'rainy',
        status: false,
      },
      {
        name: "Windy",
        value: 'windy',
        status: false,
      },
    ],
    multiOptions: [
      {
        name: 'chocolate',
        value: 'choco',
        status: false,
        description: 'dark brown sweet chunky bar',
      },
      {
        name: 'vanila',
        value: 'vani',
        status: false,
        description: 'white soft smooth cream',
      },
      {
        name: 'strawberry',
        value: 'straw',
        status: false,
        description: 'red sweet triangular fruit',
      },
    ],
    selectedDate: [],
  },
  getters: {
    getSingleOption(state) {
      for (const item of state.singleOptions) {
        if (item.status == true) {
          return item
        }
      }
      return;
    },
    getMultiOptions(state) {
      let res = new Array();
      for (const item of state.multiOptions) {
        if (item.status == true) {
          res.push(item.value)
        }
      }
      return res;
    },
    getSelectedDate(state) {
      return state.selectedDate
    },
    isChecked(state, getters) {
      return step => {
        switch (step) {
          case 0:
            if (!getters.getSingleOption) {
              return false
            } else {
              return true
            }
          case 1:
            if (getters.getMultiOptions.length === 0) {
              return false
            } else {
              return true
            }
          case 3:
            if (getters.getSelectedDate.length < 2) {
              return false
            } else {
              return true
            }
        }
      }
    }
  },
  mutations: {
    // 초기화
    clearStepperStatus(state) {
      state.singleOptions.forEach(e => {
        e.status = false
      })
      state.multiOptions.forEach(e => {
        e.status = false
      })
      state.selectedDate = [];
    },
    // Stepper 항목별 갱신
    selectSingleOptions(state, payload) {
      state.singleOptions.forEach(e => {
        if (e.value == payload) {
          e.status = true
        } else {
          e.status = false
        }
      })
    },
    selectMultiOptions(state, payload) {
      state.multiOptions.forEach(e => {
        if(e.value == payload) {
          e.status = !e.status
        }
      })
    },
    selectDate(state, payload) {
      // payload => "2020-08-01 to 2020-08-21"
      state.selectedDate = payload.split(" to ");
      // selectedDate => ["2020-08-01", "2020-08-21"]
    },
  }
}
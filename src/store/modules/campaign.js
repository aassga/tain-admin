import { getAllActList } from "@/api/pineapple";
import Cookies from 'js-cookie'

const campaign = {
  state: {
    campaignList: [],
    selected: '',
    selectedValue: '',
  },
  mutations: {
    SET_ACTLIST: (state) => {
      getAllActList().then((data) => {
        state.campaignList = data.data
        if ( !Cookies.get('campaign') ) {
          state.selected = data.data[0].id;
        } else {
          state.selected = Cookies.get('campaign');
        }
        state.selectedValue = state.campaignList.find(obj => obj.id == state.selected).name
      });
    },
    TOGGLE_SELECTED: (state, data) => {
      state.selected = data
    },
  },
  actions: {
    // GetActList: ({ commit }) => {
    //   getAllActList().then((response) => {
    //     commit('SET_ACTLIST', response)
    //   });
    // },
    ToggleSelected: ({ commit }, data) => {
      Cookies.set('campaign', data)
      commit('TOGGLE_SELECTED', data)
    }
  }
}

export default campaign

const city = window.sessionStorage.getItem('city')
const state = {
  curCity: city ? JSON.parse(city) : null
}
const mutations = {
  SET_CURCITY (state, payload) {
    state.curCity = payload
    // 做一下本地的存储
    window.sessionStorage.setItem('city', JSON.stringify(state.curCity))
  }
}
const getters = {
  curCityName (state) {
    return state.curCity ? state.curCity.name : ''
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters
}

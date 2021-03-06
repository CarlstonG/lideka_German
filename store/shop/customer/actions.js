import {deleteAccessToken, findCustomer} from "~/services/ApiService";

const actions = {
  async setAccessToken({commit}, accessToken) {
    commit('setAccessToken', accessToken);
  },

  async fetchCustomer({commit}) {
    if (typeof localStorage == 'undefined') {
      return;
    }

    const accessToken = localStorage.getItem('accessToken');

    const { customer } = await findCustomer(accessToken);
    commit('setCustomer', customer);

    if (customer !== null) {
      commit('setAccessToken', accessToken);
    } else {
      commit('setAccessToken', null);
    }
  },

  async logout({commit}) {
    const accessToken = localStorage.getItem('accessToken');
    await deleteAccessToken({
      customerAccessToken: accessToken
    });
    await commit('setCustomer', {});
    await commit('setAccessToken', null);
  }
}

export default actions;

import { defineStore } from 'pinia';

export const useMiseboxUserStore = defineStore('miseboxUserStore', {
  persist: true,
  state: () => ({
    id: '',
    miseboxUser: {
      handle: '',
      displayName: '',
      imageUrl: '',
      fullName: {
        first: '',
        middle: '',
        last: ''
      },
      userRoles: [],
      verified: false,
    },
    miseboxUserProfile: {
      email: '',
      accountProviders: [],
      miseCode: '',
      accountCreated: null,
      subscription: {
        type: '',
        startDate: null,
        durationMonths: 0
      },
    },
    users: [],
    userError: null,
    profileError: null
  }),
  getters: {
    userExists: (state) => !!state.id,
    hasRole: (state) => (role) => Array.isArray(state.miseboxUser.userRoles) && state.miseboxUser.userRoles.includes(role),
    isUserListEmpty: (state) => Array.isArray(state.users) && state.users.length === 0,
    filteredUsers: (state) => Array.isArray(state.users) ? state.users.filter(user => user.id !== state.id) : []
  },
  actions: {
    clearUserData() {
      this.$reset();
    }
  }
});

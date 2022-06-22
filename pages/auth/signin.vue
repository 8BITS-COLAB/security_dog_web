<template>
  <section class="section-container">
    <v-row class="signin">
      <v-col cols="8" class="left">
        <img
          src="~/assets/logo.png"
          width="360"
          height="220"
          alt="Security Dog logo"
          class="mt-3"
        />
      </v-col>
      <v-col cols="4" class="right">
        <h2>SIGN IN</h2>
        <v-form @submit.prevent="signin">
          <v-text-field
            v-model="signinParams.email"
            label="Email"
            required
            dark
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            v-model="signinParams.password"
            label="Password"
            :append-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            required
            dark
            :type="isPasswordVisible ? 'text' : 'password'"
            :rules="passwordRules"
            @click:append="setPasswordVisibility"
          ></v-text-field>
          <div class="text-center mt-4">
            <v-btn
              :disabled="isSubmitButtonDisabled"
              class="signin-btn white--text"
              type="submit"
              color="secondary"
              dark
            >
              SIGN IN
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'SigninPage',
  data: () => ({
    signinParams: {
      email: '',
      password: '',
    },
    isPasswordVisible: false,
  }),
  computed: {
    passwordRules() {
      return this.currentRegistry
        ? [
            (v) => !!v || 'Password is required',
            (v) => v.length <= 80 || 'Password must be less than 80 characters',
            (v) => v.length >= 6 || 'Password must be at least 6 characters',
          ]
        : [(v) => !!v || 'Password is required']
    },
    emailRules() {
      return this.currentRegistry
        ? [
            (v) => !!v || 'Login is required',
            (v) => v.length <= 80 || 'Login must be less than 80 characters',
            (v) => v.length >= 3 || 'Login must be at least 3 characters',
          ]
        : [(v) => !!v || 'Login is required']
    },
    isSubmitButtonDisabled() {
      return !this.signinParams.email || this.signinParams.password.length < 6
    },
  },
  methods: {
    ...mapActions('users', ['fetchCurrentUser']),
    ...mapMutations('errors', ['setError']),
    setPasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
    async signin() {
      try {
        const { token } = await this.$axios.$post('/auth/signin', {
          user: this.signinParams,
        })

        this.$axios.setHeader('authorization', `Bearer ${token}`)

        await this.fetchCurrentUser()

        this.$router.push('/')
      } catch (error) {
        this.setError('Invalid credentials')
      }
    },
  },
  fetchOnServer: true,
}
</script>

<style lang="scss" scoped>
.section-container {
  background: #efefefef;
  width: 100%;
  height: 96vh;
  box-sizing: border-box;

  .signin {
    padding: 0;
    margin: 0 auto;
    height: 96vh;

    .left {
      padding: 30px;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      display: flex;
      color: #293462;
    }
    .right {
      padding: 30px;
      box-sizing: border-box;
      background: #293462;
      color: #fff;
      h2 {
        text-align: center;
        margin: 30px 0;
      }
      .signin-btn {
        width: 100%;
        color: #293462;
      }
    }
  }
}
</style>

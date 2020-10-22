<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo.svg')"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title>Wellness Checker</v-toolbar-title>

      </div>

      <v-spacer></v-spacer>

      <v-btn to="/" text v-if="!$vuetify.breakpoint.mobile">
        <span class="mr-2">Form</span>
      </v-btn>
      <v-btn to="/reports" text v-if="isAdmin && !$vuetify.breakpoint.mobile">
        <span class="mr-2">Reports</span>
      </v-btn>
      <div v-if="authState === 'signedin' && user && !$vuetify.breakpoint.mobile">
        <amplify-sign-out ></amplify-sign-out>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" align="center" justify="center">
            <v-spacer></v-spacer>
            <amplify-authenticator v-if="authState !== 'signedin'" username-alias="email">
              <amplify-sign-up
                slot="sign-up"
                username-alias="email"
              ></amplify-sign-up>
              <amplify-sign-in slot="sign-in" username-alias="email"></amplify-sign-in>
            </amplify-authenticator>
            <v-spacer></v-spacer>
          </v-col>
        </v-row>
      </v-container>
      <router-view v-if="authState == 'signedin'" />
      <br /><br /><br /><br />
      <div v-if="authState === 'signedin' && user && $vuetify.breakpoint.mobile">
        <amplify-sign-out ></amplify-sign-out>
      </div>
    </v-main>
    <v-footer class="pa-3" color="secondary" dark>
      <v-spacer></v-spacer>
      <div>&nbsp;</div>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>

import { onAuthUIStateChange } from '@aws-amplify/ui-components'


export default {
  name: 'App',
  components: {
  },
  created() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      if (authData) this.user = authData;
      this.userString = JSON.stringify(authData);
      this.userEmail = authData.attributes.email;
      if (authData.signInUserSession.idToken.payload["cognito:groups"]) {
        if (authData.signInUserSession.idToken.payload["cognito:groups"].indexOf("admins") > -1) {
          this.isAdmin = true
        } else {
          this.isAdmin = false
        }
      } else {
        this.isAdmin = false
      }
    })
  },
  data: () => ({
    user: undefined,
    authState: undefined,
    authData: undefined,
    isAdmin: undefined,
    userString: '',
    userEmail: ''
  }),
  beforeDestroy() {
    return onAuthUIStateChange;
  }
};
</script>

<style>
  :root {
    --amplify-primary-color: #b20838;
    --amplify-primary-tint: #b20838;
    --amplify-primary-shade: #b20838d3;
  }
</style>
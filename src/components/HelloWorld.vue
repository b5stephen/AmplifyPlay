<template>
<div>
    <div v-if="authState !== 'signedin'">You are signed out.</div>
    <amplify-authenticator username-alias="email">
      <div v-if="authState === 'signedin' && user">
        <div>Hello, {{user.username}}</div>
      </div>
      <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <amplify-sign-up slot="sign-up" username-alias="email" v-bind:formFields.prop="formFields"></amplify-sign-up>
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
      <amplify-sign-out slot="sign-out"></amplify-sign-out>
    </amplify-authenticator>
  </div>

</template>

<script>
import { Auth } from "aws-amplify";
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    })
  },
  beforeUnmount() {
    this.unsubscribeAuth();
  },
  data () {
    return {
      email: "",
      password: "",
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
      formFields: [
            { type: "email", placeholder: "Enter your email address"},
            { type: "password", placeholder: "Enter your password" },
            
        ],
    }
  },
  methods: {
    async processSubmit() {
      try {
        this.user = await Auth.signIn(this.email, this.password);
        alert("success");
        console.log(this.user);
      } catch (e) {
console.log("and error occured");
console.log(e.message);
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

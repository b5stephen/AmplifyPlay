import { createApp } from 'vue'
import App from './App.vue'
import { Amplify } from 'aws-amplify';
import config from './config';
import {
    applyPolyfills,
    defineCustomElements,
  } from '@aws-amplify/ui-components/loader';
  
Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
  });

  applyPolyfills().then(() => {
    defineCustomElements(window);
  });
createApp(App).mount('#app')

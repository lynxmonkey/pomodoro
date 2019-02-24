import Amplify from 'aws-amplify'

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'eu-central-1:13592250-cc1a-431f-aa48-a696bd12bd90',
    // REQUIRED - Amazon Cognito Region
    region: 'eu-central-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'eu-central-1_xZJw2Ee6D',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '6kcqlorpfparc08ka0jr8spqad'
  }
})

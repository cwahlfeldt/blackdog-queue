AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: false,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: false,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Hooks
    //onLogoutHook: myLogoutFunc,
    //onSubmitHook: mySubmitFunc,
    //preSignUpHook: myPreSubmitFunc,

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Texts
    texts: {
        button: {
            signUp: 'Register Now!'
        },
        socialSignUp: 'Register',
        socialIcons: {
            'meteor-developer': 'fa fa-rocket'
        },
        title: {
            forgotPwd: 'Recover Your Password'
        },
    },
});

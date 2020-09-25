export const JWT = {
  SECRET:
    'x/QeB3JyWfJFiRZDwuCyTVotu9ON6xEGPSoNZRS9nMiEvSyKIyaFuOYGb3NmQSyZzVddY2Aq8jPaZmagAIOpzzF7uOSBKbHJqxKqke3PI/Yj6eDTUU+uNHQzBcyYq/a2CWzmibLlZDND3dnbTjsUiexYc8/mQ4Vl5XX0cbt1KVZdQVji6UWztY7USAW33bddxBVBuEuiahfVHT/+yqohi4AZiPnlM8IFO+GyhoJSW9wiKeW3lQIX3uHRwllqHCLWQmSidswNufvYub1e6U/Dy+4JbH8ZPhDva4PxFTSugp/ZGVytZGCaqCq0/oBBMKegv2P3QZ4tItWQOppt2gmz0g==',
}

export const GRAPHQL = {
  formatErrorDev: (error) => ({
    locations: error.locations,
    message: error.message,
    path: error.path,
    stack: error.stack,
    state: error.originalError && error.originalError.state,
  }),
  formatErrorProd: (error) => ({
    message: error.message,
  }),
}

export const SMTP = {
  HOST: 'smtp.example.com',
  PASSWORD: 'PaSsWoRd',
  PORT: '465',
  USER: 'user@example.com',
}

// recovery: async (_: {}, { email }: IRecovery) => {
//   const user = await User.findOne({ email }).exec();

//   if (!user) {
//     throw new Error('No user with that email');
//   }

//   const token = jsonwebtoken.sign({ userId: user.id }, JWT.SECRET, {
//     expiresIn: '1d',
//   });

//   const mailOptions = {
//     from: SMTP.USER,
//     html: `<h2>Token</h2><code>${token}</code>`,
//     subject: 'Password recovery token',
//     to: user.email,
//   };

//   const res = await sendMail(mailOptions);

//   return {
//     isSend: res.success,
//   };
// },

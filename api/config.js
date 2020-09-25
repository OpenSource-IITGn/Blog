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

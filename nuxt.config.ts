// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCUIwzN15Pc4NTy\nfvopPgd0kRB/z/VEeUQA3XWXOEh9tEFJc7LxjZW5szE+3WUnIFAccHn3XWPYmj8Y\nJygMSVENxIBryi7LBKdeRbaIpKMBUOIQzAlheNkKet2TRA/nGmjnoGAGrvvoPbL8\n6UgtlHbAR8iNpf/VJbulbDRatsTtBwkuk+/K2OJfoiPXYeU1UHpTh3BUGyqlUuMV\nG3aa8OinQ2/juSGUNG7xWP8PFFC5WqOkd8zdwFFUzC0kYW86VKz7bDMRcyWceFWI\n+RNfpRAbDKITQ5TxybPHuAfngrWJwcbrnKxNq9nGuYDcnKfAyr6GWr0Pp23lw/cR\nDg0H/shhAgMBAAECggEAKnWrZ1qpko9M6h60FFsnpuUnfgL80X4SnE7dtBTZTlJ6\nvhNwEGVdK4dtj4/EvQS5gZVJmDnH8x8vA3zBsVfYaCJRDtQ6Ok2grVg8/Ah4glmN\nGnRpIeuSBjt2RA4nor2CoRVqQLAqGwSIR46T9iCOMwnANb2FSTJSCRWtIe0uH6PL\nV/mdpK3SiJvbyJwFQaf2u39mEIhNqsEnGZIFBAg7NH9t+L0EcjKQexdNjoqPv1jT\nLlZJCLcdIyC627CPsOVVLMnuT1gz2WBFl+5Yvf2TE4ZkycxEuSZPcSWGvcVpa3wd\nzFh6cdsKIpvFXQjpxj7Su6qoo+ZZk/MisJKu1iXdgwKBgQDNKSosruZw1alcNZid\nrbg/K3jL6Gfm53cJiF6PR2+11H/METAMh9YKYfjtRn+xnOLxcy90N92fh5IQUSSV\nq7T6bKkdR8TsPgP0QEmUOmcus6UBqPIQ4cIvsdm5LzEJL05+mkk+k98HJIK0Kgj/\nfKy4wQ8Qg63ss8lzwJR0wUkppwKBgQC42HJ/CfARvXQ53U2zQHc9FB4FWkWBuN+Q\nw9eWKZLwdRarpkjggioXibA8VUNw3W3XqwK6Y8zSvOU1cFom91mPBvK95Trbtun6\niai4lz6dkWMVim7BSCgpRG4E3UpYcFD9bJJjIBEWPA7UC7xjT88aAj/cZs99MrRr\nwUxZqdoutwKBgD8E7QqKswhn6T0EzZtpuFXXIaTo/7mC0iLge8NhOyRMYPErOmou\n84V+8LrZ0/GX8nIeYq49VtthBnHyqt06wD3IUO5IlGnI5ugJM1DP29ARqJbo8WpU\nHpUN+YYTw+lBWcgz1lndjD2ibm+vFdJ81oVt8BWvjSZPV4sx1ahDkxizAoGAe+DL\nMuplEm6GgvUWSqhMgQmHaQzrghl08t7dD4zDJhVCYTzqoFN7hBTJoFWAAhbTs3Kv\nPFz/+sePUPX/5Rdl1N3SNoN2o6L9QeOZyEPMOesinWAOA8io6acrmGT5mzWCgaSO\nopHuAZm0UlWfJmtpH0QcqkfYjE477e84jOqxBxcCgYA84l8mejj1zx9YSYAz3//C\n0il6G8sFDY5vPEB/cUW45DCXWYGAgtOCXt0y9JxO/Q1vMK3rOoOCSj5kwdRy/OKg\negFKIst4KS+prn160uYGJjukAE5Ergxq5daaZgrvMOSzQ1cSBWlBSH5fbk53Ak23\npc6dUc4riabJfLbAJQj0fA==\n-----END PRIVATE KEY-----\n",
    public: {
      firebaseApiKey: process.env.firebase_api_key,
    },
  },
  nitro: {
    preset: "firebase",
  },
  modules: ["@vueuse/nuxt", "@pinia/nuxt", "nuxt-icon"],
  imports: {
    dirs: ["stores", "composables"],
  },
});

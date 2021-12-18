<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2">
        {{
          $t("register.title")
        }}
      </v-card-title>
      <v-card-subtitle>Please check your informations and input a password for your account !</v-card-subtitle>

      <!-- sign up form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field v-model="firstname" readonly label="First Name" outlined></v-text-field>
          <v-text-field v-model="lastname" readonly label="Last name" outlined></v-text-field>

          <v-text-field v-model="email" readonly label="E-mail" outlined></v-text-field>

          <v-text-field v-model="phone" readonly label="Phone" outlined></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            :error="errorPassword"
            :error-messages="errorPasswordMessage"
            :label="$t('register.password')"
            name="password"
            outlined
            @change="resetErrors"
            @keyup.enter="submit"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            :loading="isLoading"
            :disabled="isSignUpDisabled"
            block
            x-large
            color="primary"
            @click="submit"
          >{{ $t("register.button") }}</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      {{ $t("register.account") }}
      <router-link
        :to="localePath('/auth/signin')"
        class="font-weight-bold"
      >{{ $t("register.signin") }}</router-link>
    </div>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Sign Up Page Component
|---------------------------------------------------------------------
|
| Template for user sign up with external providers buttons
|
*/
export default {
  layout: 'empty',
  auth: false,
  async asyncData({ route, $axios, redirect }) {
    console.log("okkk")
    const token = route.query.token;
    if (token == null) {
      console.error("Token");

      redirect("/auth/signin");
    }
    const user = await $axios
      .$get(`/api/user/confirmed/${route.query.token}`)
      .catch((err) => {
        console.error("Error: " + err);
        redirect("/auth/signin");
      });
    if (!user) {
      redirect("/auth/signin");
    }
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      token: token,
    };
  },
  data() {
    return {
      user: {},
      // sign up buttons
      isLoading: false,
      isSignUpDisabled: false,

      // form
      token: "",
      isFormValid: true,
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",

      // form error
      errorPassword: false,
      errorPasswordMessage: "",

      // show password field
      showPassword: false,

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || "Required",
      },
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        this.isSignUpDisabled = true;
        this.signUp(this.token, this.password);
      }
    },
    async signUp(token, password) {
      await this.$axios
        .post("/api/user/confirm", { token: token, password: password })
        .catch((err) => {
          this.$notifyError(
            `Error while confirming your inscription ! Error: ${err}`
          );
        });
      this.isLoading = false;
      this.$router.replace("/auth/signin");
    },
    signInProvider(provider) { },
    resetErrors() {
      this.errorName = false;
      this.errorEmail = false;
      this.errorPassword = false;
      this.errorNameMessage = "";
      this.errorEmailMessage = "";
      this.errorPasswordMessage = "";

      this.errorProvider = false;
      this.errorProviderMessages = "";
    },
  },
};
</script>

<template>
    <v-row justify-center align-center class>
        <v-col
            cols="12"
            md="6"
            class="fill-height d-none d-md-flex justify-center align-center py-8 px-16"
        >
            <img style="height:66%;width:100%" src="~/assets/images/login.svg" alt="Login" />
        </v-col>
        <v-col
            cols="12"
            md="6"
            class="fill-height d-flex justify-center align-center login-background"
        >
            <v-card width="400">
                <v-card-title
                    class="text-h3 font-weight-black d-flex justify-center align-center"
                >Receipes</v-card-title>
                <v-card-actions class="px-4">
                    <v-form
                        ref="form"
                        v-model="formValid"
                        lazy-validation
                        class="d-flex justify-center align-center flex-column"
                    >
                        <v-text-field
                            class="fwidth"
                            solo
                            v-model="email"
                            :rules="[rules.required]"
                            :error="error"
                            @change="resetErrors"
                            :label="$t('login.email')"
                        ></v-text-field>
                        <v-text-field
                            class="fwidth"
                            solo
                            v-model="password"
                            :error="error"
                            :rules="[rules.required]"
                            :error-messages="errorMessages"
                            name="password"
                            :label="$t('login.password')"
                            type="password"
                            :type="showPassword ? 'text' : 'password'"
                            @change="resetErrors"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>
                        <v-alert
                            class="mx-4 text-subtitle d-flex justify-end"
                            v-if="displayConfirmationEmailActivator"
                            border="left"
                            colored-border
                            type="info"
                            elevation="2"
                        >
                            <div>Do you wish to resend a confirmation e-mail ?</div>
                            <v-btn small color="success" @click="resendConfirmationEmail">Re-send</v-btn>
                        </v-alert>

                        <v-btn
                            :loading="isLoading"
                            :disabled="isSignInDisabled"
                            block
                            x-large
                            color="primary"
                            @click="submit"
                            v-on:keyup.enter="submit"
                        >{{ $t('login.button') }}</v-btn>
                        <div class="mt-5">
                            <router-link
                                :to="localePath('/auth/forgot-password')"
                            >{{ $t('login.forgot') }}</router-link>
                        </div>
                    </v-form>
                </v-card-actions>

                <v-card-actions class="d-flex justify-center align-center">
                    <div class="text-center mt-6">
                        {{ $t('login.noaccount') }}
                        <router-link
                            :to="localePath('/auth/signup')"
                            class="font-weight-bold"
                        >{{ $t('login.create') }}</router-link>
                    </div>
                </v-card-actions>
            </v-card>
        </v-col>
        <Keypress key-event="keyup" :key-code="13" @success="login" />
    </v-row>
</template>

<script>

export default {
    components: { Keypress: () => import('vue-keypress') },
    layout: 'empty',
    auth: 'guest',
    data: () => ({
        formValid: true,
        email: "mathieu.cailly@gmail.com",
        password: "test",
        error: false,
        errorMessages: '',
        showPassword: false,
        isSignInDisabled: false,
        confirmationEmail: "",
        displayConfirmationEmailActivator: false,
        displayConfirmationEmailModal: false,
        isLoading: false,
        rules: {
            required: (value) => (value && Boolean(value)) || 'Required'
        }
    }),
    methods: {
        async submit() {
            if (this.$refs.form.validate()) {
                this.isLoading = true
                this.isSignInDisabled = true
                await this.login(this.email, this.password)
                this.isLoading = false
                this.isSignInDisabled = false
            }
        },
        resendConfirmationEmail() {
            this.$axios.$post(`api/user/sendconfirmationemail`, {
                email: this.email
            }).then(() => {
                this.$notifySuccess("Verification Email sent successfully")

            }).catch(err => {
                this.$notifyError(`Error: ${err.message}`)
                return
            })

        },
        displayErrors(errorCode) {
            let err = "An unknow error occured :(";
            switch (errorCode) {
                case 'ERROR.USER_NOT_CONFIRMED':
                    err = "Email not confirmed"
                    this.displayConfirmationEmailActivator = true
                    break;
                case 'ERROR.BAD_CREDENTIALS':
                case 'ERROR.USER_NOT_FOUND':
                    err = "Bad credentials, try again !"
                    break;
                case 'ERROR.USER_DISABLED':
                    err = "Your accound has been disabled"
                    break;

            }
            this.errorMessages = err
        },
        async login(email, password) {
            console.log(`Login in: ${this.email}`)
            try {
                let response = await this.$auth
                    .loginWith('cookie', {
                        data: {
                            email,
                            password
                        }
                    })
                    .catch((err) => {
                        // eslint-disable-next-line no-console
                        this.error = true
                        this.displayErrors(err.response?.data.message)
                        // this.errorMessages = err.response?.data.message
                        this.password = ""
                        return err
                    })
                // let response = await this.$auth.loginWith('local', {
                //     data: {
                //         email: this.email,
                //         password: this.password
                //     }
                // })
                if (response && response.status == 200) {
                    this.$router.push('/dashboard/analytics')
                }
            } catch (err) {
                console.log(err)
            }
        },
        resetErrors() {
            this.error = false
            this.errorMessages = ''

            this.errorProvider = false
            this.errorProviderMessages = ''
        }
    }
}
</script>

<style scoped>
.login-background {
    background: rgb(2, 0, 36);
    /* background: linear-gradient(
        45deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(9, 121, 102, 1) 0%,
        rgba(0, 212, 255, 1) 100%
    ); */

    background: linear-gradient(
        45deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(218, 1, 58, 1) 0%,
        rgba(0, 213, 255, 1) 100%
    );
}
</style>
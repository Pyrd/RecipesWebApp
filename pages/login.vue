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
            <v-card>
                <v-card-title
                    class="text-h3 font-weight-black d-flex justify-center align-center"
                >Receipes</v-card-title>
                <v-card-actions class="px-4">
                    <v-form
                        v-model="formValid"
                        class="d-flex justify-center align-center flex-column"
                    >
                        <v-text-field solo v-model="email" label="E-mail"></v-text-field>
                        <v-text-field solo v-model="password" label="Password" type="password"></v-text-field>
                    </v-form>
                </v-card-actions>
                <v-card-actions class="px-4 py-4">
                    <v-btn block color="primary" @click.stop="login">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    layout: 'empty',
    auth: 'guest',
    data: () => ({
        formValid: true,
        email: "",
        password: "",
    }),
    methods: {
        async login() {
            console.log(`Login in: ${this.email}`)
            // const resp = await this.$axios.$post("auth/login", {
            //     email: this.email, password: this.password
            // })
            // console.log(JSON.stringify(resp))
            // this.$cookies.set('jwt', resp.access_token)
            // this.$store.commit('auth/setUser', resp.user)
            // this.$router.push('/')
            try {
                let response = await this.$auth
                    .loginWith('cookie', {
                        data: {
                            email: this.email,
                            password: this.password
                        }
                    })
                    .catch((err) => {
                        // eslint-disable-next-line no-console
                        console.error(err)
                        this.error = err.response?.data
                    })
                // let response = await this.$auth.loginWith('local', {
                //     data: {
                //         email: this.email,
                //         password: this.password
                //     }
                // })
                if (response.status == 200) {
                    this.$router.push('/')
                }
                console.log(response)
            } catch (err) {
                console.log(err)
            }
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
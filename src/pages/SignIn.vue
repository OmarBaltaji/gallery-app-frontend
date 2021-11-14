<template>
    <div class="screen-center-items">
        <Card class="p-p-5">
            <template #title>
                <div  class="p-text-center">
                    <h3 class="p-mb-5">Welcome to Gallery Management</h3>
                    <h4>Sign in straight away with Google!</h4>
                </div>
            </template>
            <template #content>
                <div class="p-text-center">
                    <button @click.prevent="login()" id="googleBtn">
                        <span class="icon"></span>
                        <span class="buttonText">Sign in with Google</span>
                    </button>
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSignedIn: false
        }
    },
    methods: {
        async login() {
            try {
                const auth = {
                    username: process.env.VUE_APP_CLIENT_ID,
                    password: process.env.VUE_APP_CLIENT_SECRET
                };

                const googleUser = await this.$gAuth.signIn()
                const tokenInfo = googleUser.getAuthResponse();
                const userProfile = googleUser.getBasicProfile();

                const formData = new FormData();
                formData.append('name', userProfile.Se);
                formData.append('username', userProfile.Tt);
                formData.append('oauth_uid', userProfile.hT);
                formData.append('password', tokenInfo.access_token);
                formData.append('grant_type', 'password');

                this.$guest.post('/signIn',  formData, { auth })
                .then((res) => {
                    console.log('response from server', res.data);
                    const token = JSON.parse(res.data[1]);
                    const expiresIn = token.expires_in * 1000;
                    const now = new Date();
                    const expireDate = new Date(now.getTime() + expiresIn);
                    this.$cookies.set('access_token', token.access_token, token.expires_in);
                    localStorage.setItem('expiresIn', expireDate);

                    this.$store.dispatch("login", expiresIn);
                });
            } catch (err) {
                console.error(err);
            }   
       
        },
    },
    created() {
        const token = this.$cookies.get('access_token');
        if (token) {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
    #googleBtn {
      display: inline-block;
      background: #4285F4;
      color: #fff;
      /* width: 190px; */
      padding: 0;
      border-radius: 5px;
      border: thin solid #888;
      box-shadow: 1px 1px 1px grey;
      white-space: nowrap;
    }
    #googleBtn:hover {
      cursor: pointer;
      background: rgba(66, 133, 244, .85);
    }
    #googleBtn:hover span.icon {
        background: url('../assets/btn_google_dark_pressed_ios.svg') transparent 0 50% no-repeat;
    }
    span.icon {
      background: url('../assets/btn_google_dark_normal_ios.svg') transparent 0 50% no-repeat;
      display: inline-block;
      vertical-align: middle;
      width: 45px;
      height: 45px;
    }
    span.buttonText {
      display: inline-block;
      vertical-align: middle;
      padding-left: 30px;
      padding-right: 30px;
      font-size: 14px;
      font-weight: bold;
      font-family: 'Roboto', sans-serif;
    }
</style>
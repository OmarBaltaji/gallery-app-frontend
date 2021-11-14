<template>
  <div id="app">
    <Menubar :model="items" :key="loggedIn">
      <template #start>
          <div class="p-d-flex p-ai-center p-pl-4 p-mr-3">
            <h2>Gallery</h2>
            <img alt="logo" src="./assets/logo.svg" height="40" class="p-mx-3">
          </div>
      </template>
      <template #end>
          <Button v-if="loggedIn" :key="loggedIn" label="Logout" icon="pi pi-power-off" class="p-button-info p-button-sm p-button-rounded" :style="{'margin-left': '0 .5em'}" @click="logout()"/>
      </template>
    </Menubar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      items: [
        {
          label:'Home',
          icon:'pi pi-fw pi-home',
          command: () => {
            if(this.$router.currentRoute.name !== 'Home') {
              this.$router.push('/')
            }
          },
          visible: () => this.loggedIn
        }
      ]
    }
  },
  methods: {
    async logout() {
      try {
          await this.$gAuth.signOut();
          this.$cookies.remove('access_token');
          this.items.splice(0);
          this.$store.dispatch('logout');
      } catch (err) {
          console.error(err);
      }
      
    }
  },
  created() {
    const token = this.$cookies.get('access_token');
    const expires = localStorage.getItem('expiresIn');

    if(expires && token) {
      let expiresMs = new Date(expires);
      let now = new Date();
      now = now.getTime();
      expiresMs = expiresMs.getTime();
      if(now > expiresMs) {
        this.$store.dispatch('logout');
      } else {
        this.$store.dispatch('login', expiresMs - now)
        console.log(this.items);
      }
    } else {
      if(this.$router.currentRoute.name !== 'SignIn') {
        this.$router.push('/signin');
      }
    }
  }, 
  computed: {
    loggedIn() {
      return this.$store.getters.loginState;
    }
  },
  updated() {
    if(this.loggedIn && this.items.length === 0) {
      this.items.push({
        label:'Home',
        icon:'pi pi-fw pi-home',
        command: () => {
          if(this.$router.currentRoute.name !== 'Home') {
            this.$router.push('/')
          }
        },
        visible: () => this.loggedIn
      });
    }
  }
}
</script>

<style>
  body {
    padding: 0;
    margin: 0;
    font-family:  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background: url('./assets/background12.jpg') no-repeat center center; 
    background-size: cover;
  }

  .screen-center-items {
    height: 100vh;
    display: grid;
    place-items: center;
  }

  .text-underline{ 
    text-decoration: underline;
  }

  .p-card {
    border-radius: 45px !important;
  }

  .p-fileupload-choose {
    border-radius: 2rem !important;
  }

  h2 {
    margin: 0;
  }
</style>

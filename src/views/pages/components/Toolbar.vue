<template>
  <v-card
    color="grey lighten-4"
    flat
    height="50px"
    tile
  >
    <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <a href="#" @click="signUp">
          <i class="fas fa-sign-out-alt"></i>
          Cerrar sesión
      </a>
    </v-toolbar>
  </v-card>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        name: 'Toolbar',
        data() {
            return {

            }
        },
        methods: {
          ...mapActions('auth', ['signOut']),
          signUp() {
            this.signOut();
            this.$router.push('auth/login');
          }
        }
    }
</script>
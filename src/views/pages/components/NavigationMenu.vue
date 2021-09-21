<template>
  <v-card height="100vh" width="256px">
    <v-navigation-drawer
      absolute
      permanent
      left
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img v-if="loggedInUser.image" :src="'data:image/jpeg;base64, ' + loggedInUser.image">
            <img v-else src="@/assets/images/user_profile.png">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ loggedInUser.name }} {{ loggedInUser.surname }}</v-list-item-title>
            <v-list-item-subtitle>Conectado</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { roles } from '@/data/enum';
  export default {
    name: 'NavigationMenu',
    data () {
        return {
            items: [
              { title: 'Home', icon: 'mdi-home-city' },
              { title: 'My Account', icon: 'mdi-account' },
              { title: 'Users', icon: 'mdi-account-group-outline' }
            ],
        }
    },
    computed: {
      ...mapGetters('auth', ['loggedInUser'])
    },
    beforeMount() {
        if (this.loggedInUser.userRoleId === roles.NORMAL_USER) {
            this.items = [
              { title: 'Mis direcciones', icon: 'mdi-home-city' },
            ]
        } else {
          this.items = [
              { title: 'Usuarios', icon: 'mdi-account-group-outline' }
            ]
        }
    }
  }
</script>

<style scoped>
  .v-avatar, .v-list-item__icon {
    margin-right: 5px;
  }
</style>
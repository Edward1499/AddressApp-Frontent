<template>
      <div class="d-flex main">
        <div style="width: 256px;">
            <NavigationMenu />
        </div>
        <div style="width: 100%; d-flex flex-column">
            <div>
                <Toolbar />
            </div>
            <div class="page-container">
                <div class="content">
                    <router-view />
                </div>
            </div>
        </div>
      </div>
</template>

<script>
  import NavigationMenu from './components/NavigationMenu';
  import Toolbar from './components/Toolbar';
  import { roles } from '@/data/enum';
  import { mapGetters } from 'vuex';
  export default {
    components: { NavigationMenu, Toolbar },
    data () {
      return {

      }
    },
    computed: {
        ...mapGetters('auth', ['loggedInUser'])
    },
    beforeMount() {
        if (this.loggedInUser.userRoleId === roles.NORMAL_USER) {
            this.$router.push('user-address-list');
        } else {
            this.$router.push('admin-user-list');
        }
    }
  }
</script>

<style scoped>
    .main {
        background-color: #80808014;
        overflow: hidden;
    }
    .page-container {
        /*background-color: green; */
        padding: 25px;
        height: 100%;
        width: auto;
    }
    .content {
        box-shadow: 5px 5px 20px 5px rgba(0,0,0,0.45);
        border-radius: 10px;
        overflow: hidden;
        background-color: #fff;
        height: 90%;
        padding: 15px;
    }
</style>
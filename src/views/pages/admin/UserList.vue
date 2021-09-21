<template>
  <div data-app>
    <h3>Listado de usuarios</h3>
    <hr>
    <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="5"
    class="elevation-1"
    >
    <template v-slot:item.id="{ item }">
      <a @click="openDialog(true, item)">
        <i class="fas fa-lock" title="Bloquear"></i>
      </a>
      <a @click="openDialog(false, item)">
        <i class="fas fa-unlock" title="Desbloquear"></i>
      </a>
    </template>
    </v-data-table>
    <ConfirmationDialog 
        v-on:close="closeModals" 
        :dialog="dialog" 
        :lockUser="lockUser" 
        :currentUser="currentUser" />
  </div>
</template>

<script>
    import axios from 'axios';
    import ConfirmationDialog from './components/ConfirmationDialog';
    export default {
        name: 'UserList',
        components: { ConfirmationDialog },
        data() {
            return {
                lockUser: false,
                dialog: false,
                currentUser: null,
                users: [],
                headers: [
                    {
                        text: 'Nombre',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    { text: 'Apellido', value: 'surname' },
                    { text: 'Correo electrónico', value: 'email' },
                    { text: 'Estado', value: 'status' },
                    { text: 'Acciones', value: 'id' },
                ],
            }
        },
        methods: {
            openDialog(lock, item) {
                this.lockUser = lock;
                this.currentUser = item;
                this.dialog = true;
            },
            closeModals() {
                this.dialog = false;
                this.getUsers();
            },
            getUsers() {
                this.axios.get('users')
                .then(({data}) => {
                    this.users = data;
                });
            }
        },
        mounted() {
            this.getUsers();
        }
    }
</script>
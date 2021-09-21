<template>
  <div data-app>
    <h3>Listado de direcciones</h3>
    <hr>
    <div class="d-flex flex-row-reverse">
        <button class="btn btn-primary"
                @click="dialog = true">
            <i class="fas fa-plus color-white"></i>
            Agregar
        </button>
    </div>
    <v-data-table
    :headers="headers"
    :items="addresses"
    :items-per-page="5"
    class="elevation-1"
    >
        <template v-slot:item.id="{ item }">
      <a @click="viewDetail(item)">
        <i class="fas fa-eye mr-2" title="Ver detalle"></i>
      </a>
      <a @click="openEditModal(item)">
            <i class="fas fa-edit mr-2" title="Editar"></i>
      </a>
          <a @click="openDeleteDialog(item)">
            <i class="fas fa-trash mr-2" title="Eliminar"></i>
          </a>
    </template>
    </v-data-table>
    <AddModal :dialog="dialog" v-on:close="closeModals" />
    <DetailModal :dialogDetail="detailDialog" v-on:close="closeModals" :address="currentAddress" />
    <EditModal :dialog="editDialog" v-on:close="closeModals" :address="currentAddress" />
    <DeleteDialog :dialog="deletDialog" v-on:close="closeModals" :address="currentAddress" />
  </div>
</template>

<script>
  import axios from 'axios';
  import AddModal from './components/AddModal';
  import DetailModal from './components/DetailModal';
  import EditModal from './components/EditModal';
  import DeleteDialog from './components/DeleteDialog';
  import { mapGetters } from 'vuex';
  export default {
    components: { AddModal, DetailModal, EditModal, DeleteDialog },
    data () {
      return {
        dialog: false,
        detailDialog: false,
        editDialog: false,
        deletDialog: false,
        currentAddress: null,
        headers: [
          {
            text: 'País',
            align: 'start',
            sortable: false,
            value: 'country',
          },
          { text: 'Ciudad', value: 'city' },
          { text: 'Calle', value: 'street' },
          { text: 'Sector', value: 'sector' },
          { text: 'Acciones', value: 'id' },
        ],
        addresses: [],
      }
    },
    computed: {
        ...mapGetters('auth', ['loggedInUser'])
    },
    methods: {
        viewDetail(item) {
            this.currentAddress = item;
            this.detailDialog = true;
        },
        openEditModal(item) {
            this.currentAddress = {...item};
            this.editDialog = true;
        },
        openDeleteDialog(item) {
          this.currentAddress = {...item};
          this.deletDialog = true;
        },
        closeModals() {
            this.dialog = false;
            this.detailDialog = false;
            this.editDialog = false;
            this.deletDialog = false;
            this.getAddresses();
        },
        getAddresses() {
            this.axios.get(`addresses/GetAllByUserId/${this.loggedInUser.id}`)
            .then(({data}) => {
                this.addresses = data;
            })
        }
    },
    mounted() {
        this.getAddresses();
    },
  }
</script>
<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogProp"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text">
          ¿Esta seguro que desea eliminar esta dirección?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="$emit('close')"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteAddress"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'DeleteDialog',
    props: ['dialog', 'address'],
    data () {
      return {
      }
    },
    methods: {
        deleteAddress() {
            this.axios.delete(`addresses/${this.address.id}`)
                .then(success => {
                    this.$emit('close');
                });
        }
    },
    computed: {
        dialogProp: {
            get () { return this.dialog },
            set (value) { this.$emit('update:dialog', value) },
        },
    }
  }
</script>
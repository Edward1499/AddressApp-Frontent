<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogProp"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text">
          ¿Esta seguro que desea realizar esta operacion?
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
            @click="action"
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
    name: 'ConfirmationDialog',
    props: ['dialog', 'lockUser', 'currentUser'],
    data () {
      return {
      }
    },
    methods: {
        action() {
            console.log(this.lockUser)
            if (this.lockUser) {
                this.axios.get(`users/disable/${this.currentUser.id}`)
                .then(() => {
                    this.$emit('close');
                });
            } else {
                this.axios.get(`users/enable/${this.currentUser.id}`)
                .then(() => {
                    this.$emit('close');
                });
            }
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
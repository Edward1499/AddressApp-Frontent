<template>
  <v-row justify="center">
    <v-dialog
      v-model="propModel"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Agregar dirección</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-select
                  v-model="countryId"
                  :items="countries"
                  item-text="name"
                  item-value="id"
                  label="País*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="city"
                  label="Ciudad*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="street"
                  label="Calle*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="sector"
                  label="Sector*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="reference"
                  label="Referencia de la dirección*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="postalCode"
                  label="Código postal*"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              
            </v-row>
          </v-container>
          <small>*Indica campos obligatorios.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeModal"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  export default {
    name: 'AddModal',
    props: ['dialog'],
    data: () => ({
        countries: [],
        countryId: 0,
        city: '',
        street: '',
        sector: '',
        reference: '',
        postalCode: null
    }),
    methods: {
        closeModal() {
          this.clearFields();
          this.$emit('close');
        },
        save() {
            const request = {
                countryId: this.countryId,
                userId: this.loggedInUser.id,
                city: this.city,
                street: this.street,
                sector: this.sector,
                reference: this.reference,
                postalCode: +this.postalCode
            }
            this.axios.post('addresses', request)
                .then(success => {
                    this.clearFields();
                    this.$emit('close');
                });
        },
        clearFields() {
          this.countryId = 0;
          this.city = '';
          this.street = '';
          this.sector = '';
          this.reference = '';
          this.postalCode = null;
        }
    },
    computed: {
        ...mapGetters('auth', ['loggedInUser']),
        propModel: {
            get () { return this.dialog },
            set (value) { this.$emit('update:dialog', value) },
        },
    },
    mounted() {
        this.axios.get('countries')
            .then(({data}) => {
                this.countries = data;
            })
    },
  }
</script>
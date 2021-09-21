<template>
  <v-row justify="center" v-if="addressProp">
    <v-dialog
      v-model="dialogProp"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar dirección</span>
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
                  v-model="addressProp.countryId"
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
                  v-model="addressProp.city"
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
                  v-model="addressProp.street"
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
                  v-model="addressProp.sector"
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
                  v-model="addressProp.reference"
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
                  v-model="addressProp.postalCode"
                  label="Código postal*"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('close')"
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
  export default {
    name: 'EditModal',
    props: ['dialog', 'address'],
    data: () => ({
        countries: [],
    }),
    computed: {
        dialogProp: {
            get () { return this.dialog },
            set (value) { this.$emit('update:dialog', value) },
        },
        addressProp: {
            get () { return this.address },
            set (value) { this.$emit('update:address', value) },
        }
    },
    methods: {
        save() {
            const request = {
                id: this.address.id,
                countryId: this.address.countryId,
                city: this.address.city,
                street: this.address.street,
                sector: this.address.sector,
                reference: this.address.reference,
                postalCode: +this.address.postalCode
            }
            this.axios.put('addresses', request)
                .then(success => {
                    this.$emit('close');
                });
        }
    },
    mounted() {
        this.axios.get('countries')
            .then(({data}) => {
                this.countries = data;
            });
    }
  }
</script>
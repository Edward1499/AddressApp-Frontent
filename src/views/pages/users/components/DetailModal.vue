<template>
  <v-row justify="center" v-if="addressProp">
    <v-dialog
      v-model="dialogProp"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Detalle de la dirección</span>
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'DetailModal',
    props: ['dialogDetail', 'address'],
    data: () => ({
        countries: [],
    }),
    computed: {
        dialogProp: {
            get () { return this.dialogDetail },
            set (value) { this.$emit('update:dialogDetail', value) },
        },
        addressProp: {
            get () { return this.address },
            set (value) { this.$emit('update:address', value) },
        }
    },
    mounted() {
        this.axios.get('countries')
            .then(({data}) => {
                this.countries = data;
            })
    }
  }
</script>
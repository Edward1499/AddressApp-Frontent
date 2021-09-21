<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

    <div class="d-flex justify-content-center">
        <img src="@/assets/images/oriontek.jpg" />
    </div>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Correo electrónico"
      required
    ></v-text-field>


    <v-text-field
            v-model="password"
            :type="'password'"
            name="input-10-1"
            label="Contraseña"
            required
          ></v-text-field>


  <div class="d-flex flex-column align-items-center">
    <v-btn
      rounded
      color="primary"
      dark
      style="background-color: #9e69db"
      class="d-flex"
      @click="save"
    >
      Iniciar Sesión
    </v-btn>
    <span class="mt-3">
      ¿No tienes una cuenta? 
      <router-link :to="{ name: 'Register' }">
        <a href="#">Registrate aqui.</a>
      </router-link>
    </span>
  </div>          
  </v-form>
</template>

<script>
  import axios from 'axios';
  import { mapActions } from 'vuex';
  import Swal from 'sweetalert2';
  export default {
    name: 'Login',
    data: () => ({
      show1: false,
      valid: true,
      password: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }),

    methods: {
      ...mapActions('auth', ['login']), 
      save() {
          const request = {
              email: this.email,
              password: this.password
          }
          this.axios.post('users/login', request)
            .then(({data}) => {
                this.login(data);
                this.$router.push("/");
            })
            .catch(({response}) => {
                console.log(response.data)
                Swal.fire(response.data.Error);
            })
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
    mounted(){
    }
  }
</script>


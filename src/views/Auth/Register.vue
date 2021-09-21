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
      label="Nombre"
      v-model="name"
      required
    ></v-text-field>

    <v-text-field
      label="Apellido"
      v-model="surname"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
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

    <template>
        <v-file-input
            v-model="photo"
            accept="image/*"
            label="Subir imagen"
        ></v-file-input>
    </template>


  <div class="d-flex flex-column align-items-center">
    <v-btn
      rounded
      color="primary"
      dark
      style="background-color: #9e69db"
      class="d-flex"
      @click="save"
    >
      Registrarse
    </v-btn>
    <span class="mt-3">
      ¿Ya tienes una cuenta? 
      <router-link :to="{ name: 'Login' }">
        <a href="#">Ingresa aqui.</a>
      </router-link>
    </span>
  </div>          
  </v-form>
</template>

<script>
    import axios from 'axios';
    import { mapActions } from 'vuex';
    export default {
        name: 'AuthRegister',
        data () {
            return {
                valid: true,
                name: '',
                surname: '',
                email: '',
                password: '',
                photo: null
            }
        },
        methods: {
            ...mapActions('auth', ['login']),
            save() {
                const request = new FormData();
                request.append('name', this.name);
                request.append('surname', this.surname);
                request.append('email', this.email);
                request.append('password', this.password);
                request.append('photo', this.photo);

                this.axios.post('users', request)
                    .then(({data}) => {
                        this.login(data);
                        this.$router.push("/");
                    })
            }
        }
    }
</script>
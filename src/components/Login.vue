<template>
  <div class="login-container">


                <form class="login" @submit.prevent="login">
                  <div class="login-inputs">
                <input type="text" name="username" required v-model="username" placeholder="Username"/>
                <input type="password" name="password" required v-model="password" placeholder="Password"/>
                  </div>

                     <button class="login-greybtn" type="submit">login</button>
                </form>

        <p style="color:red; text-align: center" v-show="errorText"> {{ errorText }}</p>

  </div>



</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {
      username: '',
      password: '',
      errorText: ''
    }
  },

  name: 'Login',

  methods: {

    login: function () {

        axios.post('https://debbskitchen-server.herokuapp.com/login', {
            username: this.username,
            password: this.password
        },
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }

        }).then(response =>{
            this.$store.commit('AUTH_SUCCESS', { token: response.data.token });
            this.$router.push('/');

            }).catch(error => {
            this.errorText = error.response.data.message;

    })
    }

  }

}

</script>
<style>

.login-container {
  display: grid;
  justify-content: center;
align-content: flex-start;

  text-align: center;
  min-height: 400px;

}


  .login{
  display: grid;
  grid-gap: 25px;
  padding: 20px;
  justify-content: center;
  align-content: center;
  border-radius: 8px;


  }

  .login input {
  padding: 6px 12px;
    border: 1px solid #848484;
  font-size: 16px;
  border-radius: 4px;

}


.login-inputs {
  display: grid;
grid-gap: 15px;
}

.login-greybtn {
  background-color: #848484;
  border: 1px solid #848484;
  color: #fff;
border-radius: 4px;
padding: 6px 8px;
font-size: 16px;
cursor: pointer;
font-family: 'Roboto';
  font-weight: 300;
   transition: 0.2s;
   letter-spacing: 0.03em;
 }


 .login-greybtn:hover {

   background-color: #ddd;
   border: 1px solid #ddd;
   color: #222;


 }


</style>


<template>
  <div class="back">
    <span>
      <div class="div-center">
        <div class="content" style="margin: 0 auto;text-align: center;">
          <span>
            <img src="/logo.png" alt="Secretária Virtual" />
          </span>

          <h3>Login</h3>
          <hr />
          <Form
            @submit="handleLogin"
            :validation-schema="schema"
            style="margin: 0 auto;text-align: left;"
          >
            <div class="form-group">
              <label for="username">E-mail</label>
              <Field name="username" type="text" class="form-control" />
              <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="password">Senha</label>
              <Field name="password" type="password" class="form-control" />
              <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Login</span>
              </button>
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
            </div>
          </Form>
        </div>
      </div>
    </span>
  </div>
</template>

<script>

import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Email é obrigatório"),
      password: yup.string().required("Senha é obrigatório"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {

      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },

  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          console.log("login success");

          window.location.href = "/";


        },
        (error) => {
          console.log(error.msg);
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.msg ||
            error.toString();
        }
      );
    },
  },
};

</script>

<style scoped>
.back {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  padding: 5em 2em;
}
.content .logo {
  margin: 0 auto;

  text-align: center;
}
.div-center {
  width: 50%;
  height: 10%;
  background-color: #fff;
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  padding: 1em 2em;
  border-bottom: 2px solid #ccc;
  display: table;
}

div.content {
  display: table-cell;
  vertical-align: middle;
}
</style>


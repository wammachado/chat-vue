
<style scoped>
img,
video {
  max-width: 100%;
  max-height: 100%;
}
</style>
<script>
import api from '@/services/api.js';
$("a").click(function (event) {
  event.preventDefault();
  //Do your logic here
});

export default {
  name: 'conversation',
  props: [
    'updateChat',
    'conversation',
    'contacts'
  ],
  data() {
    return {
      chat: this.conversation,
      updateChat: this.updateChat,
      messages: '',
      user: JSON.parse(localStorage.getItem('user')),
      validateName: this.$store.state.answerInput,

      errorName: 1,
      contacts: this.contacts,
    };
  },
  created: function () {
    this.getChat();
  },


  updated() {
    // whenever data changes and the component re-renders, this is called.
    this.$nextTick(() => this.scrollToEnd());
  },


  methods: {
    scrollToEnd: function () {
      // scroll to the start of the last message
      var objDiv = document.getElementById("conversation");
      objDiv.scrollTop = objDiv.scrollHeight;
    },
    getChat() {
      api.post("/conversa", { slug: this.user.slug, aten_id: this.conversation.aten_id, chatId: this.conversation.chatId })
        .then((res) => {
          this.messages = res.data;
          res.data.forEach(function (msg) {

            //exibir hora e minuto se o dia for o mesmo se for diferente exibir dia e mes
            var currentDate = new Date();
            var conversaDate = new Date(msg.created);

            if (conversaDate.getDate() == currentDate.getDate()) {
              res.data[res.data.indexOf(msg)].created = conversaDate.getHours() + ':' + conversaDate.getMinutes();
            }
          });

        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendMsg() {
      var msg = document.getElementById("comment").value;

      if (msg.replace(/\s/g, '').length > 0) {
        var sendmsg = {
          "chatId": this.chat.chatId,
          "telefone": this.chat.telefone,
          "slug": this.user.slug,
          "aten_id": this.user.aten_id,
          "transferida": 0,
          "nome_cliente": this.chat.nome_cliente,
          "mensagem": msg,
        }

        api.post("/send", sendmsg)
          .then((res) => {
            console.log(this.chat.aten_id, this.user.aten_id);
            if (res.data.error != 1) {
              console.log(res.data);
              document.getElementById("comment").value = '';
            }

            this.getChat();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    save: function () {

      if (document.getElementById("clientName").value != '') {
        this.saveName();
      }
      if (document.getElementById("contacts").value != '') {
        this.transferirAtendimento();


      }
    },
    transferirAtendimento() {
      var contact = document.getElementById("contacts").value.split(',');
      var transferir = {

        "chatId": this.chat.chatId,
        "slug": this.user.slug,
        "aten_id": this.user.aten_id,
        "hist_id": -1, //MANDAR SEMPRE COMO -1
        "ativa": 1,
        "nome_cliente": this.chat.nome_cliente,
        "aten_id_transfere": contact[0], //ID DO USUARIO QUE ESTOU TRANSFERINDO
        "ramal": contact[1], //RAMAL DO USUARIO QUE ESTOU TRANSFERINDO

      };

      api.post("/transfer", transferir)
        .then((res) => {
          console.log(res.data);

          this.getChat();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveName: function () {
      if (this.errorName == 0) {


        document.getElementById("alert-msg-name-success").style.display = "block";
        document.getElementById("alert-msg-name-success").innerHTML = 'O nome foi alterado com sucesso!';

        var ChangeName = {
          "chatId": this.chat.chatId,
          "clie_id": this.user.clie_id,
          "nome_cliente": document.getElementById("clientName").value,

        }
        console.log(JSON.stringify(ChangeName));

        api.post("/salva_nome", ChangeName)
          .then((res) => {
            console.log(res.data);
            this.$emit('child-method', ChangeName)
            //close myModal
            jQuery.noConflict();
            $('#exampleModal').modal('hide')

            this.getChat();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    finalizaAtendimento() {
      var finaliza = {
        "transferencia": 1,
        "hist_id": -1,
        "chatId": this.chat.chatId,
        "slug": this.user.slug,
        "aten_id": this.user.aten_id,
        "nome_cliente": this.chat.nome_cliente,

      };

      api.post("/finaliza_atendimento", finaliza)
        .then((res) => {
          console.log(res.data);
          this.getChat();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    validateName() {
      var name = document.getElementById("clientName").value;

      //if para verificar se contem nome e sobrenome com 3 carcter ou mias
      var error = 0;
      if (name.split(' ').length > 1) {
        name.split(' ').forEach(function (nome) {

          if (nome.length > 3) {
            document.getElementById("alert-msg-name-danger").style.display = "none";
            error = 0

          } else {
            error = 1
            document.getElementById("alert-msg-name-danger").style.display = "block";
            document.getElementById("alert-msg-name-danger").innerHTML = 'O nome e sobre nome devem ter mais de 3 caracteres';
            console.log('O nome e sobre nome devem ter mais de 3 caracteres');
          }
        });

      } else {
        document.getElementById("alert-msg-name-danger").style.display = "block";
        document.getElementById("alert-msg-name-danger").innerHTML = 'O nome deve conter nome e sobrenome';
        console.log('O nome deve conter nome e sobrenome');
        error = 1
      }
      this.errorName = error;
    },
    updateChat() {
      console.log('update');
      this.getChat();
    }
  }

}
</script>



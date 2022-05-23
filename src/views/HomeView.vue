<script setup>
//import Side from '@/components/Side.vue'
import { defineAsyncComponent } from "vue";

</script>

<template>

    <div>
        <!--SideChat-->
        <div class="col-sm-4 side">
            <div class="side-one">
                <div class="row heading">
                    <div class="col-sm-8 col-xs-8 heading-avatar">
                        <div class="heading-avatar-icon">
                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                            {{ user.nome }}
                        </div>
                    </div>

                    <div class="col-sm-1 col-xs-1 heading-dot pull-right">
                        <i class="fa fa-sign-out fa-2x pull-right" @click.prevent="logOut" aria-hidden="true"></i>
                    </div>
                    <div class="col-sm-2 col-xs-2 heading-compose pull-right">
                        <i class="fa fa-comments fa-2x pull-right" aria-hidden="true"></i>
                    </div>
                </div>


                <div class="row searchBox">
                    <div class="col-sm-12 searchBox-inner">
                        <div class="form-group has-feedback">
                            <select class="form-control" id="selectSlug" v-model="selectSlug"
                                @change="onChange($event)">
                                <option v-for="slug in slugs" :key="slug.clie_id" :value="slug.cs_descricao">
                                    {{ slug.clie_nome_fantasia }} - {{ slug.clie_id }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row searchBox">
                    <div class="col-sm-12 searchBox-inner">
                        <div class="form-group has-feedback">
                            <input id="procurar" type="text" class="form-control" name="Procurar"
                                @keydown.enter.exact.prevent @keyup.enter.exact="procurarF" placeholder="Procurar" />

                            <span class="form-control-feedback procurar" style="cursor: pointer;" id="basic-addon1"
                                @click.prevent="procurarF">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-search" viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="row sideBar">
                    <!-- SideConversation-->

                    <div class="row sideBar-body" v-for="SideConversation in filteredList"
                        v-bind:id="SideConversation.chatId" v-on:click="selectonversation(SideConversation)"
                        :key="SideConversation.name">
                        <div class="col-sm-3 col-xs-3 sideBar-avatar">
                            <div class="avatar-icon">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" />

                            </div>
                        </div>
                        <div class="col-sm-9 col-xs-9 sideBar-main">
                            <div class="row">
                                <div class="col-sm-8 col-xs-8 sideBar-name"
                                    :style="SideConversation.nao_lidas > 0 ? 'font-weight: bold;' : ''">
                                    <span class="name-meta">
                                        {{
                                                SideConversation.nome_cliente ?? (SideConversation.telefone.length == 12 ?
                                                    SideConversation.
                                                        telefone.
                                                        replace(/^(\d{2})(\d{2})(\d{4})(\d{4})$/, '($2)$3 - $4') :
                                                    SideConversation.telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'))
                                        }}

                                        <span v-if="SideConversation.nao_lidas > 0"
                                            style="min-width: 10px;padding: 3px 7px;font-size: 12px;font-weight: 700;line-height: 1;color: #fff;text-align: center;white-space: nowrap;vertical-align: middle;background-color: #00a884;border-radius: 10px;">
                                            {{ SideConversation.nao_lidas }}
                                        </span>
                                    </span>
                                    <p v-if="SideConversation.type == 'image'">
                                        <i class="fa fa-picture-o" aria-hidden="true"></i> Foto
                                    </p>
                                    <p v-else-if="SideConversation.type == 'video'">
                                        <i class="fa fa-video-camera" aria-hidden="true"></i> Video
                                    </p>
                                    <p v-else-if="SideConversation.type == 'ptt'">
                                        <i class="fa fa-microphone" aria-hidden="true"></i> Audio
                                    </p>
                                    <p v-else>{{ SideConversation.message }}</p>
                                </div>
                                <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                    <span class="time-meta pull-right">
                                        {{
                                                //exibir hora e minuto se o dia for o mesmo se for diferente exibir dia e mes
                                                SideConversation.created
                                        }}
                                    </span>
                                    <!-- menssagens nao lida-->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SideConversation end-->
                </div>
            </div>

            <div class="side-two">
                <div class="row newMessage-heading">
                    <div class="row newMessage-main">
                        <div class="col-sm-2 col-xs-2 newMessage-back">
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                        </div>
                        <div class="col-sm-10 col-xs-10 newMessage-title">Nova Conversa</div>
                    </div>
                </div>

                <div class="row compose-sideBar">
                    <!--New Chat-->
                    <div class="row sideBar-2">
                        <div class="col-sm-12 col-xs-12">
                            <div class="row">
                                <p class="text-justify">Para quem você que enviar uma mensagem?</p>
                                <p class="text-justify">
                                    (Atenção o número do WhatsApp pode ou não ter o
                                    <b>9º Digito!</b> sempre confirme antes de enviar a mensagem!)
                                </p>

                                <input type="text" class="form-control" placeholder="(99) 9 9999-9999"
                                    v-mask="'(##) # #### #####'" id="telefoneMsg" aria-label="Numero"
                                    @keydown.enter.exact.prevent @keyup.enter.exact="enviarMsg"
                                    aria-describedby="basic-addon2" />
                                <div class="input-group-append col-sm-12 col-xs-12 text-center">
                                    <button class="btn btn-outline-secondary" v-on:click="enviarMsg" id="enviarMsg"
                                        type="button">Enviar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--New Chat end-->
                </div>
                <div class="row sideBar">
                    <!-- SideConversation-->

                    <div class="row sideBar-body"></div>
                </div>
            </div>
        </div>
        <!--SideChat end-->

        <!-- conversation -->
        <div class="col-sm-8 conversation" v-if="ConversationChat != ''">
            <div class="row heading">
                <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                    <div class="heading-avatar-icon">
                        <img src="https://bootdey.com/img/Content/avatar/avatar6.png" />
                    </div>
                </div>
                <div class="col-sm-8 col-xs-7 heading-name">
                    <label class="heading-name-meta">{{ ConversationChat.nome_cliente ??
                            (ConversationChat.telefone.length
                                == 12 ? ConversationChat.telefone.replace(/^(\d{2})(\d{2})(\d{4})(\d{4})$/, '($2) $3-$4') :
                                ConversationChat.telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'))
                    }}</label>
                </div>
                <div class="col-sm-1 col-xs-1 heading-dot pull-right" data-toggle="modal" data-target="#editModal">
                    <i class="fa fa-pencil-square-o fa-2x pull-right" aria-hidden="true"></i>
                </div>
            </div>

            <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" ref="vuemodal" id="modal" role="document" style="height: auto;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editModalLabel">Editar Contato</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <br />
                                <div class="col-sm-6">
                                    <label for="clientName" class="col-form-label">Nome:</label>
                                    <input type="text" class="form-control col-sm-6" id="clientName" :value="ConversationChat.nome_cliente ??
                                (ConversationChat.telefone.length
                                    == 12 ? ConversationChat.telefone.replace(/^(\d{2})(\d{2})(\d{4})(\d{4})$/, '($2) $3-$4') :
                                    ConversationChat.telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'))"
                                        @keydown.enter.exact.prevent @keyup.enter.exact="validateName" />
                                </div>
                                <div class="form-group" style="padding-left:15px;">
                                    <br />
                                    <div id="alert-msg-name-success" style="display:none;"
                                        class="form-group col-sm-12 alert alert-success form-group" role="alert"></div>
                                    <div id="alert-msg-name-danger" style="display:none;"
                                        class="form-group col-sm-12 alert alert-danger form-group" role="alert"></div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <!--botton finalizar-->
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group col-sm-8">
                                    <label for="contacts" class="col-form-label">Transferir Atendimento</label>
                                    <select class="form-control" id="contacts">
                                        <option value selected>Selecione um usuário</option>
                                        <option v-for="contact in contacts" :key="contact.aten_id"
                                            :value="[contact.aten_id, contact.aten_ramal]">{{ contact.aten_nome }} -
                                            {{ contact.aten_ramal }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-sm-6"></div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="save">Salvar Alterações</button>
                            <button style="text-align:left" type="button" class="btn btn-danger" data-dismiss="modal"
                                @click="finalizaAtendimento">Finalizar Atendimento</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row message" id="conversation">
                <span v-for="messageBody in messages" :key="messageBody.name">
                    <span v-if="messageBody.type == 'image'">
                        <div class="row message-body" v-if="messageBody.secretaria == 0">
                            <div class="col-sm-12 message-main-receiver">
                                <div class="receiver">
                                    <div class="message-text">
                                        <img :src="messageBody.message" />
                                    </div>
                                    <span class="message-time pull-right">{{ messageBody.created }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row message-body" v-if="messageBody.secretaria == 1">
                            <div class="col-sm-12 message-main-sender">
                                <div class="sender">
                                    <div class="message-text">
                                        <img :src="messageBody.message" />
                                    </div>
                                    <span class="message-time pull-right">{{ messageBody.created }}</span>
                                </div>
                            </div>
                        </div>
                    </span>
                    <span v-else-if="messageBody.type == 'video'">
                        <div class="row message-body" v-if="messageBody.secretaria == 0">
                            <div class="col-sm-12 message-main-receiver">
                                <div class="receiver">
                                    <video controls>
                                        <source :src="messageBody.message" type="video/mp4" />
                                    </video>
                                    <span class="message-time pull-right">{{ messageBody.created }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row message-body" v-if="messageBody.secretaria == 1">
                            <div class="col-sm-12 message-main-sender">
                                <div class="sender">
                                    <div class="message-text">{{ messageBody.type }}</div>
                                    <span class="message-time pull-right">{{ messageBody.created }}</span>
                                </div>
                            </div>
                        </div>
                    </span>
                    <span v-else-if="messageBody.type == 'ptt'">
                        <div class="row message-body" v-if="messageBody.secretaria == 0">
                            <div class="col-sm-12 message-main-receiver">
                                <div class="receiver">
                                    <audio controls preload="auto">
                                        <source :src="messageBody.message" type="audio/webm" />
                                    </audio>
                                    <span class="message-time pull-right">{{ messageBody.created }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row message-body" v-if="messageBody.secretaria == 1">
                            <div class="col-sm-12 message-main-sender">
                                <div class="sender">
                                    <audio controls preload="auto">
                                        <source :src="messageBody.message" type="audio/webm" />
                                    </audio>
                                    <span class="message-time pull-right">{{ messageBody.created }}</span>
                                </div>
                            </div>
                        </div>
                    </span>
                    <span v-else>
                        <div class="row message-body" v-if="messageBody.secretaria == 0">
                            <div class="col-sm-12 message-main-receiver">
                                <div class="receiver">
                                    <div class="message-text">{{ messageBody.message }}</div>
                                    <span class="message-time pull-right">{{ messageBody.created }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row message-body" v-if="messageBody.secretaria == 1">
                            <div class="col-sm-12 message-main-sender">
                                <div class="sender">
                                    <div class="message-text">{{ messageBody.message }}</div>
                                    <span class="message-time pull-right">{{ messageBody.created }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row message-previous alert alert-info" v-if="messageBody.secretaria == 2">
                            <div class="col-sm-12 previous">
                                <p>{{ messageBody.message }}</p>
                            </div>
                        </div>
                    </span>
                </span>
                <div class="row message-previous alert alert-info" v-show="validated ? false : true">
                    <div class="col-sm-12 previous">
                        <span v-html="msgText"></span>
                    </div>
                    <div class="col-sm-12 previous">
                        <button type="button" class="btn btn-secondary" @click="assumeAtendimento">Sim</button>
                    </div>
                </div>
            </div>

            <div class="row reply">
                <!--
              <div class="col-sm-1 col-xs-1 reply-emojis">
                <i class="fa fa-smile-o fa-2x"></i>
              </div>
              <div class="col-sm-1 col-xs-1 reply-recording">
                <i class="fa fa-microphone fa-2x" aria-hidden="true"></i>
              </div>
                -->
                <div class="col-sm-11 col-xs-11 reply-main">
                    <textarea class="form-control" rows="1" id="comment" :disabled="validated ? false : true"
                        v-model="msgTextError" @keydown.enter.exact.prevent @keyup.enter.exact="sendMsg"
                        @keydown.enter.shift.exact="newline"></textarea>
                </div>

                <div class="col-sm-1 col-xs-1 reply-send" v-on:click="sendMsg">
                    <i class="fa fa-send fa-2x" aria-hidden="true"></i>
                </div>
            </div>

        </div>
        <!-- conversation end -->
    </div>

</template>
<style scoped>
img,
video {
    max-width: 100%;
    max-height: 100%;
}
</style>
<script>


import api from '@/services/api.js'
import { inject } from 'vue'



$(document).ready(function () {

    $(function () {
        $(".heading-compose").click(function () {
            console.log('Ready disparado');

            $(".side-two").css({
                "left": "0"
            });
        });

        $(".newMessage-back").click(function () {
            $(".side-two").css({
                "left": "-100%"
            });
        });
        $("#enviarMsg").click(function () {
            $(".side-two").css({
                "left": "-100%"
            });
        });
    })

});
export default {
    name: "Convers",
    data() {
        return {

            telefoneMsg: '',
            procurar: '',
            exibirLogs: true,
            SideConversations: [],
            ConversationChat: '',
            user: JSON.parse(localStorage.getItem('user')),
            contacts: null,
            slugs: null,
            selectSlug: null,
            messaging: null,
            messages: [],
            validated: false,
            msgTextError: '',

        };
    },
    updated() {
        // whenever data changes and the component re-renders, this is called.
        this.$nextTick(() => this.scrollToEnd());
    },
    created() {

        this.slugs = this.user.clie_id;
        this.selectSlug = this.user.clie_id[0].cs_descricao;
        console.log(this.user.clie_id);
        this.getConversations();
        var receiver = new BroadcastChannel('secretariavirtual');
        receiver.onmessage = function (event) {
            console.log(event.data);
            this.messages.push(event.data);
            //this.scrollToEnd();
            this.getChat();
            this.getContacts();
            this.getConversations();
            var audio = new Audio('/pop_1lzEdx1.mp3');
            audio.play();
        }.bind(this);



    },
    mounted() {



        this.$messaging.onMessage((payload) => {

            var att = false;

            this.SideConversations.forEach(conversa => {
                if (conversa.chatId == JSON.parse(payload.data.data).whatsapp.chatId) {
                    att = true;
                }
            });

            if (att) {
                if (this.exibirLogs) {
                    console.log('Mensagem recebida: ', JSON.parse(payload.data.data).whatsapp);
                }

                this.getChat();
                this.getContacts();
                this.getConversations();

            }

        });
    },
    setup() {
        const messaging = inject('messaging')


    },

    computed: {
        filteredList() {
            return this.SideConversations.filter(Conversations => {
                var nome = Conversations.nome_cliente
                var buscar = this.procurar
                if ((Conversations.nome_cliente ?? '').toLowerCase().includes((buscar ?? '').toLowerCase())) {
                    return true
                }
                if ((Conversations.telefone ?? '').toLowerCase().includes((buscar ?? '').toLowerCase())) {
                    return true
                }
                return false

            })
        },
    },
    methods: {
        onChange(event) {
            this.selectSlug = event.target.value;
            this.getChat();
            this.getContacts();
            this.getConversations();

        },
        validateName() {
            console.log('validateName');
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

                    }
                });

            } else {
                document.getElementById("alert-msg-name-danger").style.display = "block";
                document.getElementById("alert-msg-name-danger").innerHTML = 'O nome deve conter nome e sobrenome';

                error = 1
            }
            this.errorName = error;
        },
        procurarF() {

            this.procurar = document.getElementById("procurar").value;

        },
        async enviarMsg() {
            var numero = document.getElementById("telefoneMsg").value;
            this.msgTextError = '';
            var conversation = {
                aten_id: this.user.aten_id,
                chatId: "55" + numero.replace(/[^a-z0-9]/gi, '') + "@c.us",
                cliente: this.selectSlug,
                created: null,
                cv: null,
                hist_id: "-1",
                id: null,
                message: null,
                message_read: null,
                nao_lidas: null,
                nome_cliente: null,
                secretaria: null,
                sta_id_hist: null,
                telefone: numero.replace(/[^a-z0-9]/gi, ''),
                transferida: "1",
                type: "chat",
                ultima_mensagem: "2022-03-17 12:30:16",

            }
            this.ConversationChat = conversation;
            this.getChat();

            console.log(conversation);
            this.validated = true;
            //await this.assumeAtendimento();
            this.messages = [];


        },


        readConversation() {

            api.post('/read', { slug: this.selectSlug, chatId: this.ConversationChat.chatId })
                .then(response => {
                    if (this.exibirLogs) {
                        console.log('Marcou como lida');
                    }
                    this.getConversations();
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        title: "Erro!!",
                        text: "Erro ao marcar como lida",
                        type: 'error',
                    });

                });
        },
        async selectonversation(Conversation) {
            var activeConversations = document.getElementsByClassName('active');
            for (var i = 0; i < activeConversations.length; i++) {
                if (activeConversations[i].id != Conversation.chatId) {
                    activeConversations[i].classList.remove('active');
                }
            }

            //set active conversation class
            document.getElementById(Conversation.chatId).classList.add('active');
            if (this.exibirLogs) {
                console.log('Selecionou a Conversa', Conversation);
            }
            this.ConversationChat = Conversation;
            this.getChat();
            this.getContacts();
            this.readConversation();
            this.msgTextError = '';

            if (Conversation.chatId.indexOf('@g.us') != -1) {
                this.validated = true;
            } else {
                if (Conversation.aten_id == -1) {
                    this.validated = false;
                    this.msgText = 'Você tem certeza de que quer atender essa conversa? (Outras pessoas poderão atender esse contato somente depois que você finalizar a conversa)';

                } else if (Conversation.hist_id != -1 && Conversation.sta_id_hist != 7) {
                    this.validated = false;
                    this.msgText = 'Você deseja iniciar um novo atendimento com este contato?';

                } else if (Conversation.aten_id != this.user.aten_id) {
                    this.validated = false;
                    this.msgText = 'Esse contato já está em atendimento por outra pessoa!!';
                } else {
                    this.validated = true;
                    this.msgText = '';
                }
                console.log(Conversation.aten_id);
                //this.msgText = 'nao e um grupo';
            }

            console.log(Conversation.chatId.indexOf('@g.us') != -1);
            //await this.assumeAtendimento();
        },
        getConversations() {
            console.log(this.selectSlug);
            api
                .post("/conversas", { slug: this.selectSlug, aten_id: this.user.aten_id })

                .then((res) => {
                    //ordena as conversas por data
                    console.log(res.data);
                    res.data.sort(function (a, b) {
                        return new Date(b.created) - new Date(a.created);
                    });

                    res.data.forEach(function (conversa) {

                        //console.log(conversa);
                        //exibir hora e minuto se o dia for o mesmo se for diferente exibir dia e mes
                        var currentDate = new Date();
                        var conversaDate = new Date(conversa.created);

                        if (conversaDate.getDate() == currentDate.getDate()) {
                            var hora = conversaDate.getHours().toString();
                            var horaF = (hora.length == 1) ? '0' + hora : hora;


                            var minuto = conversaDate.getMinutes().toString();
                            var minutoF = (minuto.length == 1) ? '0' + minuto : minuto;


                            res.data[res.data.indexOf(conversa)].created = horaF + ':' + minutoF;
                        } else {
                            var dia = conversaDate.getDate().toString();
                            var diaF = (dia.length == 1) ? '0' + dia : dia;

                            var mes = conversaDate.getMonth().toString();
                            var mesF = (mes.length == 1) ? '0' + mes : mes;

                            var ano = conversaDate.getFullYear().toString();
                            var anoF = (ano.length == 1) ? '0' + ano : ano;

                            var hora = conversaDate.getHours().toString();
                            var horaF = (hora.length == 1) ? '0' + hora : hora;


                            var minuto = conversaDate.getMinutes().toString();
                            var minutoF = (minuto.length == 1) ? '0' + minuto : minuto;



                            res.data[res.data.indexOf(conversa)].created = diaF + '/' + mesF + '/' + anoF + ' ' + horaF + ':' + minutoF;
                        }
                    });

                    this.SideConversations = res.data;
                    if (this.exibirLogs) {
                        console.log('Obtendo as Conversa');
                        console.log(this.SideConversations);
                    }



                })
                .catch((error) => {
                    console.log(error);
                    this.$notify({
                        title: "Erro!!",
                        text: "Erro ao obter as conversas",
                        type: 'error',
                    });
                });
        },
        logOut() {
            this.$store.dispatch('auth/logout').then(() => {
                window.location.reload();
            }).catch(() => {
                this.$notify({
                    title: "Erro!!",
                    text: "Erro ao deslogar",
                    type: 'error',
                });
            });
        },
        getContacts() {
            api.post('/contratos_transferencia', { aten_id: this.user.aten_id, chatId: this.ConversationChat.chatId })
                .then(response => {
                    if (this.exibirLogs) {
                        console.log('Obtendo os Contatos');
                        console.log(this.user.aten_id);

                    }

                    this.contacts = response.data;

                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        title: "Erro!!",
                        text: "Erro ao obter os contatos",
                        type: 'error',
                    });
                });

        },
        //Inicio das Funcoes de conversa
        scrollToEnd: function () {
            // Rola a página até o final da conversa
            if (this.messages.length > 0) {
                var objDiv = document.getElementById("conversation");
                objDiv.scrollTop = objDiv.scrollHeight;
            }
        },
        //Obtem o chat
        getChat() {
            //this.assumeAtendimento();
            api.post("/conversa", { slug: this.selectSlug, aten_id: this.ConversationChat.aten_id, chatId: this.ConversationChat.chatId })
                .then((res) => {
                    if (this.exibirLogs) {
                        console.log('Obteve o chat');
                    }
                    res.data.forEach(function (msg) {
                        //exibir hora e minuto se o dia for o mesmo se for diferente exibir dia e mes
                        var currentDate = new Date();
                        var conversaDate = new Date(msg.created);

                        if (conversaDate.getDate() == currentDate.getDate()) {
                            var hora = conversaDate.getHours().toString();
                            var horaF = (hora.length == 1) ? '0' + hora : hora;

                            var minuto = conversaDate.getMinutes().toString();
                            var minutoF = (minuto.length == 1) ? '0' + minuto : minuto;



                            res.data[res.data.indexOf(msg)].created = horaF + ':' + minutoF;
                        } else {
                            var dia = conversaDate.getDate().toString();
                            var diaF = (dia.length == 1) ? '0' + dia : dia;

                            var mes = conversaDate.getMonth().toString();
                            var mesF = (mes.length == 1) ? '0' + mes : mes;

                            var ano = conversaDate.getFullYear().toString();
                            var anoF = (ano.length == 1) ? '0' + ano : ano;

                            var hora = conversaDate.getHours().toString();
                            var horaF = (hora.length == 1) ? '0' + hora : hora;

                            var minuto = conversaDate.getMinutes().toString();
                            var minutoF = (minuto.length == 1) ? '0' + minuto : minuto;

                            res.data[res.data.indexOf(msg)].created = diaF + '/' + mesF + '/' + anoF + ' ' + horaF + ':' + minutoF;

                        }
                    });
                    this.messages = res.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.$notify({
                        title: "Erro!!",
                        text: "Erro ao obter o chat",
                        type: 'error',
                    });
                });
        },

        save: function () {
            //Salva alteracoes no nome da conversa
            if (document.getElementById("clientName").value != '') {
                this.validateName();
                if (this.errorName == 0) {

                    this.saveName();
                }
            }
            //Salva a transferencia de contatos
            if (document.getElementById("contacts").value != '') {
                this.transferirAtendimento();
            }
        },

        //Transferir atendimento
        transferirAtendimento() {
            var contact = document.getElementById("contacts").value.split(',');
            var transferir = {

                "chatId": this.ConversationChat.chatId,
                "slug": this.selectSlug,
                "aten_id": this.user.aten_id,
                "hist_id": -1, //MANDAR SEMPRE COMO -1
                "ativa": 1,
                "nome_cliente": this.ConversationChat.nome_cliente,
                "aten_id_transfere": contact[0], //ID DO USUARIO QUE ESTOU TRANSFERINDO
                "ramal": contact[1], //RAMAL DO USUARIO QUE ESTOU TRANSFERINDO

            };

            api.post("/transfer", transferir)
                .then((res) => {
                    if (this.exibirLogs) {
                        console.log('Transferindo atendimento');
                    }

                    console.log(res.data);

                    this.getChat();
                })
                .catch((error) => {
                    console.log(error);
                    this.$notify({
                        title: "Erro!!",
                        text: "Erro ao transferir atendimento",
                        type: 'error',
                    });
                });
        },
        //salva o nome
        saveName: function () {
            if (this.errorName == 0) {

                var ChangeName = {
                    "chatId": this.ConversationChat.chatId,
                    "clie_id": this.user.clie_id,
                    "nome_cliente": document.getElementById("clientName").value,

                }

                api.post("/salva_nome", ChangeName)
                    .then((res) => {

                        this.ConversationChat.nome_cliente = document.getElementById("clientName").value;
                        if (this.exibirLogs) {
                            console.log('Salvando o nome', res.data);
                        }
                        document.getElementById("alert-msg-name-success").style.display = "block";
                        document.getElementById("alert-msg-name-success").innerHTML = 'O nome foi alterado com sucesso!';
                        setTimeout(() => {
                            this.getConversations();
                            //   window.location.reload();
                        }, 2000);

                    })
                    .catch((error) => {
                        console.log(error);
                        this.$notify({
                            title: "Erro!!",
                            text: "Erro ao salvar o nome",
                            type: 'error',
                        });
                    });
            }
        },

        async finalizaAtendimento() {
            var finaliza = {
                "transferencia": 1,
                "hist_id": -1,
                "chatId": this.ConversationChat.chatId,
                "slug": this.selectSlug,
                "aten_id": this.user.aten_id,
                "nome_cliente": this.ConversationChat.nome_cliente,

            };

            api.post("/finaliza_atendimento", finaliza)
                .then((res) => {
                    if (this.exibirLogs) {
                        console.log('Finalizando o atendimento');
                    }
                    this.getChat();
                    this.getContacts();
                    this.getConversations();

                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                    this.$notify({
                        title: "Erro!!",
                        text: "Erro ao finalizar o atendimento",
                        type: 'error',
                    });
                });



        },
        //Envia mensagem
        async sendMsg() {

            var msg = document.getElementById("comment").value;

            this.readConversation();
            if (msg.replace(/\s/g, '').length > 0) {
                var sendmsg = {
                    "chatId": this.ConversationChat.chatId,
                    "telefone": this.ConversationChat.telefone,
                    "slug": this.selectSlug,
                    "aten_id": this.user.aten_id,
                    "transferida": 1,
                    "nome_cliente": this.ConversationChat.nome_cliente,
                    "mensagem": msg,
                }


                api.post("/send", sendmsg)
                    .then((res) => {
                        console.log('Enviando mensagem');
                        console.log(res.data);
                        if (res.data.error != 1) {
                            document.getElementById("comment").value = '';
                        }
                        //atualiza o chat
                        this.getChat();
                        this.getContacts();
                        this.readConversation();
                        this.getConversations();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$notify({
                            title: "Erro!!",
                            text: "Erro ao enviar mensagem",
                            type: 'error',
                        });
                    });
            }
        },
        async assumeAtendimento() {
            var assume_atendimento = {
                "chatId": this.ConversationChat.chatId,
                "slug": this.selectSlug,
                "aten_id": this.user.aten_id,
            };
            console.log(assume_atendimento);

            var data = [];

            await api.post("/assume_atendimento", assume_atendimento)
                .then((res) => {
                    if (this.exibirLogs) {
                        console.log('Assumindo o atendimento', res.data);
                    }
                    data = res.data;



                })
                .catch((error) => {
                    console.log(error);
                    data = res.data;
                    this.$notify({
                        title: "Erro!!",
                        text: "Erro ao assumir o atendimento",
                        type: 'error',
                    });


                });

            console.log(data.error);
            if (data.error == 0) {
                this.validated = true;
                this.msgTextError = '';
            } else {
                this.validated = false;
                this.msgTextError = data.msg;
                this.$notify({
                    title: "Erro!!",
                    text: this.msgTextError,
                    type: 'error',
                });
            }
            return data;

        },
    },
};



</script>

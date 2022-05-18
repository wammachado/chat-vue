<template></template>
<script>

import api from '@/services/api.js'
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
  })

});

export default {
  name: "Conversations",

  data() {
    return {
      conversations: JSON.parse(localStorage.getItem('conversations')),
      user: JSON.parse(localStorage.getItem('user'))

    };
  },
  created() {
    this.getConversations();

  },

  methods: {

    childMethod: function (Conversation) {
      //remove active class from other conversations
      var activeConversations = document.getElementsByClassName('active');
      for (var i = 0; i < activeConversations.length; i++) {
        if (activeConversations[i].id != Conversation.chatId) {
          activeConversations[i].classList.remove('active');
        }
      }

      //set active conversation class
      document.getElementById(Conversation.chatId).classList.add('active');

      this.$emit('child-method', Conversation)
    },

  },
  watch: {
    procurar() {
      var name = document.getElementById("searchText").value;

      //if para verificar se contem nome e sobrenome com 3 carcter ou mias
      console.log('estou procurando')
    }
  }
};



</script>


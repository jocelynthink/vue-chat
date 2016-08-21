<template>
  <ul class="mmbcont">
    <li class="mmbcontitem"
        v-for="media in mediaset"
        v-bind:style="{border: currentid === media.mediaid ? '1px solid #ff9393' : ''}"
        @click.stop="hidemedaimanager(1, media.mediaid, mediatype)">
      <!--v-link="{name: 'media', params: { mediaid: media['mediaid']}}">-->
      <img v-bind:src="media.src" v-if="media.type==='image'">
      <!--<video v-bind:src="media.src" v-if="media.type==='shortvideo' || media.type==='video'" controls></video>-->
      <img v-if="media.type==='shortvideo' || media.type==='video'" v-bind:src="message.thumbMediaUrl" class="message-image">
  </ul>
  </div>
</template>

<script type="es6">
  export default {
    props: {
      mediaset: {
        type: Array
      },
      currentid: {
        type: Number
      },
      mediatype: {
        type: String
      },
      hidemedaimanager: {
        type: Function
      }
    }
  }
</script>

<style>

</style>

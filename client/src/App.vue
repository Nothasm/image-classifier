<template>
  <v-app style="background: #9B4DEE;">
    <v-main>
      <v-img src="@/assets/logo.png" width="85px" class="mx-auto mt-5"></v-img>
      <ImageUpload/>
    </v-main>
  </v-app>
</template>

<script>
import ImageUpload from './components/ImageUpload';

export default {
  name: 'App',

  components: {
    ImageUpload,
  },

  data: () => ({
    //
  }),
};
</script>

<template>
  <v-container>
    <v-card class="mx-auto pa-5 mt-5" elevation="1" shaped width="700px">
      <v-alert v-if="error" type="error">{{ error }}</v-alert>
      <form>
        <v-file-input
          label="Imagem"
          filled
          prepend-icon="mdi-camera"
          accept="image/png, image/jpeg"
          v-model="image"
        ></v-file-input>
        <v-btn class="mr-4" @click="submit"> Enviar </v-btn>
      </form>

    </v-card>

    <v-card v-if="response" class="mx-auto mt-5" max-width="344">
      <v-img
        :src="response.imageUrl"
        height="200px"
      ></v-img>

      <v-card-title> {{ response.analisys.CustomLabels.length ? response.analisys.CustomLabels[0].Name : "Não foi possível identificar" }} </v-card-title>

      <v-card-subtitle> {{ response.analisys.CustomLabels.length ? parseFloat(response.analisys.CustomLabels[0].Confidence).toFixed(2) + "%" : null}} </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    image: null,
    response: null,
    error: null,
  }),

  methods: {
    async submit() {
      this.error = null;
      this.response = null;
      const formData = new FormData();
      const imagefile = this.image;
      formData.append("image", imagefile);
      const res = await axios.post(
        `${process.env.VUE_APP_API_URL}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data;`,
          },
          validateStatus: () => true,
        }
      );

      alert(JSON.stringify(res, undefined, 2))

      if (!res.data.error) {
        this.response = res.data;
      } else {
        this.error = res.data.error;
      }

      this.image = null;
    },
  },
};
</script>
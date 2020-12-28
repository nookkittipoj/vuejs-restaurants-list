<template>
  <b-card no-body
          class="overflow-hidden mb-3">
    <b-row no-gutters>
      <b-col md="6">
        <div class="h-100 p-3 d-flex justify-content-center align-items-center">
          <div class="animated-background"></div>
        </div>
      </b-col>
      <b-col md="6">
        <b-card-body class="d-flex flex-column justify-content-center h-100">
          <div v-for="i in 5" :key="i" class="d-flex align-items-center mb-3 animated-background w-100" style="height: 30px">
          </div>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
name: "LoadingItem"
}
</script>

<style scoped>

</style>
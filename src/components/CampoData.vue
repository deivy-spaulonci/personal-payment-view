<template>
    <div class="col-fixed" style="width:100px">
      <InputMask mask="99/99/9999"
                  placeholder="Data"
                  style="width: 100%;"
                  v-model="selected"
                  @keyup="handleChange"/>
    </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
    }
  },
  methods: {
    handleChange (event) {
      this.selected = event.target.value;
      this.$emit("customChange", event.target.value);
    }
  }
}
</script>

<style scoped>

</style>
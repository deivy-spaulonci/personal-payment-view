<template>
    <Dropdown :options="valores" optionLabel="nome"
              :placeholder="place"
              autofocus
              style="width:100%;"
              scrollHeight="400px"
              :filter="true"
              :show-clear="true" v-model="selected"
              @change="handleChange"/>
</template>

<script>
export default {
  props: ['valores','place'],
  data() {
    return {
      selected: null,
    }
  },
  methods: {
    handleChange (event) {
      this.selected = event.value;
      this.$emit("customChange", event.value)
    }
  }
}
</script>


<template>
  <div class="col-fixed" :style="'width:'+largura+'px;'">
    <Dropdown :options="valores" optionLabel="nome"
              :placeholder="place"
              autofocus
              style="width:100%;" :filter="true"
              :show-clear="true" v-model="selected"
              @change="handleChange"/>
  </div>
</template>

<script>
export default {
  props: ['valores','largura','place'],
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


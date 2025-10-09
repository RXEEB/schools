<script setup>
import AppButton from './ui/AppButton.vue'

defineProps({
  title: String,
})
</script>

<template>
  <div class="container">
    <div class="left-block">
      <h4>{{ title }}</h4>
    </div>
    <div class="right-block">
      <div class="search-block">
        <input class="search" type="text" placeholder="Поиск..." />
        <img class="img-search" src="/img/search.svg" alt="icon" />
      </div>

      <AppButton />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.left-block {
  font-weight: 700;
  font-style: Bold;
  font-size: 32px;
  line-height: 120%;
  letter-spacing: 0%;
}

.right-block {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.search-block {
  position: relative;
}

.search {
  border: 1px solid rgba(211, 211, 222, 1);
  width: 300px;
  height: 56px;
  padding-left: 20px;
  border-radius: 10px;
  font-family: Inter;
  font-weight: 400;
  font-style: Regular;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0px;
  vertical-align: middle;
  outline: none;
}
.img-search {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>

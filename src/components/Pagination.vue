<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    default: 1,
  },
  totalItems: {
    type: Number,
    required: true,
    default: 0,
  },
  itemsPerPage: {
    type: Number,
    required: true,
    default: 8,
  },
  onPageChange: {
    type: Function,
    required: true,
  },
});

const handlePageChange = (page) => {
  props.onPageChange(page);
};
</script>

<template>
  <vue-awesome-paginate
    :total-items="totalItems"
    :items-per-page="itemsPerPage"
    :max-pages-shown="5"
    :model-value="currentPage"
    @update:model-value="handlePageChange"
    paginate-buttons-class="btn"
    active-page-class="btn-active"
    back-button-class="back-btn"
    next-button-class="next-btn"
  />
</template>
<style>
.btn {
  height: 36px;

  width: 44px;

  border: none;

  margin-inline: 5px;

  cursor: pointer;

  border-radius: 8px;
  background-color: white;
}

.back-btn {
  background-color: white;
  border: 1px solid rgba(211, 211, 222, 1);
}

.next-btn {
  background-color: white;
  border: 1px solid rgba(211, 211, 222, 1);
}

.btn-active {
  background-color: rgba(240, 240, 247, 1);
}

@media screen and (max-width: 600px) {
  .btn {
    height: 16px;

    width: 24px;

    border: none;

    margin-inline: 5px;

    cursor: pointer;

    border-radius: 8px;
    background-color: white;
  }
}
</style>

<script setup>
// import { useSchoolsStore } from '@/stores/schools'
import { useSelectedSchoolsStore } from "../../stores/selectedSchools";

const selectedSchoolsStore = useSelectedSchoolsStore();

const props = defineProps({
  school: {
    type: Object,
    required: true,
  },
});

const handleToggle = () => {
  selectedSchoolsStore.toggleSchool(props.school);
};

const isSelected = () => {
  return selectedSchoolsStore.isSchoolSelected(props.school.uuid);
};
</script>
<template>
  <img
    class="add_icon_mobile"
    @click="handleToggle"
    :src="isSelected() ? '/img/added.svg' : '/img/empty.svg'"
    alt="Добавить в избранное"
  />
  <tr>
    <td data-label="Регион">
      <div class="add">
        <img
          class="add_icon"
          @click="handleToggle"
          :src="isSelected() ? '/img/added.svg' : '/img/empty.svg'"
          alt="Добавить в избранное"
        />
        <span>{{ school.edu_org.region.name }}</span>
      </div>
    </td>
    <td data-label="Название">
      <span>{{ school.edu_org.short_name || school.edu_org.full_name }}</span>
    </td>
    <td data-label="Адрес">
      <span>{{ school.edu_org.contact_info.post_address }}</span>
    </td>
    <td data-label="Уровень образования">
      <div
        class="education"
        v-if="
          school.supplements?.[0]?.educational_programs?.[0]?.edu_level?.name
        "
      >
        {{ school.supplements?.[0]?.educational_programs?.[0]?.edu_level.name }}
      </div>
    </td>
  </tr>
</template>

<style scoped>
.add {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.add_icon {
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .add_icon {
    display: none;
  }
}
@media screen and (min-width: 600px) {
  .add_icon_mobile {
    display: none;
  }
}
</style>

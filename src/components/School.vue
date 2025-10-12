<script setup>
import { useSchoolsStore } from '@/stores/schools'
import { useSelectedSchoolsStore } from '@/stores/selectedSchools'

const selectedSchoolsStore = useSelectedSchoolsStore()

const props = defineProps({
  school: {
    type: Object,
    required: true,
  },
})

const handleToggle = () => {
  selectedSchoolsStore.toggleSchool(props.school)
}

const isSelected = () => {
  return selectedSchoolsStore.isSchoolSelected(props.school.uuid)
}
</script>
<template>
  <div class="tables">
    <div class="content">
      <div class="add">
        <img
          class="add_icon"
          @click="handleToggle"
          :src="isSelected() ? '/img/added.svg' : '/img/empty.svg'"
          alt="Добавить в избранное"
        />
        <span>{{ school.edu_org.region.name }}</span>
      </div>
    </div>
    <div class="content">
      <span>{{ school.edu_org.short_name || school.edu_org.full_name }}</span>
    </div>
    <div class="content">
      <span>{{ school.edu_org.contact_info.post_address }}</span>
    </div>
    <div class="content">
      <div
        class="education"
        v-if="school.supplements?.[0]?.educational_programs?.[0]?.edu_level?.name"
      >
        {{ school.supplements?.[0]?.educational_programs?.[0]?.edu_level.name }}
      </div>
      <!-- <span>Уровень образования</span> -->
    </div>
  </div>
</template>

<style scoped>
.tables {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.5fr;
  align-items: center;
  /* height: 56px; */
  border-bottom: 1px solid rgba(211, 211, 222, 1);
  opacity: 1;
}

.content {
  padding: 9px 20px;
  min-width: 0;
  text-align: left;
  white-space: normal;
  overflow: hidden;
  line-height: 1.2;
  /* max-height: 2.4em; */
}

.content span {
  margin: 0;
  white-space: nowrap;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  text-align: left;
  white-space: normal;
}
.add {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.add_icon {
  cursor: pointer;
}
.education {
  padding: 2px 5px;
  border-radius: 8px;
  border: 1px solid rgba(14, 14, 16, 0.1);
}
</style>

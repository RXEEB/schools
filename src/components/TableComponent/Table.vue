<script setup>
import SchoolsList from './SchoolsList.vue'
import { useSchoolsStore } from '../../stores/schools'
import { useSelectedSchoolsStore } from '../../stores/selectedSchools'

const schoolsStore = useSchoolsStore()

const selectedSchoolsStore = useSelectedSchoolsStore()

const handleClearSchools = () => {
  selectedSchoolsStore.clearSelectedSchools()
}
</script>
<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th class="region-header">
            <div class="btn-minus">
              <img @click="handleClearSchools" class="img-btn" src="/img/minus.svg" />
              Регион
            </div>
          </th>
          <th>Название</th>
          <th>Адрес</th>
          <th>Уровень образования</th>
        </tr>
      </thead>
      <tbody>
        <SchoolsList :schools="schoolsStore.schools" />
      </tbody>
    </table>
  </div>
</template>

<style>
.table-wrap {
  text-align: left;
  display: inline-block;
  background-color: #fff;
  padding: 2rem 2rem;
}

table {
  width: 100%;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
}

table tr {
  padding: 5px;
}

table th,
table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

table th {
  background-color: #f0f0f7;
  font-size: 14px;
  letter-spacing: 1px;
}

.btn-minus {
  display: flex;
  cursor: pointer;
  gap: 1rem;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table thead {
    display: none;
  }

  table tr {
    margin-bottom: 10px;
    display: block;
    border-bottom: 2px solid #ddd;
  }

  table td {
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 13px;
    border-bottom: 1px dotted #ccc;
    border-right: 1px solid transparent;
  }

  table td:last-child {
    border-bottom: 0;
  }

  table td:before {
    content: attr(data-label);
    float: left;
    text-transform: uppercase;
    font-weight: bold;
  }
}
</style>

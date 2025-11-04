import { defineStore } from "pinia";
import { ref } from "vue";
import { schoolsApi } from "../api/schoolsApi";
import { useFiltersStore } from "../stores/filters";

export const useSchoolsStore = defineStore("schools", () => {
  const schools = ref([]);
  const loading = ref(false);
  const currentPage = ref(1);
  const totalItems = ref(0);
  const itemsPerPage = ref(8);

  const fetchSchools = async (
    federal_district_id = null,
    region_id = null,
    search = null,
    page = 1
  ) => {
    loading.value = true;
    try {
      const response = await schoolsApi.getSchools(
        federal_district_id,
        region_id,
        search,
        page
      );

      schools.value = response.data?.list || response.list || [];

      totalItems.value =
        response.data?.total_count ||
        response.data?.pages_count ||
        response.total_count ||
        0;
      currentPage.value = page;
    } catch (error) {
      console.error("Error fetching schools:", error);
    } finally {
      loading.value = false;
    }
  };

  const changePage = (page) => {
    const filtersStore = useFiltersStore();

    currentPage.value = page;

    fetchSchools(
      filtersStore.getCurrentDistrictId(),
      filtersStore.getCurrentRegionId(),
      null,
      page
    );
  };

  const toggleSchool = (schoolId) => {
    const school = schools.value.find((s) => s.uuid === schoolId);
    if (school) {
      school.isAdded = !school.isAdded;
    }
  };

  return {
    schools,
    loading,
    currentPage,
    totalItems,
    itemsPerPage,
    fetchSchools,
    changePage,
    toggleSchool,
  };
});

<script setup>
import { ref, computed, watch, onUnmounted, onMounted } from 'vue'

const props = defineProps({
  modelValue: Date,
  title: String,
  img: String,
})

const currentDate = ref(new Date())
const selectedDate = ref(null)
const isPopupVisible = ref(false)
const calendarRef = ref(null)

const formatDate = (date = new Date()) => {
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value
}

const handleClickOutside = event => {
  if (calendarRef.value && !calendarRef.value.contains(event.target)) {
    isPopupVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Константы
const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MONTH_NAMES = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const weekDays = WEEK_DAYS
const CURRENT_DATE = ref(formatDate())

const currentMonthYear = computed(() => {
  const month = MONTH_NAMES[currentDate.value.getMonth()]
  const year = currentDate.value.getFullYear()
  return `${month} ${year}`
})

const calendarDays = computed(() => generateCalendarDays())

const generateCalendarDays = () => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // Начальный день недели (0 - воскресенье, преобразуем к 1 - понедельник)
  const startDayOfWeek = (firstDay.getDay() + 6) % 7

  const days = []

  // Добавляем дни предыдущего месяца
  for (let i = 0; i < startDayOfWeek; i++) {
    const date = new Date(year, month, -(startDayOfWeek - i - 1))
    days.push(createDayObject(date, false))
  }

  // Добавляем дни текущего месяца
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day)
    days.push(createDayObject(date, true))
  }

  // Добавляем дни следующего месяца для заполнения сетки
  const totalCells = 42 // 6 недель * 7 дней
  const remainingDays = totalCells - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i)
    days.push(createDayObject(date, false))
  }

  return days
}

const createDayObject = (date, isCurrentMonth) => ({
  date,
  currentMonth: isCurrentMonth,
  isToday: isToday(date),
  isSelected: isSelected(date),
})

const isToday = date => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isSelected = date => {
  if (!selectedDate.value) return false
  return date.toDateString() === selectedDate.value.toDateString()
}

const getDayClasses = day => ({
  'not-current-month': !day.currentMonth,
  today: day.isToday,
  selected: day.isSelected,
})

const navigateMonth = direction => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + direction)
  currentDate.value = newDate
}

const selectDate = day => {
  if (!day.currentMonth) {
    // Переход к месяцу выбранной даты
    currentDate.value = new Date(day.date)
  }
  selectedDate.value = day.date
}

// const emit = defineEmits(['update:modelValue'])

// watch(selectedDate, newValue => {
//   emit('update:modelValue', newValue)
// })

// // Инициализация selectedDate из props
// if (props.modelValue) {
//   selectedDate.value = props.modelValue
// }
</script>

<template>
  <div class="calendar-select" ref="calendarRef">
    <div class="select-trigger" @click="togglePopup">
      <div>{{ CURRENT_DATE }}</div>
      <img class="img-search" src="/img/calendar.svg" alt="icon" />
    </div>
    <div v-if="isPopupVisible" class="popup">
      <div class="calendar-container">
        <div class="calendar-header">
          <button @click="navigateMonth(-1)">
            <img src="/img/arrow-chevron-left.svg" alt="" />
          </button>
          <span>{{ currentMonthYear }}</span>
          <button @click="navigateMonth(1)">
            <img src="/img/arrow-chevron-right.svg" alt="" />
          </button>
        </div>

        <div class="calendar-grid">
          <div class="calendar-weekdays">
            <div v-for="day in weekDays" :key="day" class="weekday">
              {{ day }}
            </div>
          </div>

          <div class="calendar-days">
            <div
              v-for="(day, index) in calendarDays"
              :key="index"
              :class="getDayClasses(day)"
              @click="selectDate(day)"
              class="calendar-day"
            >
              {{ day.date.getDate() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-select {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 56px;
  align-items: center;
  padding: 0 20px;
  border-radius: 10px;
  opacity: 1;
  border: 1px solid rgba(211, 211, 222, 1);
}
.select-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.calendar-container {
  position: absolute;
  padding: 5px;
  top: 100%;
  left: 0;
  right: 0;
  max-width: 420px;
  border-radius: 16px;
  background-color: rgba(241, 244, 253, 1);
  border: 1px solid rgba(211, 211, 222, 1);
  border-radius: 16px;
  margin-top: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.calendar-header button {
  border: none;
  padding: 8px 12px;
  cursor: pointer;
}

.calendar-header span {
  font-size: 1.2em;
}

.calendar-grid {
  border: 1px solid #e9ecef;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.weekday {
  padding: 12px;
  text-align: center;
  font-size: 0.9em;
  color: rgba(147, 147, 155, 1);
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.calendar-day {
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-day:hover {
  background: #f8f9fa;
}

.calendar-day.today {
  background: rgba(51, 211, 94, 1);
  font-weight: bold;
}

.calendar-day.selected {
  background: rgba(51, 211, 94, 1);
  font-weight: bold;
}

.calendar-day.not-current-month {
  color: rgba(147, 147, 155, 1);
  background: #f8f9fa;
}

.calendar-day.not-current-month:hover {
  background: #e9ecef;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 600px) {
  .calendar-day {
    padding: 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media (min-width: 601px) and (max-width: 768px) {
  .calendar-container {
    width: 600px;
  }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .calendar-container {
    width: 600px;
  }
}
@media (min-width: 1025px) and (max-width: 1370px) {
  .calendar-container {
    width: 600px;
  }
}
</style>

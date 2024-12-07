<script setup>
import Option from '@/components/Select/Option.vue'
import Select from '@/components/Select/Select.vue'

import { onMounted, ref } from 'vue'

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]
const list = ref([])
const options = ref([])
const value = ref('')
const loading = ref(false)

onMounted(() => {
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` }
  })
})

function getStates(query) {
  return new Promise((resolve) => {
    if (query) {
      setTimeout(() => {
        const options = states
          .filter(item => item.toLowerCase().includes(query.toLowerCase()))
          .map(label => ({ label, value: label }))
        resolve(options)
      }, 500)
    } else {
      resolve([])
    }
  })
}
async function remoteMethod(query) {
  loading.value = true
  try {
    options.value = await getStates(query)
  } catch (e) {
    options.value = []
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-wrap">
    <div class="m-4">
      <p>default</p>
      <Select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Please enter a keyword"
        :remote-method="remoteMethod"
        :loading="loading"
        style="width: 240px"
      >
        <Option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </Select>
    </div>
    <div class="m-4">
      <p>use remote-show-suffix</p>
      <Select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Please enter a keyword"
        remote-show-suffix
        :remote-method="remoteMethod"
        :loading="loading"
        style="width: 240px"
      >
        <Option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </Select>
    </div>
  </div>
</template>

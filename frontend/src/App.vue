<script setup lang="ts">
import { ref, computed } from "vue";

const requestsCount = ref<number>(10);
const delayMs = ref<number>(200);

const sent = ref<number>(0);
const success = ref<number>(0);
const error = ref<number>(0);
const isRunning = ref<boolean>(false);
const started = ref<boolean>(false);

const startTime = ref<number | null>(null);
const endTime = ref<number | null>(null);

const errorMessages = ref<string[]>([]);

const totalTime = computed<string>(() => {
  if (!startTime.value || !endTime.value) return "0";
  return ((endTime.value - startTime.value) / 1000).toFixed(1);
});

async function startTest(): Promise<void> {
  sent.value = 0;
  success.value = 0;
  error.value = 0;
  errorMessages.value = [];
  started.value = true;
  isRunning.value = true;

  startTime.value = Date.now();
  endTime.value = null;

  for (let i = 0; i < requestsCount.value; i++) {
    sent.value++;
    sendRequest();
    await new Promise((r) => setTimeout(r, delayMs.value));
  }

  endTime.value = Date.now();
  isRunning.value = false;
}

async function sendRequest(): Promise<void> {
  try {
    const res = await fetch("http://localhost:3000/items");

    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status} ${res.statusText}`);
    }

    success.value++;
  } catch (e) {
    const msg =
      e instanceof Error ? e.message : typeof e === "string" ? e : "Unknown error";

    error.value++;
    errorMessages.value.push(msg);
  }
}
</script>


<template>
  <div class="container">
    <h1>Нагрузочный тест</h1>

    <div class="form-group">
      <label>Количество запросов:</label>
      <input v-model.number="requestsCount" type="number" />
    </div>

    <div class="form-group">
      <label>Задержка между запросами (мс):</label>
      <input v-model.number="delayMs" type="number" />
    </div>

    <button @click="startTest" :disabled="isRunning">Старт нагрузочного теста</button>

    <div v-if="started" class="results">
      <p>Отправлено запросов: {{ sent }}</p>
      <p>Успешных: {{ success }}</p>
      <p>Ошибок: {{ error }}</p>
      <p>Время выполнения: {{ totalTime }} сек</p>

      <div v-if="errorMessages.length" class="error-messages">
        <p>Ошибки:</p>
        <ul>
          <li v-for="(err, index) in errorMessages" :key="index">{{ err }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.results {
  margin-top: 20px;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 4px;
}

.error-messages {
  margin-top: 10px;
  color: red;
}

.error-messages ul {
  padding-left: 20px;
  margin: 0;
}
</style>

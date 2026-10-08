<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { currencies, rates, type CurrencyCode } from '../data/taux'

const amount = ref('')
const sourceCurrency = ref<CurrencyCode>('USD')
const targetCurrency = ref<CurrencyCode>('EUR')
const result = ref('')
const showValidationMessage = ref(false)

const numericAmount = computed(() => Number.parseFloat(amount.value) || 0)
const sourceRate = computed(() => rates[sourceCurrency.value])
const targetRate = computed(() => rates[targetCurrency.value])

function appendKey(key: string) {
  showValidationMessage.value = false
  if (key === 'C') {
    amount.value = '0'
    result.value = ''
    return
  }
  if (amount.value.length >= 10) return
  if (key === '.' && amount.value.includes('.')) return
  if (amount.value === '0' && key !== '.') amount.value = ''
  amount.value += key
}

function convert() {
  if (numericAmount.value === 0) {
    result.value = ''
    showValidationMessage.value = true
    return
  }
  const converted = (numericAmount.value / sourceRate.value) * targetRate.value
  result.value = converted.toFixed(2)
}

function invert() {
  const previousSource = sourceCurrency.value
  sourceCurrency.value = targetCurrency.value
  targetCurrency.value = previousSource
  if (result.value) convert()
}

function handlePhysicalKeyboard(event: KeyboardEvent) {
  if (/^\d$/.test(event.key)) appendKey(event.key)
  else if (event.key === '.') appendKey('.')
  else if (event.key === 'Backspace') amount.value = amount.value.slice(0, -1)
  else if (event.key === 'Escape' || event.key.toLowerCase() === 'c') appendKey('C')
  else if (event.key === 'Enter') convert()
}

watch([amount, sourceCurrency, targetCurrency], () => {
  if (amount.value && numericAmount.value > 0) {
    showValidationMessage.value = false
    const converted = (numericAmount.value / sourceRate.value) * targetRate.value
    result.value = converted.toFixed(2)
  } else {
    result.value = ''
  }
})

onMounted(async () => {
  window.addEventListener('keydown', handlePhysicalKeyboard)
  try {
    const response = await fetch('https://api.frankfurter.app/latest?from=EUR')
    if (!response.ok) throw new Error('Rates API unavailable')
    const liveRates = (await response.json()).rates as Partial<Record<CurrencyCode, number>>
    for (const currency of currencies) {
      const liveRate = liveRates[currency.code]
      if (typeof liveRate === 'number') rates[currency.code] = liveRate
    }
  } catch {
    // The fixed rates remain active when the network is unavailable.
  }
})

onUnmounted(() => window.removeEventListener('keydown', handlePhysicalKeyboard))
</script>

<template>
  <main class="converter-page">
    <section class="converter" aria-labelledby="converter-title">
      <div class="converter-card">
        <h1 id="converter-title">Currency Converter</h1>
        <div class="conversion-fields">
          <div class="field-row">
            <select id="source-currency" v-model="sourceCurrency" aria-label="Devise source">
              <option v-for="currency in currencies" :key="currency.code" :value="currency.code">{{ currency.code }}</option>
            </select>
            <output class="number-output" aria-label="Montant">{{ amount || '0' }}</output>
          </div>
          <button class="invert-button" type="button" aria-label="Inverser les devises" @click="invert">⇅</button>
          <div class="field-row">
            <select id="target-currency" v-model="targetCurrency" aria-label="Devise cible">
              <option v-for="currency in currencies" :key="currency.code" :value="currency.code">{{ currency.code }}</option>
            </select>
            <output class="number-output result-output" aria-live="polite">{{ result || '0.00' }}</output>
          </div>
          <button class="convert-button" type="button" @click="convert">CONVERTIR</button>
          <p v-if="showValidationMessage" class="validation-message">Veuillez saisir un montant</p>
        </div>
      </div>
      <div class="keypad" aria-label="Clavier numérique">
        <button v-for="key in ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'C', '0', '.']" :key="key" type="button" :class="{ 'clear-key': key === 'C' }" @click="appendKey(key)">{{ key }}</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.converter-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #fff;
  font-family: Arial, sans-serif;
}

.converter { width: min(100%, 280px); padding: 0; border: 1px solid #d1d1d1; border-radius: 10px; background: #fff; box-shadow: 0 2px 7px rgba(0, 0, 0, .08); }
.converter-card { padding: 20px 20px 18px; background: #dcecf8; }
h1 { margin: 0 0 20px; color: #000; font-size: 16px; text-align: center; }
.conversion-fields { position: relative; }
.field-row { position: relative; min-height: 59px; }
select { width: 58px; padding: 5px 4px; border: 1px solid #c7d5df; border-radius: 4px; color: #202b32; background: #eef6fb; font-size: 11px; }
.number-output { position: absolute; right: 0; top: 3px; min-width: 87px; padding-bottom: 3px; border-bottom: 1px solid #56646c; color: #101820; font-size: 27px; text-align: right; }
.result-output { top: 3px; }
.invert-button { position: absolute; left: 7px; top: 62px; padding: 0; border: 0; color: #101820; background: transparent; font-size: 22px; }
.convert-button { display: block; margin: 4px auto 0; padding: 8px 24px; border: 1px solid #4c91d4; border-radius: 20px; color: #173c60; background: #71afe7; box-shadow: 0 1px 2px rgba(0, 0, 0, .12); font-size: 10px; font-weight: 700; }
.validation-message { margin: 8px 0 0; color: #d85f68; font-size: 11px; text-align: center; }
.keypad { display: grid; grid-template-columns: repeat(3, 1fr); padding: 14px 22px 20px; gap: 2px 10px; }
.keypad button { height: 38px; padding: 0; border: 0; color: #1ba6c9; background: transparent; font-size: 21px; }
.keypad .clear-key { color: #f0727a; }
@media (max-width: 360px) { .converter-page { padding: 16px; } }
</style>

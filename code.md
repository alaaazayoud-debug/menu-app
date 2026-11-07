<template>
  <!-- HTML + توجيهات Vue -->
</template>

<script setup>
// JavaScript منطق المكوّن
</script>

<style scoped>
/* CSS خاص بالمكوّن */
</style>

import { ref, reactive, computed, watch } from 'vue'

const count = ref(0)  
 // رقم/نص
const user = reactive({name:'Ali'})
// كائن
const doubled = computed(() => count.value \* 2)
watch(count, newVal => { console.log(newVal) })
'javaScript'
const inc = () => count.value++
'veu'
<button @click="inc">+</button>
القوائم والشرط

<ul>
  <li v-for="p in products" :key="p.id">
    {{ p.name }} – {{ p.price }}
  </li>
</ul>

<div v-if="loading">Loading...</div>
<div v-else-if="error">{{ error }}</div>
<div v-else>content</div>
 بروب ايميت 
 <!-- Parent -->
<Child :item="prod" @add="addToCart" />
<!-- Child (script setup) -->
const props = defineProps({ item: Object })
const emit  = defineEmits(['add'])
function send(){ emit('add', props.item) }
بينا ستور

// stores/cart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCart = defineStore('cart', () => {
const items = ref([])
const total = computed(() =>
items.value.reduce((s, i) => s + i.price \* i.qty, 0)
)
function add(product) {
const found = items.value.find(x => x.id === product.id)
found ? found.qty++ : items.value.push({...product, qty:1})
}
return { items, total, add }
})
استخدام بينا
import { useCart } from '@/stores/cart'
const cart = useCart()
cart.add(product)
فيتش
const loading = ref(true)
const error = ref(null)
const list = ref([])

async function load(){
try {
const res = await fetch('/api/products')
if (!res.ok) throw new Error(res.status)
list.value = await res.json()
} catch (e) {
error.value = e.message
} finally {
loading.value = false
}
}
onMounted(load)
راوتينغ
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
export default createRouter({
history: createWebHistory(),
routes: [
{ path:'/', component: () => import('@/views/Home.vue') },
{ path:'/about', component: () => import('@/views/About.vue') }
]
})
بي دبليو اي
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'
plugins: [
VitePWA({
registerType: 'autoUpdate',
workbox: { globPatterns:['**/*.{js,css,html,ico,png,svg}'] },
manifest: { name:'Menu App', short_name:'Menu', theme_color:'#ffffff' }
})
]
ريسبونسيف

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <ProductCard v-for="p in products" :key="p.id" :product="p" />
</div>
اضافة سريعة تايب سكريبت
<script setup lang="ts">
interface Product { id:number; name:string; price:number }
const props = defineProps<{ product:Product }>()
</script>
npm run build   
     # يُخرّج مجلد dist
# ارفع dist على Vercel 
أو Netlify 
أو GitHub Pages
أ) الهيكلة العامة
كل ملف .vue يتكوّن من ثلاث كتل رئيسية:
<template>
  <!-- 1- واجهة المستخدم: HTML + توجيهات Vue -->
</template>

<script setup>
  // 2- المنطق: متغيرات، دوال، استيرادات
</script>

<style scoped>
  /* 3- التنسيق: CSS خاص بالمكوّن فقط */
</style>

ب) معنى كل كلمة
template: ما يُرَسم في المتصفح.
script setup: كود JavaScript + توجيهات Vue (المنطق).
style scoped: CSS لا يتسرّب إلى مكوّنات أخرى.
ج) مثال بسيط يعمل فوراً
<template>

  <h2>العدّاد: {{ count }}</h2>
  <button @click="inc">+</button>
  <button @click="dec">−</button>
</template>

<script setup>
import { ref } from 'vue'

// متغير تفاعلي
const count = ref(0)

// دوال الحدث
function inc() { count.value++ }
function dec() { count.value-- }
</script>

<style scoped>
button { margin: 0.25rem; padding: 0.5rem 1rem; }
</style>

ريف
const count = ref(0) // number
const name = ref('Ali') // string
console.log(count.value) // قراءة
count.value++ // تعديل
رياكتف
const user = reactive({ name: 'Ali', age: 30 })
console.log(user.name) // قراءة
user.age++ // تعديل

كومبيوتد
const price = ref(10)
const qty = ref(2)
const total = computed(() => price.value \* qty.value)

console.log(total.value) // 20
// إذا غيّرت price أو qty يُحسب total تلقائياً

د) watch – مراقبة متغير وعمل side-effect

watch(count, (newVal, oldVal) => {
console.log('العدد تغيّر من', oldVal, 'إلى', newVal)
document.title = `العدد: ${newVal}`
}, { immediate: true }) // يشتغل مباشرة أول مرة

هـ) دمج مباشر داخل MyCounter.vue

<script setup>
import { ref, computed, watch } from 'vue'

const count = ref(0)
const inc = () => count.value++
const dec = () => count.value--

// مضاعفة العدد
const doubled = computed(() => count.value * 2)

// عند كل تغيّر اطبعه بالكونسول وحدّث العنوان
watch(count, v => {
  console.log('العدد:', v, 'مضاعفه:', doubled.value)
  document.title = `العدد: ${v}`
}, { immediate: true })
</script>

<template>
  <h2>العدّاد: {{ count }}</h2>
  <p>مضاعفه: {{ doubled }}</p>
  <button @click="inc">+</button>
  <button @click="dec">−</button>
</template>\
ووتش للمصفوفة 
watch([count, price], ([newC, newP], [oldC, oldP]) => {
  console.log('count:', oldC, '→', newC, 'price:', oldP, '→', newP)
})
مثال عملي عن البروب والايمت
<template>
  <h2>سلتي ({{ total }})</h2>
  <!-- أرسل منتج + أستقبل حدث الإضافة -->
  <ProductCard
    v-for="p in products"
    :key="p.id"
    :product="p"
    @add="addToCart"
  />
</template>

<script setup>
import { ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue'

const products = ref([
  { id: 1, name: 'تفاح', price: 5 },
  { id: 2, name: 'موز', price: 3 }
])

const cart = ref([])

function addToCart(product) {
  const found = cart.value.find(i => i.id === product.id)
  found ? found.qty++ : cart.value.push({ ...product, qty: 1 })
}

const total = computed(() =>
  cart.value.reduce((s, i) => s + i.price * i.qty, 0)
)
</script>

الابن

 <template>
  <div class="card">
    <h3>{{ product.name }}</h3>
    <p>{{ product.price }} ل.س</p>
    <button @click="sendAdd">+ أضف للسلة</button>
  </div>
</template>

<script setup>
// 1- استقبال البيانات
const props = defineProps({
  product: { type: Object, required: true }
})

// 2- تعريف الحدث اللي رح أُطلعه
const emit = defineEmits(['add'])

// 3- دالة الزر
function sendAdd() {
  emit('add', props.product)   // أرسل للأب
}
</script>

<style scoped>
.card { border: 1px solid #ccc; padding: 1rem; margin: 0.5rem; }
</style>

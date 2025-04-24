import {createRouter, createWebHistory} from 'vue-router'
import EmotionView from '@/views/EmotionView.vue'
import DetailEmotionView from '@/views/DetailEmotionView.vue'
import QuoteEmotionView from '@/views/QuoteEmotionView.vue'

const routes = [
    {
        path: '/',
        name: 'Emotions',
        component: EmotionView
    },
    {
        path: '/detail/:name',
        name: 'Detail',
        component: DetailEmotionView
    },
    {
        path: '/quote/:name',
        name: 'Quote',
        component: QuoteEmotionView
    }
]

const router = createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL),
        routes
    }
)

export default router
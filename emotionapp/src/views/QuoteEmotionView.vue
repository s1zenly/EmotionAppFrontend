<template>
    <div class="container">
        <div class="centered-text">
            Спасибо за ответ!
        </div>

        <div class="image">
            <img class="flower" :src="getFlower(emotionName)" alt="Цветок"/>
        </div>

        <div class="quote">
            <div class="quote-text">
                {{ quoteText }}
            </div>

            <div class="author">
                {{ author }}
            </div>
        </div>

        <div class="button" @click="toDayQueue">
            Хорошо!
        </div>
    </div>
</template>

<script setup>

    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router';

    const route = useRoute()
    const emotionName = route.params.name

    const quoteText = ref('')
    const author = ref('')

    const getFlower = (emotionName) => {
        switch (emotionName) {
            case 'sad':
                return `/src/assets/sad-flower.png`
            case 'happy':
                return `/src/assets/happy-flower.png`
            case 'anxiety':
                return `/src/assets/sad-flower.png`
            case 'calm':
                return `/src/assets/happy-flower.png`
            case 'evil':
                return `/src/assets/sad-flower.png`
            default:
                return 'Неизвестная эмоция'
        }
    }

    const fetchQuote = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/quote')
        const data = await response.json()
        quoteText.value = data.quote_text
        author.value = data.quote_author
    } catch (error) {
        console.error('Ошибка при загрузке цитаты:', error)
        quoteText.value = '«Не тот велик кто никогда не падал, а тот велик что падал и вставал»'
        author.value = 'Пабло Пикассо'
    }
}

onMounted(() => {
fetchQuote()
})
</script>

<style scoped>

.container {
    position: relative;
    width: 100%;
    height: 100vh;
    padding: 20px;
    background: linear-gradient(180deg, #D6EAFF 40.16%, #91C6FF 134.52%);
}

.centered-text {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: #333;
    font-size: 54px;
    z-index: 3;
}

.image {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

.flower {
    max-width: 400px;
    height: auto;
}

.quote {
    position: absolute;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    text-align: center;
    width: 40%;
    height: 25%;
    z-index: 2;
    opacity: 0.9;
}
.quote-text {
    margin-top: 5%;
    margin-bottom: 15%;
    font-size: xx-large;
}
.author {
    font-style: italic;
    font-size: x-large;
}

.button {
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 30px;
    background: #68BBFF;
    border-radius: 20px;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
}

.button:hover {
    background: #4DA6FF;
}
</style>
<template>
    <div class="detail-container">
      <!-- Главный текст -->
      <div class="centered-text">
        Давай разберем подробнее
      </div>
      
      <!-- Карточка -->
      <div class="card-container">
        <div class="card">
          <img class="emoji" :src="getEmojiSrc" alt="Эмоция">
          {{ getEmotionRussianName(emotionName) }}
        </div>
      </div>
      
      <!-- Кнопки -->
      <div class="buttons-container">
        <div class="button" 
             v-for="button in getButtons" 
             :key="button.text"
             :class="getButtonClass(button.action)"
             @click="handleButtonClick(button.action)">
          {{ button.text }}
        </div>
      </div>

        <!-- Кнопка подтверждения -->
        <div class="confirm-button-container">
            <div class="confirm-button" @click="handleConfirmClick">
                Подтвердить
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { ref, computed } from 'vue'
  
  const router = useRouter()
  const route = useRoute()
  
  // Конфигурация эмоций и их кнопок
  const emotionConfig = {
    sad: {
        emoji: 'emoji-sad.png',
        buttons: [
        { text: 'Взволнованность', action: 'excitement' },
        { text: 'Обеспокоенность', action: 'concern' },
        { text: 'Отчаянность', action: 'desperation' },
        { text: 'Огорченность', action: 'disappointment' }
        ]
    },
    happy: {
        emoji: 'emoji-happy.png',
        buttons: [
        { text: 'Счастье', action: 'joy' },
        { text: 'Влюбленность', action: 'love' },
        { text: 'Веселье', action: 'fun' },
        { text: 'Удовлетворение', action: 'satisfaction' },
        { text: 'Вдохновение', action: 'inspiration' }
        ]
    },
    anxiety: {
        emoji: 'emoji-anxiety.png',
        buttons: [
        { text: 'Неуверенность', action: 'uncertainty' },
        { text: 'Страх', action: 'fear' },
        { text: 'Ужас', action: 'horror' },
        { text: 'Беспокойство', action: 'anxiety' },
        { text: 'Волнение', action: 'agitation' }
        ]
    },
    calm: {
        emoji: 'emoji-calm.png',
        buttons: [
        { text: 'Запутанность', action: 'confusion' },
        { text: 'Усталость', action: 'fatigue' },
        { text: 'Неуверенность', action: 'uncertainty' },
        { text: 'Скука', action: 'boredom' },
        { text: 'Смущение', action: 'embarrassment' }
        ]
    },
    evil: {
        emoji: 'emoji-evil.png',
        buttons: [
        { text: 'Обида', action: 'resentment' },
        { text: 'Досада', action: 'irritation' },
        { text: 'Унижение', action: 'humiliation' },
        { text: 'Стыд', action: 'shame' },
        { text: 'Раздражение', action: 'frustration' }
        ]
    }
  }
  
    // Данные компонента
    const getEmotionRussianName = (emotion) => {
        switch (emotion) {
            case 'sad':
                return 'Грусть'
            case 'happy':
                return 'Радость'
            case 'anxiety':
                return 'Тревога'
            case 'calm':
                return 'Спокойствие'
            case 'evil':
                return 'Злость'
            default:
                return 'Неизвестная эмоция'
        }
    }

  const emotionName = ref(route.params.name)
  const selectedEmotion = computed(() => emotionConfig[emotionName.value])
  
  const getEmojiSrc = computed(() => `/src/assets/${selectedEmotion.value.emoji}`)
  const getButtons = computed(() => selectedEmotion.value.buttons)
  
  const selectedActions = ref([])

// Модифицируйте существующий handleButtonClick:
const handleButtonClick = (action) => {
  // Переключаем состояние выбранной кнопки
  const index = selectedActions.value.indexOf(action)
  if (index === -1) {
    selectedActions.value.push(action)
  } else {
    selectedActions.value.splice(index, 1)
  }
}

const handleConfirmClick = async () => {
  if (selectedActions.value.length === 0) {
    alert('Пожалуйста, выберите хотя бы одну опцию')
    return
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/emotion/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tg_id: 123,
        emotion_category: emotionName.value,
        emotion_types: selectedActions.value
      })
    })

    if (!response.ok) {
      throw new Error('Ошибка при сохранении данных')
    }
    
    router.push({name: 'Quote', params: { name: emotionName.value}})
  } catch (error) {
    console.error('Ошибка:', error)
    alert('Ошибка роутинга')
  }
}

const getButtonClass = computed(() => {
  return (action) => {
    return {
      'button': true,
      'button--selected': selectedActions.value.includes(action)
    }
  }
})
  </script>
  
  <style scoped>
  .detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 100%;
    background: linear-gradient(180deg, #D6EAFF 40.16%, #91C6FF 134.52%);
  }
  
  .centered-text {
    font-size: 56px;
    margin-bottom: 30px;
    color: #002F69;
  }
  
  .card {
    padding: 40px;
    width: 70%;
    height: 90%;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20px;
    color: #002F69;
  }
  
  .emoji {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
    object-fit: contain;
  }
  
  
  .buttons-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 10%;
    width: 100%;
    max-width: 800px;
  }
  
  .button {
    text-align: center;
    padding: 15px 40px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease;
    font-size: 16px;
    color: #002F69;
    max-width: calc((100% - 20px) / 3);
    flex: 0 0 150px;
  }
  
  .button:hover {
    transform: translateY(-2px);
  }

  .confirm-button-container {
  margin-top: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  }

.confirm-button {
  padding: 15px 40px;
  background: #68BBFF;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  font-size: 16px;
  color: #002F69;
  max-width: 150px;
  text-align: center;
  flex: 0 0 150px;
}

.button--selected {
  background: #68BBFF;
  color: white;
}

</style>
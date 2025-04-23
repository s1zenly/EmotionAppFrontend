<template>
    <div class="container">
      <!-- Главный текст -->
      <div class="centered-text">
        Что ты сейчас чувствуешь?
      </div>
      
      <!-- Контейнер с карточками -->
      <div class="card-container">
        <!-- Верхний ряд -->
        <div class="row up-row">
            <div class="card" @click="navigateToCard('sad')">
                <img class="emoji" src="@/assets/emoji-sad.png" alt="Грусть">
                Грусть
            </div>
            <div class="card" @click="navigateToCard('happy')">
                <img class="emoji" src="@/assets/emoji-happy.png" alt="Радость">
                Радость
            </div>
        </div>
    
        <!-- Средний ряд -->
        <div class="row middle-row">
            <div class="card" @click="navigateToCard('anxiety')">
                <img class="emoji" src="@/assets/emoji-anxiety.png" alt="Тревога">
                Тревога
            </div>
            <div class="card" @click="navigateToCard('calm')">
                <img class="emoji" src="@/assets/emoji-calm.png" alt="Спокойствие">
                Спокойствие
            </div>
        </div>
    
        <!-- Нижний ряд -->
        <div class="row bottom-row">
            <div class="card" @click="navigateToCard('evil')">
                <img class="emoji" src="@/assets/emoji-evil.png" alt="Злость">
                Злость
            </div>
        </div>
      </div>
    </div>
    </template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    
    const navigateToCard = (route) => {
      router.push(route)
    }
    
    return { navigateToCard }
  }
}
</script>
  
  
  <style scoped>

  .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  min-width: 100vh;
  min-height: 100vh;
  background: linear-gradient(180deg, #D6EAFF 40.16%, #91C6FF 134.52%);
  }

.centered-text {
  font-size: 56px;
  margin-bottom: 30px;
  color: #002F69;
}

.card-container {
  width: 80%;
  display: grid;
  gap: 30px;
}

.row {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.card {
  padding: 40px;
  width: 7%;
  height: 70%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
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
  margin-bottom: 40px;
  object-fit: contain;
}

.card:hover {
  transform: translateY(-2px);
}

  </style>
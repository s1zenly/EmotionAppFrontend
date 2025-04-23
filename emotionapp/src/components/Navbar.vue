<template>
  <nav class="navbar">
    <div class="navbar-content">
      <router-link to="/records" class="nav-link">
        <img class="nav-icon" src="@/assets/records.svg" alt="Записи">
        <span class="nav-text">Записи</span>
      </router-link>
      <router-link to="/" class="nav-link">
        <img class="nav-icon" src="@/assets/emotion.svg" alt="Настроение">
        <span class="nav-text">Настроение</span>
      </router-link>
      <router-link to="/profile" class="nav-link">
        <img class="nav-icon" src="@/assets/profile.svg" alt="Профиль">
        <span class="nav-text">Профиль</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      activeLink: '/'
    }
  },
  methods: {
    isActive(route) {
      return this.$route.path === route
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 600px;
  height: 60px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: rgba(104, 187, 255, 0.4);
  backdrop-filter: blur(20px);
  border-top: 1px solid #ccc;
  border-radius: 30px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 20px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.nav-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.nav-text {
  display: inline-block;
  vertical-align: middle;
  color: #002F69;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.3);
  font-weight: 600;
}
</style>
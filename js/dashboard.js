/* ============================================
   KEGEL GO - LÓGICA DO DASHBOARD
   ============================================ */

// Inicializar dashboard
function initDashboard() {
  updateDashboard();
}

// Atualizar informações do dashboard
function updateDashboard() {
  const user = kegelApp.appState.user;
  
  // Atualizar saudação
  const greeting = document.getElementById('greeting');
  if (greeting) {
    greeting.textContent = `Olá, ${user.name}!`;
  }
  
  // Atualizar streak
  const streakCount = document.getElementById('streak-count');
  if (streakCount) {
    streakCount.textContent = user.streak;
  }
  
  // Atualizar nível
  const workoutLevel = document.getElementById('workout-level');
  if (workoutLevel) {
    workoutLevel.textContent = user.level.charAt(0).toUpperCase() + user.level.slice(1);
  }
  
  // Atualizar calendário
  generateWeekCalendar();
}

// Gerar calendário da semana
function generateWeekCalendar() {
  const weekCalendar = document.getElementById('week-calendar');
  if (!weekCalendar) return;
  
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const today = new Date();
  
  weekCalendar.innerHTML = '';
  
  days.forEach((day, index) => {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    // Marcar hoje
    if (index === today.getDay()) {
      dayElement.classList.add('today');
    }
    
    // Marcar dias completados (simulado)
    if (index < today.getDay()) {
      dayElement.classList.add('completed');
    }
    
    dayElement.innerHTML = `
      <div class="day-label">${day}</div>
      <div class="day-indicator"></div>
    `;
    
    weekCalendar.appendChild(dayElement);
  });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  initDashboard();
});

/* ============================================
   KEGEL GO - LÓGICA DO ONBOARDING
   ============================================ */

let selectedObjective = null;
let testInProgress = false;

// Selecionar objetivo
function selectObjective(objective) {
  selectedObjective = objective;
  
  // Atualizar visual
  document.querySelectorAll('.objective-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  event.target.closest('.objective-card').classList.add('selected');
  
  // Atualizar estado
  kegelApp.updateUserState({ objective: objective });
  
  // Navegar para a próxima tela após um pequeno delay
  setTimeout(() => {
    kegelApp.navigateTo('onboarding-education');
  }, 300);
}

// Teste de 3 segundos (Momento Ah-ha!)
function startThreeSecondTest() {
  if (testInProgress) return;
  
  testInProgress = true;
  const testButton = document.getElementById('test-button');
  const testFeedback = document.getElementById('test-feedback');
  const testMessage = document.getElementById('test-message');
  
  // Desabilitar botão
  testButton.disabled = true;
  testButton.style.opacity = '0.5';
  
  // Ocultar feedback anterior
  testFeedback.classList.add('hidden');
  
  // Vibração inicial (feedback tátil)
  kegelApp.vibrate(100);
  
  // Iniciar teste
  let timeRemaining = 3;
  testMessage.textContent = `Contraindo... ${timeRemaining}s`;
  testFeedback.classList.remove('hidden');
  
  const testInterval = setInterval(() => {
    timeRemaining--;
    
    if (timeRemaining > 0) {
      testMessage.textContent = `Contraindo... ${timeRemaining}s`;
      // Vibração contínua a cada segundo
      kegelApp.vibrate(50);
    } else {
      clearInterval(testInterval);
      
      // Feedback positivo
      testMessage.innerHTML = `
        <strong style="color: #6b8e23;">✓ Perfeito!</strong><br>
        Você identificou o músculo corretamente. Agora vamos criar seu plano personalizado.
      `;
      kegelApp.vibrate([100, 50, 100]); // Padrão de sucesso
      
      // Reabilitar botão após 2 segundos
      setTimeout(() => {
        testButton.disabled = false;
        testButton.style.opacity = '1';
        testInProgress = false;
      }, 2000);
    }
  }, 1000);
}

// Completar onboarding
function completOnboarding() {
  // Atualizar nome do usuário (por enquanto um padrão)
  const userName = 'Lucas'; // Você pode adicionar um campo de nome depois
  kegelApp.updateUserState({ 
    name: userName,
    level: 'iniciante',
    streak: 0,
    totalWorkouts: 0,
    totalMinutes: 0,
  });
  
  // Navegar para o dashboard
  setTimeout(() => {
    kegelApp.navigateTo('dashboard');
    updateDashboard();
  }, 1500);
}

// Atualizar dashboard após onboarding
function updateDashboard() {
  const greeting = document.getElementById('greeting');
  const streakCount = document.getElementById('streak-count');
  const workoutLevel = document.getElementById('workout-level');
  
  greeting.textContent = `Olá, ${kegelApp.appState.user.name}!`;
  streakCount.textContent = kegelApp.appState.user.streak;
  workoutLevel.textContent = kegelApp.appState.user.level.charAt(0).toUpperCase() + 
                             kegelApp.appState.user.level.slice(1);
  
  // Gerar calendário da semana
  generateWeekCalendar();
}

// Gerar calendário da semana
function generateWeekCalendar() {
  const weekCalendar = document.getElementById('week-calendar');
  const days = kegelApp.getWeekDays();
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

/* ============================================
   KEGEL GO - APLICAÇÃO PRINCIPAL
   ============================================ */

// Estado global da aplicação
const appState = {
  currentScreen: 'onboarding-welcome',
  user: {
    name: '',
    objective: null,
    level: 'iniciante',
    streak: 0,
    totalWorkouts: 0,
    totalMinutes: 0,
  },
  settings: {
    discreteNotifications: true,
    invisibleMode: false,
    fontSize: 'medium',
  },
  workoutInProgress: false,
  currentWorkout: null,
};

// Funções de Navegação
function navigateTo(screenName) {
  // Ocultar todas as telas
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });

  // Mostrar a tela desejada
  const targetScreen = document.getElementById(screenName);
  if (targetScreen) {
    targetScreen.classList.remove('hidden');
    appState.currentScreen = screenName;
    window.scrollTo(0, 0);
  }
}

// Função para atualizar a barra de progresso
function updateProgressBar(current, total) {
  const progressFill = document.querySelector('.progress-bar-fill');
  if (progressFill) {
    const percentage = (current / total) * 100;
    progressFill.style.width = percentage + '%';
  }
}

// Função para atualizar o estado do usuário
function updateUserState(updates) {
  appState.user = { ...appState.user, ...updates };
  localStorage.setItem('kegelGoState', JSON.stringify(appState));
}

// Função para atualizar configurações
function updateSettings(updates) {
  appState.settings = { ...appState.settings, ...updates };
  localStorage.setItem('kegelGoSettings', JSON.stringify(appState.settings));
}

// Carregar estado salvo
function loadSavedState() {
  const savedState = localStorage.getItem('kegelGoState');
  const savedSettings = localStorage.getItem('kegelGoSettings');

  if (savedState) {
    appState.user = { ...appState.user, ...JSON.parse(savedState).user };
  }

  if (savedSettings) {
    appState.settings = { ...appState.settings, ...JSON.parse(savedSettings) };
  }
}

// Função para simular vibração (Haptic Feedback)
function vibrate(pattern = 100) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

// Função para simular múltiplas vibrações
function vibratePattern(pattern) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

// Função para gerar ID único
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Função para formatar tempo (mm:ss)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Função para obter data formatada
function getFormattedDate(date = new Date()) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
}

// Função para obter o mês e ano
function getMonthYear(date = new Date()) {
  const options = { year: 'numeric', month: 'long' };
  return date.toLocaleDateString('pt-BR', options).charAt(0).toUpperCase() + 
         date.toLocaleDateString('pt-BR', options).slice(1);
}

// Função para gerar dias da semana
function getWeekDays() {
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  return days;
}

// Função para gerar calendário do mês
function generateCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const calendar = [];
  let week = [];

  // Preencher dias vazios do início
  for (let i = 0; i < startingDayOfWeek; i++) {
    week.push(null);
  }

  // Preencher dias do mês
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      calendar.push([...week]);
      week = [];
    }
  }

  // Preencher dias vazios do final
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    calendar.push(week);
  }

  return calendar;
}

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', function() {
  loadSavedState();

  // Verificar se é a primeira vez
  if (!appState.user.name) {
    navigateTo('onboarding-welcome');
  } else {
    navigateTo('dashboard');
  }

  // Configurar listeners de navegação
  setupNavigationListeners();
});

// Configurar listeners de navegação
function setupNavigationListeners() {
  // Listeners para a barra de navegação
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const targetScreen = this.getAttribute('data-screen');
      if (targetScreen) {
        navigateTo(targetScreen);
        updateActiveNavItem();
      }
    });
  });
}

// Atualizar item ativo na navegação
function updateActiveNavItem() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
    const targetScreen = item.getAttribute('data-screen');
    if (targetScreen === appState.currentScreen) {
      item.classList.add('active');
    }
  });
}

// Função para mostrar notificação
function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    background-color: ${type === 'success' ? '#6b8e23' : type === 'error' ? '#ef4444' : '#d97706'};
    color: white;
    border-radius: 8px;
    z-index: 2000;
    animation: slideInUp 300ms ease-in-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideInUp 300ms ease-in-out reverse';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// Exportar funções para uso global
window.kegelApp = {
  navigateTo,
  updateProgressBar,
  updateUserState,
  updateSettings,
  vibrate,
  vibratePattern,
  generateId,
  formatTime,
  getFormattedDate,
  getMonthYear,
  getWeekDays,
  generateCalendar,
  showNotification,
  appState,
};

/* ============================================
   KEGEL GO - LÓGICA DO PERFIL
   ============================================ */

// Inicializar perfil
function initProfile() {
  updateProfileDisplay();
}

// Atualizar display do perfil
function updateProfileDisplay() {
  const user = kegelApp.appState.user;
  
  // Atualizar nome
  const profileName = document.getElementById('profile-name');
  if (profileName) {
    profileName.textContent = user.name;
  }
  
  // Atualizar objetivo
  const profileObjective = document.getElementById('profile-objective');
  if (profileObjective) {
    const objectiveMap = {
      'recuperacao': 'Recuperação',
      'vigor': 'Vigor Sexual',
      'performance': 'Performance',
      'prevencao': 'Prevenção',
    };
    profileObjective.textContent = objectiveMap[user.objective] || 'Não definido';
  }
  
  // Configurar toggle de notificações discretas
  const discreteNotificationsToggle = document.getElementById('discrete-notifications');
  if (discreteNotificationsToggle) {
    discreteNotificationsToggle.checked = kegelApp.appState.settings.discreteNotifications;
    discreteNotificationsToggle.addEventListener('change', function() {
      kegelApp.updateSettings({ discreteNotifications: this.checked });
      kegelApp.showNotification(
        this.checked ? 'Notificações Discretas Ativadas' : 'Notificações Discretas Desativadas',
        'info'
      );
    });
  }
}

// Configurar acessibilidade
function configureAccessibility() {
  kegelApp.showNotification('Abrindo configurações de acessibilidade...', 'info');
  // Implementar depois
}

// Configurar modo invisível
function configureInvisibleMode() {
  kegelApp.showNotification('Abrindo configurações do Modo Invisível...', 'info');
  // Implementar depois
}

// Sair da conta
function logout() {
  if (confirm('Tem certeza que deseja sair?')) {
    localStorage.clear();
    kegelApp.navigateTo('onboarding-welcome');
    kegelApp.showNotification('Desconectado com sucesso', 'info');
  }
}

// Excluir conta
function deleteAccount() {
  if (confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
    if (confirm('Tem CERTEZA? Todos os seus dados serão perdidos.')) {
      localStorage.clear();
      kegelApp.navigateTo('onboarding-welcome');
      kegelApp.showNotification('Conta excluída com sucesso', 'info');
    }
  }
}

// Configurar event listeners
document.addEventListener('DOMContentLoaded', function() {
  initProfile();
  
  // Configurar botões de ação
  const buttons = document.querySelectorAll('#profile .profile-section .btn');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const text = this.textContent.trim();
      
      if (text === 'Acessibilidade') {
        configureAccessibility();
      } else if (text === 'Modo Invisível') {
        configureInvisibleMode();
      } else if (text === 'Sair') {
        logout();
      } else if (text === 'Excluir Conta') {
        deleteAccount();
      }
    });
  });
});

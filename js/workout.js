/* ============================================
   KEGEL GO - LÓGICA DO TREINO
   ============================================ */

let workoutState = {
  isRunning: false,
  isPaused: false,
  currentRepetition: 1,
  currentSeries: 1,
  totalRepetitions: 15,
  totalSeries: 3,
  contractionTime: 5,
  relaxationTime: 5,
  currentPhase: 'contraction', // 'contraction' ou 'relaxation'
  timeRemaining: 5,
  totalWorkoutTime: 0,
  invisibleModeActive: false,
};

// Iniciar treino
function startWorkout() {
  workoutState.isRunning = true;
  workoutState.isPaused = false;
  runWorkoutCycle();
}

// Pausar treino
function pauseWorkout() {
  if (workoutState.isRunning) {
    workoutState.isPaused = !workoutState.isPaused;
    const pauseButton = document.querySelector('.workout-controls .btn-secondary');
    if (pauseButton) {
      pauseButton.textContent = workoutState.isPaused ? 'RETOMAR' : 'PAUSAR';
    }
  }
}

// Próximo exercício
function nextExercise() {
  if (workoutState.currentRepetition < workoutState.totalRepetitions) {
    workoutState.currentRepetition++;
  } else if (workoutState.currentSeries < workoutState.totalSeries) {
    workoutState.currentRepetition = 1;
    workoutState.currentSeries++;
  } else {
    completeWorkout();
    return;
  }
  
  updateWorkoutDisplay();
  workoutState.currentPhase = 'contraction';
  workoutState.timeRemaining = workoutState.contractionTime;
  runWorkoutCycle();
}

// Executar ciclo de treino
function runWorkoutCycle() {
  if (workoutState.isPaused || !workoutState.isRunning) {
    return;
  }
  
  const timerText = document.getElementById('timer-text');
  const instruction = document.getElementById('instruction');
  
  if (workoutState.timeRemaining > 0) {
    // Atualizar display
    timerText.textContent = String(workoutState.timeRemaining).padStart(2, '0') + 's';
    
    // Atualizar instrução
    if (workoutState.currentPhase === 'contraction') {
      instruction.textContent = 'CONTRAIA';
      instruction.style.color = 'var(--color-laranja-queimado)';
    } else {
      instruction.textContent = 'RELAXE';
      instruction.style.color = 'var(--color-verde-musgo)';
    }
    
    // Vibração a cada segundo
    if (workoutState.timeRemaining % 1 === 0) {
      kegelApp.vibrate(50);
    }
    
    workoutState.timeRemaining--;
    workoutState.totalWorkoutTime++;
    
    setTimeout(runWorkoutCycle, 1000);
  } else {
    // Mudar fase
    if (workoutState.currentPhase === 'contraction') {
      workoutState.currentPhase = 'relaxation';
      workoutState.timeRemaining = workoutState.relaxationTime;
      kegelApp.vibrate([100, 50, 100]); // Padrão de mudança de fase
    } else {
      workoutState.currentPhase = 'contraction';
      nextExercise();
      return;
    }
    
    runWorkoutCycle();
  }
}

// Atualizar display do treino
function updateWorkoutDisplay() {
  const repsCount = document.getElementById('reps-count');
  const seriesCount = document.getElementById('series-count');
  
  if (repsCount) {
    repsCount.textContent = `${workoutState.currentRepetition}/${workoutState.totalRepetitions}`;
  }
  
  if (seriesCount) {
    seriesCount.textContent = `${workoutState.currentSeries}/${workoutState.totalSeries}`;
  }
}

// Completar treino
function completeWorkout() {
  workoutState.isRunning = false;
  
  // Atualizar estado do usuário
  kegelApp.appState.user.totalWorkouts++;
  kegelApp.appState.user.totalMinutes += Math.floor(workoutState.totalWorkoutTime / 60);
  kegelApp.appState.user.streak++;
  
  // Atualizar display de conclusão
  const totalTime = document.getElementById('total-time');
  if (totalTime) {
    const minutes = Math.floor(workoutState.totalWorkoutTime / 60);
    const seconds = workoutState.totalWorkoutTime % 60;
    totalTime.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  const completionLevel = document.getElementById('completion-level');
  if (completionLevel) {
    completionLevel.textContent = kegelApp.appState.user.level.charAt(0).toUpperCase() + 
                                  kegelApp.appState.user.level.slice(1);
  }
  
  const completionStreak = document.getElementById('completion-streak');
  if (completionStreak) {
    completionStreak.textContent = `${kegelApp.appState.user.streak} Dia(s) (+1)`;
  }
  
  // Vibração de sucesso
  kegelApp.vibrate([100, 50, 100, 50, 100]);
  
  // Navegar para tela de conclusão
  kegelApp.navigateTo('workout-complete');
}

// Alternar modo invisível
function toggleInvisibleMode() {
  workoutState.invisibleModeActive = !workoutState.invisibleModeActive;
  
  const workoutContainer = document.querySelector('.workout-container');
  if (workoutContainer) {
    if (workoutState.invisibleModeActive) {
      workoutContainer.classList.add('invisible-mode');
    } else {
      workoutContainer.classList.remove('invisible-mode');
    }
  }
  
  kegelApp.showNotification(
    workoutState.invisibleModeActive ? 'Modo Invisível Ativado' : 'Modo Invisível Desativado',
    'info'
  );
}

// Inicializar treino quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  const workoutActiveScreen = document.getElementById('workout-active');
  if (workoutActiveScreen && !workoutActiveScreen.classList.contains('hidden')) {
    updateWorkoutDisplay();
    startWorkout();
  }
});

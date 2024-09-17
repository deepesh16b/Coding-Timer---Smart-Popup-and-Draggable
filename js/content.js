(function() {
  // Check if the popup already exists to avoid duplicates
  if (document.getElementById('cp-timer-popup')) {
    return;
  }

  // Create the popup container
  const popup = document.createElement('div');
  popup.id = 'codeforces-timer-popup';
  popup.style.position = 'fixed';
  popup.style.top = '3px';
  popup.style.right = '380px';
  popup.style.width = '180px';
  popup.style.padding = '10px';
  popup.style.paddingBottom = '0';
  popup.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'; // More opacity for better visibility
  popup.style.borderRadius = '15px';
  popup.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)'; // Enhanced shadow for more contrast
  popup.style.backdropFilter = 'blur(10px)'; // Blur effect for glassmorphism
  popup.style.border = '1px solid rgba(255, 255, 255, 0.3)'; // Border for frosted glass
  popup.style.zIndex = '10000';
  popup.style.color = '#fff'; // Default white text color
  popup.style.fontFamily = 'Arial, sans-serif';

  // Make the popup draggable
  let isDragging = false;
  let offsetX, offsetY;

  popup.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - popup.getBoundingClientRect().left;
    offsetY = e.clientY - popup.getBoundingClientRect().top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (isDragging) {
      popup.style.top = `${e.clientY - offsetY}px`;
      popup.style.left = `${e.clientX - offsetX}px`;
    }
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  // Create timer display
  const timerDisplay = document.createElement('div');
  timerDisplay.id = 'timer';
  timerDisplay.textContent = '00:10'; // Default to 10 seconds
  timerDisplay.style.fontSize = '24px';
  timerDisplay.style.textAlign = 'center';
  timerDisplay.style.fontWeight = '600';
  timerDisplay.style.marginBottom = '10px';
  timerDisplay.style.color = '#04D958'; // Light green for visibility
  popup.appendChild(timerDisplay);

  // Create duration selection buttons
  const durations = [5, 10, 20, 30]; // Minutes
  const durationContainer = document.createElement('div');
  durationContainer.style.display = 'flex';
  durationContainer.style.justifyContent = 'space-between';
  durationContainer.style.marginBottom = '10px';

  durations.forEach(duration => {
    const durationBtn = document.createElement('button');
    durationBtn.textContent = `${duration} min`;
    durationBtn.style.flex = '1';
    durationBtn.style.margin = '0 2px';
    durationBtn.style.padding = '4px';
    durationBtn.style.fontSize = '8px';
    durationBtn.style.color = '#fff';
    durationBtn.style.backgroundColor = '#04D958';
    durationBtn.style.border = '1px solid rgba(255, 255, 255, 0.4)';
    durationBtn.style.borderRadius = '5px';
    durationBtn.style.cursor = 'pointer';
    durationBtn.style.backdropFilter = 'blur(5px)'; // Slight blur for button

    durationBtn.addEventListener('click', () => {
      timeRemaining = duration * 60; // Set time in seconds
      timerDisplay.textContent = `${duration < 10 ? '0' : ''}${duration}:00`;
    });

    durationContainer.appendChild(durationBtn);
  });

  popup.appendChild(durationContainer);

  // Create start button
  const startBtn = document.createElement('button');
  startBtn.id = 'start-btn';
  startBtn.textContent = 'Start';
  startBtn.style.width = '100%';
  startBtn.style.padding = '6px';
  startBtn.style.fontSize = '12px';
  startBtn.style.margin = '0';
  startBtn.style.color = '#fff';
  startBtn.style.backgroundColor = '#04D958'; // Blue with some opacity
  startBtn.style.border = '1px solid rgba(255, 255, 255, 0.4)';
  startBtn.style.borderRadius = '8px';
  startBtn.style.cursor = 'pointer';
  startBtn.style.backdropFilter = 'blur(5px)'; // Slight blur for button
  startBtn.style.transition = 'background-color 0.3s'; // Smooth hover effect

  // Add hover effect to the button
  startBtn.addEventListener('mouseenter', () => {
    startBtn.style.backgroundColor = 'rgba(4, 217, 88, 0.8)'; // Darker blue on hover
  });
  startBtn.addEventListener('mouseleave', () => {
    startBtn.style.backgroundColor = 'rgba(4, 217, 88, 1)'; // Original blue
  });
  startBtn.addEventListener('mousedown', () => {
    startBtn.style.backgroundColor = 'rgba(4, 217, 88, 0.6)'; // Darker blue when clicked
  });

  popup.appendChild(startBtn);

  // Create timeout message
  const timeoutDisplay = document.createElement('div');
  timeoutDisplay.id = 'timeout';
  timeoutDisplay.style.textAlign = 'center';
  timeoutDisplay.style.color = '#FF2222'; 
  timeoutDisplay.style.marginTop = '10px';
  popup.appendChild(timeoutDisplay);

  // Create reset button (initially hidden)
  const resetBtn = document.createElement('button');
  resetBtn.id = 'reset-btn';
  resetBtn.textContent = 'Reset';
  resetBtn.style.width = '100%';
  resetBtn.style.padding = '6px';
  resetBtn.style.fontSize = '12px';
  resetBtn.style.margin = '0';
  resetBtn.style.color = '#fff';
  resetBtn.style.backgroundColor = '#FF4444'; // Green color for visibility
  resetBtn.style.border = '1px solid rgba(255, 255, 255, 0.4)';
  resetBtn.style.borderRadius = '8px';
  resetBtn.style.cursor = 'pointer';
  resetBtn.style.backdropFilter = 'blur(5px)'; // Slight blur for button
  resetBtn.style.transition = 'background-color 0.3s'; // Smooth hover effect
  resetBtn.style.display = 'none'; // Initially hidden

  // Add hover effect to the reset button
  resetBtn.addEventListener('mouseenter', () => {
    resetBtn.style.backgroundColor = 'rgba(255, 68, 68,  0.8)'; // Darker blue on hover
  });
  resetBtn.addEventListener('mouseleave', () => {
    resetBtn.style.backgroundColor = 'rgba(255, 68, 68,  1)'; // Original blue
  });
  resetBtn.addEventListener('mousedown', () => {
    resetBtn.style.backgroundColor = 'rgba(255, 68, 68,  0.6)'; // Darker blue when clicked
  });

  // Append reset button to the popup
  popup.appendChild(resetBtn);

  // Append popup to the body
  document.body.appendChild(popup);

  let timerInterval;
  let timeRemaining = 1 * 10; // Default to 15 minutes in seconds

  // Start button click handler
  startBtn.addEventListener('click', () => {
    if (timerInterval) {
      clearInterval(timerInterval); // Clear any existing interval
    }

    // Hide the duration selection buttons
    durationContainer.style.display = 'none';

    // Reset the timer display and timeout message
    timeoutDisplay.textContent = '';
    timerDisplay.style.color = '#04D958'; // Reset to light green

    // Hide the start button
    startBtn.style.display = 'none';

    // Start the timer
    startTimer();
  });

  // Reset button click handler
  resetBtn.addEventListener('click', () => {
    // Show the duration selection buttons
    durationContainer.style.display = 'flex';
    timeoutDisplay.style.marginTop = '10px';
    // Show the start button
    startBtn.style.display = 'block';
    timerDisplay.style.color = '#04D958';
    // Hide the reset button
    resetBtn.style.marginBottom = '0';
    timerDisplay.style.color = '#04D958';
    timerDisplay.style.textShadow = '';
    resetBtn.style.display = 'none';
    timeRemaining = 15*60;
    // Reset the timer display and timeout message
    timerDisplay.textContent = '15:00'; // Reset to default time
    timeoutDisplay.textContent = '';

    // Clear any existing interval
    clearInterval(timerInterval);
  });

  // Function to start the timer
  function startTimer() {
    timerInterval = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00';
        timerDisplay.style.color = '#FF2222'; // Red color for timeout
        resetBtn.style.display = 'block'; // Show reset button
        resetBtn.style.marginBottom = '10px';
        return;
      }

      // Update timer display
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      timeRemaining--;
    }, 1000);
  }
})();

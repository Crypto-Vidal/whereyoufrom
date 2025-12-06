// ========================================
// SMART SIZE SYSTEM - STREETWEAR E-COMMERCE
// 3-Question Deterministic Sizing Quiz
// ========================================

class SmartSizing {
  constructor() {
    this.currentQuestion = 0;
    this.answers = {
      height: null,
      chest: null,
      fit: null
    };
    this.result = null;

    this.init();
  }

  init() {
    // Only initialize if we're on the size guide page
    if (document.getElementById('sizeQuiz')) {
      this.setupQuiz();
    }
  }

  // Setup quiz event listeners
  setupQuiz() {
    const startBtn = document.getElementById('startQuizBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startQuiz());
    }

    const restartBtn = document.getElementById('restartQuizBtn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => this.restartQuiz());
    }

    // Setup question option clicks
    this.setupQuestionListeners();
  }

  // Setup listeners for quiz options
  setupQuestionListeners() {
    // Height options
    document.querySelectorAll('[data-height]').forEach(option => {
      option.addEventListener('click', () => {
        this.selectAnswer('height', option.dataset.height);
      });
    });

    // Chest options
    document.querySelectorAll('[data-chest]').forEach(option => {
      option.addEventListener('click', () => {
        this.selectAnswer('chest', option.dataset.chest);
      });
    });

    // Fit preference options
    document.querySelectorAll('[data-fit]').forEach(option => {
      option.addEventListener('click', () => {
        this.selectAnswer('fit', option.dataset.fit);
      });
    });
  }

  // Start quiz
  startQuiz() {
    this.currentQuestion = 1;
    this.answers = { height: null, chest: null, fit: null };
    this.showQuestion(1);
  }

  // Show specific question
  showQuestion(questionNum) {
    // Hide all sections
    document.getElementById('quizIntro')?.classList.add('hidden');
    document.getElementById('question1')?.classList.add('hidden');
    document.getElementById('question2')?.classList.add('hidden');
    document.getElementById('question3')?.classList.add('hidden');
    document.getElementById('quizResult')?.classList.add('hidden');

    // Show current question
    const questionEl = document.getElementById(`question${questionNum}`);
    if (questionEl) {
      questionEl.classList.remove('hidden');
      questionEl.classList.add('fade-in');
    }

    this.currentQuestion = questionNum;
  }

  // Select answer and move to next question
  selectAnswer(type, value) {
    this.answers[type] = value;

    // Highlight selected option
    const options = document.querySelectorAll(`[data-${type}]`);
    options.forEach(opt => {
      opt.classList.remove('selected');
      if (opt.dataset[type] === value) {
        opt.classList.add('selected');
      }
    });

    // Move to next question or show result
    setTimeout(() => {
      if (this.currentQuestion === 1) {
        this.showQuestion(2);
      } else if (this.currentQuestion === 2) {
        this.showQuestion(3);
      } else if (this.currentQuestion === 3) {
        this.calculateResult();
      }
    }, 300);
  }

  // Calculate size based on answers
  calculateResult() {
    const { height, chest, fit } = this.answers;

    // Deterministic sizing logic
    let baseSize = this.getBaseSize(height, chest);
    let finalSize = this.adjustForFit(baseSize, fit);

    this.result = {
      size: finalSize,
      confidence: this.getConfidence(height, chest, fit),
      fitDescription: this.getFitDescription(fit),
      measurements: this.getMeasurements(finalSize)
    };

    this.showResult();
  }

  // Get base size from height and chest
  getBaseSize(height, chest) {
    // Height categories: short (< 5'7"), average (5'7" - 6'0"), tall (> 6'0")
    // Chest categories: slim (< 38"), average (38" - 42"), broad (> 42")

    const sizeMatrix = {
      'short-slim': 'S',
      'short-average': 'M',
      'short-broad': 'L',
      'average-slim': 'S',
      'average-average': 'M',
      'average-broad': 'L',
      'tall-slim': 'M',
      'tall-average': 'L',
      'tall-broad': 'XL'
    };

    const key = `${height}-${chest}`;
    return sizeMatrix[key] || 'M';
  }

  // Adjust size based on fit preference
  adjustForFit(baseSize, fit) {
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const currentIndex = sizes.indexOf(baseSize);

    if (fit === 'slim' && currentIndex > 0) {
      return sizes[currentIndex - 1];
    } else if (fit === 'oversized' && currentIndex < sizes.length - 1) {
      return sizes[currentIndex + 1];
    }

    return baseSize;
  }

  // Get confidence level
  getConfidence(height, chest, fit) {
    // Higher confidence for average measurements
    if (height === 'average' && chest === 'average') {
      return 95;
    } else if (height === 'average' || chest === 'average') {
      return 85;
    }
    return 75;
  }

  // Get fit description
  getFitDescription(fit) {
    const descriptions = {
      'slim': 'Tailored, close to body',
      'regular': 'Classic streetwear fit',
      'oversized': 'Relaxed, roomy drop'
    };
    return descriptions[fit] || descriptions.regular;
  }

  // Get measurements for size
  getMeasurements(size) {
    const measurements = {
      'XS': { chest: '34-36"', length: '27"', shoulders: '17"' },
      'S': { chest: '36-38"', length: '28"', shoulders: '18"' },
      'M': { chest: '38-40"', length: '29"', shoulders: '19"' },
      'L': { chest: '40-42"', length: '30"', shoulders: '20"' },
      'XL': { chest: '42-44"', length: '31"', shoulders: '21"' },
      'XXL': { chest: '44-46"', length: '32"', shoulders: '22"' }
    };
    return measurements[size] || measurements.M;
  }

  // Show result
  showResult() {
    document.getElementById('question3')?.classList.add('hidden');

    const resultEl = document.getElementById('quizResult');
    if (resultEl) {
      resultEl.classList.remove('hidden');
      resultEl.classList.add('fade-in');

      // Update result content
      document.getElementById('resultSize').textContent = this.result.size;
      document.getElementById('resultConfidence').textContent = `${this.result.confidence}%`;
      document.getElementById('resultFit').textContent = this.result.fitDescription;

      // Update measurements
      const measurements = this.result.measurements;
      document.getElementById('measureChest').textContent = measurements.chest;
      document.getElementById('measureLength').textContent = measurements.length;
      document.getElementById('measureShoulders').textContent = measurements.shoulders;

      // Update fit meter
      this.updateFitMeter(this.answers.fit);
    }

    // Save result to localStorage
    this.saveResult();
  }

  // Update fit meter visualization
  updateFitMeter(fit) {
    const meterIndicator = document.getElementById('fitMeterIndicator');
    if (!meterIndicator) return;

    const positions = {
      'slim': '15%',
      'regular': '50%',
      'oversized': '85%'
    };

    meterIndicator.style.left = positions[fit] || positions.regular;
  }

  // Restart quiz
  restartQuiz() {
    this.currentQuestion = 0;
    this.answers = { height: null, chest: null, fit: null };
    this.result = null;

    // Remove selected classes
    document.querySelectorAll('.size-option').forEach(opt => {
      opt.classList.remove('selected');
    });

    // Show intro
    document.getElementById('quizResult')?.classList.add('hidden');
    document.getElementById('quizIntro')?.classList.remove('hidden');
  }

  // Save result to localStorage
  saveResult() {
    try {
      const resultData = {
        size: this.result.size,
        answers: this.answers,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('streetwearSizeResult', JSON.stringify(resultData));
    } catch (e) {
      console.error('Failed to save size result:', e);
    }
  }

  // Load saved result
  loadSavedResult() {
    try {
      const saved = localStorage.getItem('streetwearSizeResult');
      if (saved) {
        const data = JSON.parse(saved);
        return data.size;
      }
    } catch (e) {
      console.error('Failed to load saved result:', e);
    }
    return null;
  }

  // Get recommended size for product cards
  getRecommendedSize() {
    return this.loadSavedResult() || 'M';
  }
}

// Initialize sizing when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.sizing = new SmartSizing();
  });
} else {
  window.sizing = new SmartSizing();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SmartSizing;
}

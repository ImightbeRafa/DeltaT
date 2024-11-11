import React, { useEffect, useRef } from 'react';

const SnakeGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Game variables
    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 1;
    let dy = 0;
    const gridSize = 20;
    const tileCount = 20;
    
    // Game loop
    function gameLoop() {
      moveSnake();
      if (checkCollision()) {
        // Game over
        return;
      }
      checkFoodCollision();
      drawGame();
      setTimeout(gameLoop, 100);
    }
    
    // Move snake
    function moveSnake() {
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        generateFood();
      } else {
        snake.pop();
      }
    }
    
    // Check collision
    function checkCollision() {
      const head = snake[0];
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
      }
      for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          return true;
        }
      }
      return false;
    }
    
    // Check food collision
    function checkFoodCollision() {
      const head = snake[0];
      if (head.x === food.x && head.y === food.y) {
        generateFood();
      }
    }
    
    // Generate food
    function generateFood() {
      food.x = Math.floor(Math.random() * tileCount);
      food.y = Math.floor(Math.random() * tileCount);
    }
    
    // Draw game
    function drawGame() {
      // Clear canvas
      ctx.fillStyle = '#2C3E50';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw snake
      ctx.fillStyle = '#2ECC71';
      snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
      });
      
      // Draw food
      ctx.fillStyle = '#E74C3C';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }
    
    // Handle key presses
    function changeDirection(e) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
      
      const keyPressed = e.keyCode;
      const goingUp = dy === -1;
      const goingDown = dy === 1;
      const goingRight = dx === 1;
      const goingLeft = dx === -1;
      
      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
      }
    }
    
    // Event listeners
    document.addEventListener('keydown', changeDirection);
    
    // Start game
    gameLoop();
    
    // Cleanup
    return () => {
      document.removeEventListener('keydown', changeDirection);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <canvas ref={canvasRef} width="400" height="400" style={{ border: '1px solid #000' }}></canvas>
    </div>
  );
};

export default SnakeGame;
const starConfigs = [
    { zoneClass: '.easter-egg-zone', containerId: 'stars-container1' },
    { zoneClass: '.easter-egg-zone2', containerId: 'stars-container2' },
    { zoneClass: '.easter-egg-zone3', containerId: 'stars-container3' }
  ];
  
  const colors = ['#FFD700', '#FF4500', '#00BFFF', '#FF69B4', '#ADFF2F', '#40E0D0'];
  
  starConfigs.forEach(({ zoneClass, containerId }) => {
    const zone = document.querySelector(zoneClass);
    const container = document.getElementById(containerId);
    let intervalId;
  
    function createStar() {
      const star = document.createElement('div');
      star.classList.add('star');
      const size = Math.random() * 6 + 4;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      star.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
      star.style.animationDelay = `${Math.random()}s`;
  
      container.appendChild(star);
      setTimeout(() => star.remove(), 3000);
    }
  
    function startStars() {
      for (let i = 0; i < 15; i++) createStar();
      intervalId = setInterval(createStar, 300);
    }
  
    function stopStars() {
      clearInterval(intervalId);
      container.innerHTML = '';
    }
  
    zone.addEventListener('mouseenter', startStars);
    zone.addEventListener('mouseleave', stopStars);
  });
  
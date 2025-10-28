(function() {
  // 初始化NProgress
  if (typeof NProgress !== 'undefined') {
    // 页面开始加载时启动进度条
    NProgress.start();
    
    // 页面加载完成时结束进度条
    document.addEventListener('DOMContentLoaded', function() {
      NProgress.done();
    });
    
    // 页面准备就绪但资源仍在加载时设置为80%
    window.addEventListener('load', function() {
      NProgress.set(0.8);
    });
  }

  // 平滑滚动效果
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // 回到顶部按钮
  function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '&uarr;';
    button.setAttribute('id', 'back-to-top');
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.width = '40px';
    button.style.height = '40px';
    button.style.borderRadius = '50%';
    button.style.backgroundColor = '#0066cc';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.fontSize = '20px';
    button.style.cursor = 'pointer';
    button.style.display = 'none';
    button.style.zIndex = '99';
    button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    button.style.transition = 'opacity 0.3s';

    document.body.appendChild(button);

    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    });
  }

  // 当DOM加载完成后创建回到顶部按钮
  document.addEventListener('DOMContentLoaded', () => {
    createBackToTopButton();
    
    // 暗黑模式切换
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // 检查本地存储中的主题设置
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      htmlElement.classList.remove('light-mode');
      htmlElement.classList.add('dark-mode');
      themeToggle.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
      htmlElement.classList.toggle('dark-mode');
      htmlElement.classList.toggle('light-mode');
      
      // 保存用户选择到本地存储
      if (htmlElement.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
      } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
      }
    });
    
    // 滚动进度条
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    
    if (scrollProgressBar) {
      window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        scrollProgressBar.style.width = scrollPercent + '%';
      });
    }
    
    // 代码复制功能
    function addCopyButtons() {
      const codeBlocks = document.querySelectorAll('pre');
      
      codeBlocks.forEach((block) => {
        // 检查是否已经添加了复制按钮
        if (block.querySelector('.code-copy-btn')) return;
        
        const copyButton = document.createElement('button');
        copyButton.className = 'code-copy-btn';
        copyButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
        `;
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        
        copyButton.addEventListener('click', () => {
          const code = block.querySelector('code');
          if (!code) return;
          
          const text = code.innerText;
          
          navigator.clipboard.writeText(text).then(() => {
            copyButton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            `;
            copyButton.classList.add('success');
            
            setTimeout(() => {
              copyButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
              `;
              copyButton.classList.remove('success');
            }, 2000);
          });
        });
        
        block.style.position = 'relative';
        block.appendChild(copyButton);
      });
    }
    
    // 添加代码复制按钮
    addCopyButtons();
  });
})();
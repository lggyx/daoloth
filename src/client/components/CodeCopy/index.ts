// 代码复制组件
class CodeCopy {
  private clipboardIcon: string;
  private successIcon: string;
  
  constructor() {
    this.clipboardIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      </svg>
    `;
    
    this.successIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
    
    this.init();
  }
  
  private init(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.addCopyButtons();
    });
  }
  
  private addCopyButtons(): void {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach((block) => {
      // 检查是否已经添加了复制按钮
      if (block.querySelector('.code-copy-btn')) return;
      
      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-btn';
      copyButton.innerHTML = this.clipboardIcon;
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');
      
      copyButton.addEventListener('click', () => {
        const code = block.querySelector('code');
        if (!code) return;
        
        const text = code.innerText;
        
        navigator.clipboard.writeText(text).then(() => {
          copyButton.innerHTML = this.successIcon;
          copyButton.classList.add('success');
          
          setTimeout(() => {
            copyButton.innerHTML = this.clipboardIcon;
            copyButton.classList.remove('success');
          }, 2000);
        });
      });
      
      block.style.position = 'relative';
      block.appendChild(copyButton);
    });
  }
}

// 初始化代码复制组件
new CodeCopy();

export default CodeCopy;
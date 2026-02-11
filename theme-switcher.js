// theme-switcher.js - 主题切换系统
(function() {
    'use strict';
    const themes = [
        { id: 'colourful', name: 'Colourful(默认)' },
        { id: 'aero', name: 'Aero(无法使用透明背景)' },
        { id: 'elegant', name: 'Elegant(无法使用透明背景)' },
        { id: 'metro', name: 'Metro' }
    ];
    function init() {
        createThemeSelector();
        const savedTheme = localStorage.getItem('siry-theme') || 'colourful';
        setTheme(savedTheme);
        document.body.classList.add('theme-active');
    }
    function createThemeSelector() {
        const header = document.querySelector('.header');
        if (!header) return;
        const container = document.createElement('div');
        container.id = 'theme-selector-container';
        container.style.cssText = 'position: absolute; top: 20px; right: 20px; z-index: 1000;';
        const select = document.createElement('select');
        select.id = 'theme-selector';
        select.title = '切换主题';
        select.style.cssText = 'padding: 8px 16px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.2); color: white; backdrop-filter: blur(10px); cursor: pointer; font-size: 14px; outline: none;';
        themes.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme.id;
            option.textContent = theme.name;
            select.appendChild(option);
        });
        select.addEventListener('change', function() {
            setTheme(this.value);
            localStorage.setItem('siry-theme', this.value);
        });
        container.appendChild(select);
        header.style.position = 'relative';
        header.appendChild(container);
        if (window.innerWidth <= 768) {
            container.style.top = '10px';
            container.style.right = '10px';
            select.style.padding = '6px 12px';
            select.style.fontSize = '13px';
        }
    }
    function setTheme(themeId) {
        document.body.classList.remove(...themes.map(t => `theme-${t.id}`));
        document.body.classList.add(`theme-${themeId}`);
        const selector = document.getElementById('theme-selector');
        if (selector) selector.value = themeId;
    }
    window.SiryThemes = { themes, setTheme, getCurrentTheme: () => localStorage.getItem('siry-theme') || 'colourful' };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
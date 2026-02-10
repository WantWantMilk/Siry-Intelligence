// background-manager.js - 背景图片管理系统
(function() {
    'use strict';

    // ==================== 背景图片配置 ====================
    const backgroundOptions = [
        {
            id: 'none',
            name: '🔄 无背景 (使用主题默认)',
            url: null
        },
        {
            id: 'full_transparent',
            name: '🪟 全透明 (纯净展示)',
            url: null
        },
        {
            id: 'mountains',
            name: '远方的山峦',
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
        },
        {
            id: 'narutoweishou',
            name: '漩涡鸣人-尾兽化',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/43_241010_JP.jpg'
        }
        {
            id: ' narutoone',
            name: '漩涡鸣人1',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/91_251101_wp_jp.jpg'
        }
        {
            id: 'narutotwo',
            name: '漩涡鸣人2',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/106_260201_wp_jp.jpg'
        }
        {
            id: 'narutothree',
            name: '漩涡鸣人3',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/83_250901_wp_jp.jpg'
        }
        {
            id: 'mingzuo',
            name: '漩涡鸣人·宇智波佐助',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/78_250801_wp_jp.jpg'
        }
        {
            id: ' Kakashi',
            name: '旗木卡卡西',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/85_250915_jp.jpg'
        }
        // 您可以继续在此处添加更多背景...
        // 格式：{ id: '自定义英文ID', name: '🌠 显示名称', url: '您的图片链接' }
    ];

    // ==================== 核心函数 ====================
    function initBackgroundManager() {
        createBackgroundSelector();
        const savedBg = localStorage.getItem('siry-background') || 'none';
        setBackground(savedBg);
    }

    function createBackgroundSelector() {
        const themeContainer = document.getElementById('theme-selector-container');
        if (!themeContainer) {
            setTimeout(createBackgroundSelector, 100);
            return;
        }

        const bgContainer = document.createElement('div');
        bgContainer.id = 'background-selector-container';
        bgContainer.style.cssText = `
            position: absolute;
            top: 60px;
            right: 20px;
            z-index: 1000;
        `;

        const select = document.createElement('select');
        select.id = 'background-selector';
        select.title = '切换背景';
        select.style.cssText = `
            padding: 8px 16px;
            border-radius: 20px;
            border: 1px solid rgba(255,255,255,0.3);
            background: rgba(255,255,255,0.2);
            color: white;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            cursor: pointer;
            font-size: 14px;
            outline: none;
            min-width: 180px;
        `;

        backgroundOptions.forEach(bg => {
            const option = document.createElement('option');
            option.value = bg.id;
            option.textContent = bg.name;
            select.appendChild(option);
        });

        select.addEventListener('change', function() {
            setBackground(this.value);
            localStorage.setItem('siry-background', this.value);
        });

        bgContainer.appendChild(select);
        themeContainer.parentNode.appendChild(bgContainer);

        if (window.innerWidth <= 768) {
            bgContainer.style.top = '50px';
            bgContainer.style.right = '10px';
            select.style.padding = '6px 12px';
            select.style.fontSize = '13px';
            select.style.minWidth = '160px';
        }
    }

    function setBackground(backgroundId) {
        const bgConfig = backgroundOptions.find(bg => bg.id === backgroundId) || backgroundOptions[0];
        let styleTag = document.getElementById('dynamic-background-style');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-background-style';
            document.head.appendChild(styleTag);
        }

        // 动态生成CSS
        let cssRules = '';
        
        // 情况1：全透明模式
        if (backgroundId === 'full_transparent') {
            cssRules = `
                body.theme-active {
                    background-image: var(--current-background-image) !important;
                    background-size: cover !important;
                    background-position: center !important;
                    background-attachment: fixed !important;
                    background-repeat: no-repeat !important;
                }
                body.theme-active .main-container,
                body.theme-active .chat-messages,
                body.theme-active .auth-card,
                body.theme-active input {
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }
                body.theme-active .main-container {
                    background: rgba(255, 255, 255, 0.05) !important;
                    border: 1px solid rgba(255, 255, 255, 0.15) !important;
                }
                body.theme-active .chat-messages,
                body.theme-active .auth-card {
                    background: rgba(255, 255, 255, 0.03) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                }
                body.theme-active input,
                body.theme-active .pin-input,
                body.theme-active .chat-input {
                    background: rgba(255, 255, 255, 0.08) !important;
                    border: 1px solid rgba(255, 255, 255, 0.25) !important;
                    color: var(--text) !important;
                }
                body.theme-active .user-message {
                    background: linear-gradient(135deg, rgba(106, 137, 204, 0.7), rgba(74, 105, 189, 0.7)) !important;
                }
                body.theme-active .bot-message {
                    background: rgba(255, 255, 255, 0.15) !important;
                }
                body.theme-active .header {
                    background: linear-gradient(90deg, rgba(120, 119, 198, 0.65), rgba(154, 130, 219, 0.65)) !important;
                }
                body.theme-active .footer {
                    background: rgba(255, 255, 255, 0.03) !important;
                }
            `;
        }
        // 情况2：选择了具体的背景图片URL
        else if (bgConfig.url) {
            cssRules = `
                body.theme-active {
                    background-image: linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), url("${bgConfig.url}") !important;
                    background-size: cover !important;
                    background-position: center !important;
                    background-attachment: fixed !important;
                    background-repeat: no-repeat !important;
                    background-color: transparent !important;
                }
                body.theme-active .main-container {
                    background: rgba(255, 255, 255, 0.08) !important;
                    backdrop-filter: blur(20px) saturate(160%) !important;
                    -webkit-backdrop-filter: blur(20px) saturate(160%) !important;
                    border: 1px solid rgba(255, 255, 255, 0.25) !important;
                }
                body.theme-active .chat-messages,
                body.theme-active .auth-card {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                }
                body.theme-active input,
                body.theme-active .pin-input,
                body.theme-active .chat-input {
                    background: rgba(255, 255, 255, 0.15) !important;
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                    color: var(--text) !important;
                }
                body.theme-active .user-message {
                    background: linear-gradient(135deg, rgba(106, 137, 204, 0.85), rgba(74, 105, 189, 0.85)) !important;
                }
                body.theme-active .bot-message {
                    background: rgba(255, 255, 255, 0.2) !important;
                }
                body.theme-active .header {
                    background: linear-gradient(90deg, rgba(120, 119, 198, 0.8), rgba(154, 130, 219, 0.8)) !important;
                }
                body.theme-active .footer {
                    background: rgba(255, 255, 255, 0.1) !important;
                }
            `;
        }
        // 情况3：选择了“无背景”
        else {
            cssRules = `
                body.theme-active {
                    background-image: none !important;
                }
            `;
        }

        // 保存背景图URL到CSS变量，供“全透明”模式使用
        if (bgConfig.url) {
            document.body.style.setProperty('--current-background-image', `url("${bgConfig.url}")`);
        } else if (backgroundId !== 'full_transparent') {
            document.body.style.removeProperty('--current-background-image');
        }

        styleTag.textContent = cssRules;
        
        const selector = document.getElementById('background-selector');
        if (selector) selector.value = backgroundId;

        console.log(`背景已切换: ${bgConfig.name}`);
    }

    // ==================== 公开API ====================
    window.SiryBackground = {
        backgrounds: backgroundOptions,
        setBackground: setBackground,
        getCurrentBackground: () => localStorage.getItem('siry-background') || 'none'
    };

    // ==================== 初始化 ====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackgroundManager);
    } else {
        initBackgroundManager();
    }

})();
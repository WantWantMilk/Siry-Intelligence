// background-manager.js - 背景图片管理系统
(function() {
    'use strict';

    // ==================== 背景图片配置 ====================
    // 请在此处添加您的图片链接，并为其命名
    const backgroundOptions = [
        {
            id: 'none',
            name: '🔄 无背景 (使用主题默认)',
            url: null // 无背景，使用主题自带的渐变
        },
        {
            id: 'mountains', // 示例1：自然风景
            name: '🏔️ 远山',
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
        },
        {
            id: 'abstract', // 示例2：抽象色彩
            name: '🎨 抽象色彩',
            url: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
        },
        {
            id: 'night_sky', // 示例3：夜空
            name: '🌌 星空',
            url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w-1350&q=80'
        }
        // 您可以继续在此处添加更多背景...
        // 格式：{ id: '自定义英文ID', name: '🌠 显示名称', url: '您的图片链接' }
    ];

    // ==================== 核心逻辑 ====================
    function initBackgroundManager() {
        // 1. 创建背景选择器UI
        createBackgroundSelector();
        
        // 2. 加载已保存的背景设置
        const savedBg = localStorage.getItem('siry-background') || 'none';
        setBackground(savedBg);
    }

    function createBackgroundSelector() {
        // 将选择器添加到主题选择器旁边
        const themeContainer = document.getElementById('theme-selector-container');
        if (!themeContainer) {
            // 如果主题选择器尚未加载，稍后重试
            setTimeout(createBackgroundSelector, 100);
            return;
        }

        // 创建背景选择器
        const bgContainer = document.createElement('div');
        bgContainer.id = 'background-selector-container';
        bgContainer.style.cssText = `
            position: absolute;
            top: 60px; /* 放在主题选择器下方 */
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

        // 添加选项
        backgroundOptions.forEach(bg => {
            const option = document.createElement('option');
            option.value = bg.id;
            option.textContent = bg.name;
            select.appendChild(option);
        });

        // 切换事件
        select.addEventListener('change', function() {
            setBackground(this.value);
            localStorage.setItem('siry-background', this.value);
        });

        bgContainer.appendChild(select);
        themeContainer.parentNode.appendChild(bgContainer);

        // 移动端适配
        if (window.innerWidth <= 768) {
            bgContainer.style.top = '50px';
            bgContainer.style.right = '10px';
            select.style.padding = '6px 12px';
            select.style.fontSize = '13px';
            select.style.minWidth = '160px';
        }
    }

    function setBackground(backgroundId) {
        // 找到选中的背景配置
        const bgConfig = backgroundOptions.find(bg => bg.id === backgroundId) || backgroundOptions[0];
        
        // 获取或创建样式标签
        let styleTag = document.getElementById('dynamic-background-style');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-background-style';
            document.head.appendChild(styleTag);
        }

        // 动态生成CSS - 使用高优先级规则
        let cssRules = '';
        if (bgConfig.url) {
            // 【核心修正】为body本身直接添加背景，并叠加白色遮罩确保文字可读
            cssRules = `
                body.theme-active {
                    background-image: linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url("${bgConfig.url}") !important;
                    background-size: cover !important;
                    background-position: center !important;
                    background-attachment: fixed !important;
                    background-repeat: no-repeat !important;
                    /* 保留主题原有的渐变作为后备色 */
                    background-color: transparent !important;
                }
                /* 增强主容器的玻璃通透感，以适配背景图 */
                body.theme-active .main-container {
                    background: rgba(255, 255, 255, 0.18) !important;
                    backdrop-filter: blur(25px) saturate(180%) !important;
                    -webkit-backdrop-filter: blur(25px) saturate(180%) !important;
                }
            `;
        } else {
            // 选择“无背景”时，彻底移除图片并恢复主题
            cssRules = `
                body.theme-active {
                    background-image: none !important;
                }
            `;
        }

        styleTag.textContent = cssRules;
        
        // 更新选择器显示
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
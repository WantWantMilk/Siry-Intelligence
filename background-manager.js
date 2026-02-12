// background-manager.js - 背景图片管理系统（独立透明开关版）
(function() {
    'use strict';

    // ==================== 背景图片配置 ====================
    const backgroundOptions = [
        {
            id: 'none',
            name: '无背景(默认)',
            url: null
        },
        {
            id: 'mountains',
            name: '远方的山峦',
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
        },
        {
            id: 'narutohorse',
            name: '漩涡鸣人「马年限定」',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/102_250101_wp_jp.jpg'
        },
        {
            id: 'gaomingrui',
            name: '高明锐「回眸一笑百霉生」',
            url: 'https://cdn.jsdelivr.net/gh/WantWantMilk/Siry-Intelligence@main/Gaomingrui250930.jpg'
        },
        {
            id: 'gaomingruitanxian',
            name: '高明锐「黑夜探险」',
            url: 'https://cdn.jsdelivr.net/gh/WantWantMilk/Siry-Intelligence@main/images/IMG_2277.JPG'
        },
        {
            id: 'gaomingruibaonu',
            name: '高明锐「暴怒」',
            url: 'https://cdn.jsdelivr.net/gh/WantWantMilk/Siry-Intelligence@main/images/gmrbaonu.PNG'
        },
        {
            id: 'gaomingruibuxie',
            name: '高明锐「不屑」',
            url: 'https://cdn.jsdelivr.net/gh/WantWantMilk/Siry-Intelligence@main/images/gmr-buxie.PNG'
        },
        {
            id: 'gaomingruitangxiao',
            name: '高明锐「唐笑」',
            url: 'https://cdn.jsdelivr.net/gh/WantWantMilk/Siry-Intelligence@main/images/gmrshaxiao.PNG'
        },
        {
            id: 'gaomingruizhandou',
            name: '高明锐「战斗」',
            url: 'https://cdn.jsdelivr.net/gh/WantWantMilk/Siry-Intelligence@main/images/gmrshaxiao.PNG'
        },
        {
            id: 'gaomingruizhuoyulou',
            name: '西街初中「琢玉楼」',
            url: 'https://cdn.jsdelivr.net/gh/WantWantMilk/Siry-Intelligence@main/images/Xijie3byHarmory2.PNG'
        },
        {
            id: 'gaomingruiyumaoqiu',
            name: '高明锐「羽毛球」',
            url: 'https://cdn.jsdelivr.net/gh/WantWantMilk/Siry-Intelligence@main/images/HarmorybyZhaoQuanxin.PNG'
        },
        {
            id: 'narutoweishou',
            name: '漩涡鸣人「暴怒」',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/43_241010_JP.jpg'
        },
        {
            id: 'narutoone',
            name: '漩涡鸣人「火影」',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/91_251101_wp_jp.jpg'
        },
        {
            id: 'narutotwo',
            name: '漩涡鸣人「仙人模式」',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/106_260201_wp_jp.jpg'
        },
        {
            id: 'narutothree',
            name: '漩涡鸣人「卷首」',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/83_250901_wp_jp.jpg'
        },
        {
            id: 'narutoliyu',
            name: '漩涡鸣人「鲤鱼旗」',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/12_240503_JP.jpg'
        },
        {
            id: 'narutojifeng',
            name: '漩涡鸣人「疾风传」',
            url: 'https://naruto-official.com/index/char_naruto.webp'
        },
        {
            id: 'mingzuo',
            name: '漩涡鸣人·宇智波佐助',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/78_250801_wp_jp.jpg'
        },
        {
            id: 'Kakashi',
            name: '旗木卡卡西',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/85_250915_jp.jpg'
        },
        {
            id: 'animeNARUTO',
            name: '火影忍者',
            url: 'https://naruto-official.com/anime/series/naruto2_visual.webp'
        },
        {
            id: 'minato',
            name: '波风水门',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/104_260125_jp.jpg'
        },
        {
            id: 'hiddenleaf',
            name: '木叶村',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/101_250101_wp_jp.jpg'
        },
        {
            id: 'Christ',
            name: '火影忍者「圣诞节限定」',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/99_251225_jp.jpg'
        },
        {
            id: 'chenyufan',
            name: '陈芋帆·校花(即将推出)',
            url: 'https://naruto-official.com/special/wallpaper_gallery/wallpaper/jp/102_250101_wp_jp.jpg'
        },
        {
            id: 'teachers',
            name: '邓伟·邱兴华·谭祥胜',
            url: 'https://youke.xn--y7xa690gmna.cn/s1/2026/02/12/698dbfcfe287c.webp'
        },
        // 您可以继续在此处添加更多背景...
        // 格式：{ id: '自定义英文ID', name: '显示名称', url: '图片链接' }
    ];

    // ==================== 全局状态 ====================
    let currentBackgroundId = localStorage.getItem('siry-background') || 'none';
    let transparentEnabled = localStorage.getItem('siry-transparent') === 'true';

    // ==================== 迁移旧版数据（处理 full_transparent） ====================
    if (currentBackgroundId === 'full_transparent') {
        // 旧版将 full_transparent 视为一个独立选项，新版改为开关
        transparentEnabled = true;
        currentBackgroundId = 'mountains'; // 默认切换到第一张图片（远方的山峦）
        localStorage.setItem('siry-transparent', 'true');
        localStorage.setItem('siry-background', currentBackgroundId);
    }

    // ==================== 核心函数 ====================
    function initBackgroundManager() {
        createBackgroundSelector();
        createTransparentSwitch();
        applyBackground(); // 统一应用当前状态
    }

    // ---------- 背景选择器 ----------
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

        // 设置当前选中项
        select.value = currentBackgroundId;

        select.addEventListener('change', function() {
            currentBackgroundId = this.value;
            localStorage.setItem('siry-background', currentBackgroundId);
            applyBackground();
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

    // ---------- 透明开关 ----------
    function createTransparentSwitch() {
        const themeContainer = document.getElementById('theme-selector-container');
        if (!themeContainer) {
            setTimeout(createTransparentSwitch, 100);
            return;
        }

        // 确保背景选择器已存在，将开关放在其下方
        const bgContainer = document.getElementById('background-selector-container');
        if (!bgContainer) {
            setTimeout(createTransparentSwitch, 100);
            return;
        }

        const switchContainer = document.createElement('div');
        switchContainer.id = 'transparent-switch-container';
        switchContainer.style.cssText = `
            position: absolute;
            top: 110px;
            right: 20px;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 16px;
            border-radius: 30px;
            border: 1px solid rgba(255,255,255,0.3);
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: white;
            font-size: 14px;
            min-width: 160px;
            box-sizing: border-box;
        `;

        // 标签
        const label = document.createElement('span');
        label.textContent = '全透明模式';
        label.style.flex = '1';

        // 滑动开关
        const toggleLabel = document.createElement('label');
        toggleLabel.style.cssText = `
            position: relative;
            display: inline-block;
            width: 52px;
            height: 28px;
            margin: 0;
            cursor: pointer;
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'transparent-toggle';
        checkbox.checked = transparentEnabled;
        checkbox.style.cssText = `
            opacity: 0;
            width: 0;
            height: 0;
            position: absolute;
        `;

        const slider = document.createElement('span');
        slider.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${transparentEnabled ? '#4CAF50' : '#ccc'};
            border-radius: 34px;
            transition: 0.3s;
        `;

        const knob = document.createElement('span');
        knob.style.cssText = `
            position: absolute;
            content: "";
            height: 22px;
            width: 22px;
            left: ${transparentEnabled ? '26px' : '4px'};
            bottom: 3px;
            background-color: white;
            border-radius: 50%;
            transition: 0.3s;
        `;

        slider.appendChild(knob);
        toggleLabel.appendChild(checkbox);
        toggleLabel.appendChild(slider);

        checkbox.addEventListener('change', function(e) {
            transparentEnabled = e.target.checked;
            localStorage.setItem('siry-transparent', transparentEnabled);
            // 更新滑块样式
            slider.style.backgroundColor = transparentEnabled ? '#4CAF50' : '#ccc';
            knob.style.left = transparentEnabled ? '26px' : '4px';
            applyBackground();
        });

        switchContainer.appendChild(label);
        switchContainer.appendChild(toggleLabel);

        // 将开关添加到背景选择器的父节点，放在背景选择器后面
        bgContainer.parentNode.appendChild(switchContainer);

        // 移动端适配
        if (window.innerWidth <= 768) {
            switchContainer.style.top = '100px';
            switchContainer.style.right = '10px';
            switchContainer.style.padding = '6px 12px';
            switchContainer.style.fontSize = '13px';
            switchContainer.style.minWidth = '150px';
        }
    }

    // ---------- 应用背景样式（核心）----------
    function applyBackground() {
        const bgConfig = backgroundOptions.find(bg => bg.id === currentBackgroundId) || backgroundOptions[0];
        let styleTag = document.getElementById('dynamic-background-style');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-background-style';
            document.head.appendChild(styleTag);
        }

        let cssRules = '';

        // 情况1：无背景
        if (currentBackgroundId === 'none' || !bgConfig.url) {
            cssRules = `
                body.theme-active {
                    background-image: none !important;
                }
            `;
            document.body.style.removeProperty('--current-background-image');
        }
        // 情况2：有背景图片
        else {
            // 保存图片URL供透明模式使用
            document.body.style.setProperty('--current-background-image', `url("${bgConfig.url}")`);

            if (transparentEnabled) {
                // ----- 全透明模式（无毛玻璃，极致通透）-----
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
            } else {
                // ----- 普通高通透毛玻璃模式 -----
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
        }

        styleTag.textContent = cssRules;

        // 更新背景选择器的显示值
        const bgSelector = document.getElementById('background-selector');
        if (bgSelector) bgSelector.value = currentBackgroundId;

        console.log(`背景: ${bgConfig.name}, 透明模式: ${transparentEnabled}`);
    }

    // ==================== 公开API ====================
    window.SiryBackground = {
        backgrounds: backgroundOptions,
        setBackground: function(id) {
            currentBackgroundId = id;
            localStorage.setItem('siry-background', id);
            applyBackground();
        },
        setTransparent: function(enabled) {
            transparentEnabled = enabled;
            localStorage.setItem('siry-transparent', enabled);
            // 更新开关UI（如果已存在）
            const toggle = document.getElementById('transparent-toggle');
            if (toggle) {
                toggle.checked = enabled;
                // 手动触发滑块样式更新
                const slider = toggle.nextElementSibling;
                if (slider) {
                    slider.style.backgroundColor = enabled ? '#4CAF50' : '#ccc';
                    const knob = slider.querySelector('span');
                    if (knob) knob.style.left = enabled ? '26px' : '4px';
                }
            }
            applyBackground();
        },
        getCurrentBackground: () => currentBackgroundId,
        isTransparentEnabled: () => transparentEnabled
    };

    // ==================== 初始化 ====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackgroundManager);
    } else {
        initBackgroundManager();
    }

})();
# Helldivers 2 图标更新指南

## 需要更新的核心图标文件

以下图标文件需要更换为Helldivers 2主题的设计：

### 必需图标文件：
1. **favicon.ico** (16x16, 32x32) - 浏览器标签页图标
2. **favicon-16x16.png** - 小尺寸网站图标
3. **favicon-32x32.png** - 标准尺寸网站图标
4. **apple-touch-icon.png** (180x180) - iOS主屏幕图标
5. **logo.png** (192x192) - PWA应用图标

## 设计要求

### Helldivers 2 主题元素：
- **配色方案**：
  - 主色：Super Earth Blue (#0066cc)
  - 强调色：Super Earth Gold/Yellow (#ffd700)
  - 警告色：Alert Red (#ff4444)
  - 金属灰：Steel Gray (#6c757d)

### 设计风格：
- 军事科幻风格
- 盾牌或武器元素
- Super Earth标志性颜色
- 坚硬、棱角分明的边缘
- 可选文字："HD2"或"SE"（Super Earth）

### 图标设计建议：
1. **盾牌设计**：蓝色渐变背景的盾牌，中央有金色武器图标
2. **武器图标**：简化的突击步枪轮廓，蓝黄配色
3. **Super Earth标志**：结合地球和星星的图案
4. **军用HUD风格**：带有扫描线或网格效果的现代化设计

## 临时解决方案

我已创建了一个SVG模板文件 `public/helldivers-logo.svg`，你可以：

1. 使用设计软件（如 Figma, Adobe Illustrator）打开这个SVG
2. 基于这个设计创建各个尺寸的PNG和ICO文件
3. 替换public目录中的现有图标文件

## 在线图标生成器推荐

- **Favicon.io** - https://favicon.io/favicon-converter/
- **RealFaviconGenerator** - https://realfavicongenerator.net/
- **ICO Convert** - https://icoconvert.com/

## 替换步骤

1. 设计符合Helldivers 2主题的图标
2. 生成所需的各种尺寸
3. 替换public/目录中的图标文件：
   - favicon.ico
   - favicon-16x16.png
   - favicon-32x32.png
   - apple-touch-icon.png
   - logo.png

4. 重新构建项目：`npm run build`

## 验证

更新图标后，检查：
- [ ] 浏览器标签页显示新图标
- [ ] PWA安装后显示正确图标
- [ ] 移动设备主屏幕图标正确
- [ ] manifest.json中的图标路径正确

更新完图标后，整个Helldivers 2主题改造就完成了！
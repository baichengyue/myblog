# 已删除文件清单 — 首页自定义配置功能

构建验证：`pnpm build` 通过，零错误。

## 删除的文件（共 18 个）

### config-dialog 目录（12 个文件）

- `src/app/(home)/config-dialog/index.tsx`
- `src/app/(home)/config-dialog/color-config.tsx`
- `src/app/(home)/config-dialog/home-layout.tsx`
- `src/app/(home)/config-dialog/site-settings/index.tsx`
- `src/app/(home)/config-dialog/site-settings/types.ts`
- `src/app/(home)/config-dialog/site-settings/art-images-section.tsx`
- `src/app/(home)/config-dialog/site-settings/background-images-section.tsx`
- `src/app/(home)/config-dialog/site-settings/beian-form.tsx`
- `src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx`
- `src/app/(home)/config-dialog/site-settings/hat-section.tsx`
- `src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx`
- `src/app/(home)/config-dialog/site-settings/site-meta-form.tsx`

### stores（1 个文件）

- `src/app/(home)/stores/layout-edit-store.ts`

### services（1 个文件）

- `src/app/(home)/services/push-site-content.ts`

### 孤立组件（2 个文件）

- `src/components/color-picker.tsx`
- `src/components/color-picker-panel.tsx`

### SVG（2 个文件）

- `src/svgs/dragger.svg`
- `src/svgs/dots.svg`

### 配置文件（1 个文件，仅作为重置模板使用）

- `src/config/card-styles-default.json`

## 修改的文件（共 5 个）

| 文件 | 修改内容 |
|------|---------|
| `src/app/(home)/page.tsx` | 移除 ConfigDialog 组件、Ctrl+L 快捷键监听、编辑模式栏、layout-edit-store 引用 |
| `src/app/(home)/stores/config-store.ts` | 移除 `configDialogOpen`、`setConfigDialogOpen`、`regenerateBubbles` 字段和方法 |
| `src/app/(home)/clock-card.tsx` | 移除 `useLayoutEditStore` 导入和 `editing` 点击守卫 |
| `src/app/(home)/write-buttons.tsx` | 移除"三个点"配置入口按钮及 `DotsSVG`、`setConfigDialogOpen` 引用 |
| `src/app/(home)/home-draggable-layer.tsx` | 简化为纯 `{children}` 透传，移除所有拖拽/缩放编辑逻辑 |

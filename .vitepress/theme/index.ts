// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

// 全局变量，用于管理图片放大状态
let currentZoomedImage: HTMLElement | null = null;
let overlay: HTMLElement | null = null;

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 添加图片放大功能
    if (typeof window !== 'undefined') {
      // 初始加载时初始化
      window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          initImageZoom();
        }, 100);
      });
      
      // 监听路由变化，每次页面切换后重新初始化
      router.onAfterRouteChanged = () => {
        // 清理之前的放大状态
        resetZoomState();
        setTimeout(() => {
          initImageZoom();
        }, 100);
      };
    }
  }
} satisfies Theme

// 重置放大状态
function resetZoomState() {
  if (currentZoomedImage) {
    currentZoomedImage.classList.remove('zoomed');
    currentZoomedImage.style.transform = '';
    currentZoomedImage.style.zIndex = '';
    currentZoomedImage.style.position = '';
    currentZoomedImage = null;
  }
  
  if (overlay) {
    overlay.remove();
    overlay = null;
  }
}

// 图片放大功能
function initImageZoom() {
  const images = document.querySelectorAll('.vp-doc img');
  
  images.forEach(img => {
    // 跳过已经处理过的图片
    if (img.classList.contains('zoom-processed')) return;
    
    img.classList.add('zoom-processed');
    img.style.cursor = 'zoom-in';
    img.style.transition = 'transform 0.3s ease, z-index 0.3s ease';
    
    // 保存原始样式，用于恢复
    const originalTransform = img.style.transform;
    const originalZIndex = img.style.zIndex;
    const originalPosition = img.style.position;
    
    // 添加点击事件
    img.addEventListener('click', function() {
      if (this.classList.contains('zoomed')) {
        // 缩小图片，恢复原状
        zoomOutImage(this as HTMLElement);
      } else {
        // 放大图片
        zoomInImage(this as HTMLElement);
      }
    });
    
    // 添加鼠标悬停效果
    img.addEventListener('mouseenter', function() {
      if (!this.classList.contains('zoomed')) {
        this.style.transform = 'scale(1.05)';
      }
    });
    
    img.addEventListener('mouseleave', function() {
      if (!this.classList.contains('zoomed')) {
        this.style.transform = 'scale(1)';
      }
    });
  });
}

// 放大图片
function zoomInImage(img: HTMLElement) {
  // 先清理之前的放大状态
  resetZoomState();
  
  // 保存当前放大的图片
  currentZoomedImage = img;
  
  // 计算图片在视口中的位置
  const rect = img.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // 计算合适的放大比例（确保图片不会超出视口）
  const scale = Math.min(1.8, 
    Math.min(viewportWidth * 0.8 / rect.width, viewportHeight * 0.8 / rect.height)
  );
  
  // 计算居中位置
  const translateX = (viewportWidth / 2 - rect.left - rect.width / 2) / scale;
  const translateY = (viewportHeight / 2 - rect.top - rect.height / 2) / scale;
  
  // 应用放大效果
  img.classList.add('zoomed');
  img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
  img.style.zIndex = '1000';
  img.style.position = 'fixed';
  img.style.top = '0';
  img.style.left = '0';
  
  // 创建遮罩
  overlay = document.createElement('div');
  overlay.className = 'image-zoom-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999;
    cursor: zoom-out;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  // 遮罩点击事件
  overlay.addEventListener('click', function() {
    zoomOutImage(currentZoomedImage!);
  });
  
  // 键盘事件（ESC键退出）
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && currentZoomedImage) {
      zoomOutImage(currentZoomedImage);
    }
  };
  
  document.addEventListener('keydown', handleKeydown);
  
  // 保存键盘事件处理器，用于清理
  (overlay as any).keydownHandler = handleKeydown;
  
  document.body.appendChild(overlay);
  
  // 显示遮罩
  setTimeout(() => {
    if (overlay) {
      overlay.style.opacity = '1';
    }
  }, 10);
}

// 缩小图片，恢复原状
function zoomOutImage(img: HTMLElement) {
  if (!img.classList.contains('zoomed')) return;
  
  // 移除放大状态
  img.classList.remove('zoomed');
  img.style.transform = 'scale(1)';
  img.style.zIndex = '';
  img.style.position = '';
  img.style.top = '';
  img.style.left = '';
  
  // 隐藏遮罩
  if (overlay) {
    overlay.style.opacity = '0';
    
    // 移除键盘事件
    if ((overlay as any).keydownHandler) {
      document.removeEventListener('keydown', (overlay as any).keydownHandler);
    }
    
    // 延迟移除遮罩，让动画完成
    setTimeout(() => {
      if (overlay) {
        overlay.remove();
        overlay = null;
      }
    }, 300);
  }
  
  currentZoomedImage = null;
}

// 监听页面可见性变化
if (typeof window !== 'undefined') {
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      // 页面重新可见时，重新初始化图片放大功能
      setTimeout(() => {
        initImageZoom();
      }, 100);
    }
  });
}
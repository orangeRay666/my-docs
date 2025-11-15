# 微信小程序 - 两张图片的对比分析

在微信小程序当中实现两张图片的对比分析，可以拖动中间分割线来查看原图和对比图的差异。

## 实现思路

将两张图片重叠放置，通过拖动中间的分隔线来控制上层图片的显示范围，图片采用spectFit模式保持图片比例完整显示，交互逻辑通过bindtouchmove监听拖动事件，动态计算分割线位置和上层图片宽度；样式设计使用绝对定位和层级控制，确保图片正确重叠。

## 代码实现

**布局文件 wxml**
```xml
<view class="compare-container">
<!-- 底部图片 -->
  <image class="image image-bottom" src="{{bottomImg}}" mode="aspectFill"></image>
  <!-- 顶部图片 -->
  <view class="top-image-container" style="clip-path: inset(0 {{100 - sliderPosition+'%'}} 0 0);">
    <image class="image image-top" src="{{topImg}}" mode="aspectFill"></image>
  </view>
  <!-- 分隔线 -->
  <view class="divider" style="left: {{sliderPosition+'%'}};" catchtouchmove="onSliderMove" catchtouchstart="onSliderStart">
    <view class="divider-line"></view>
  </view>
</view>
```

**样式文件 wxss**
```css
.compare-container {
  position: relative;
  width: 80%;
  height: 1000rpx;
  margin: 0 auto;
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 40rpx;
}
.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 底层图片 */
.image-bottom {
  z-index: 1;
}

/* 顶层图片容器 */
.top-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

/* 分隔线容器 */
.divider {
  position: absolute;
  top: 0;
  height: 100%;
  width: 60rpx;
  z-index: 3;
  display: flex;
  justify-content: center;
  transform: translateX(-50%);
}
.divider-line {
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  width: 2rpx;
  background-color: #fff;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.5);
}
```

**js文件**
```js
Page({
  data: {
    bottomImg:"https://www.lasur.com.cn/media/original/2025/10/10/172bc2ed71a64378bc96cf1ac12d3e2a_noise.jpg",
    topImg:"https://www.lasur.com.cn/media/original/2025/10/16/c789b3be7b1e474987197201cefe1cf0_noise.jpg",
    sliderPosition:50,
    containerWidth: 0, // 添加容器宽度缓存
    lastUpdateX: 0,    // 上次更新的X坐标
  },

  onLoad() {
    this.getContainerWidth();
  },

  onSliderStart: function (e) {
    // 记录触摸开始位置
    this.startX = e.touches[0].clientX;
    this.startPosition = this.data.sliderPosition;
  },

  // 添加获取容器宽度的方法
  getContainerWidth: function() {
    const query = wx.createSelectorQuery();
    query.select(".compare-container").boundingClientRect();
    query.exec((res) => {
      if (res && res[0]) {
        this.setData({
          containerWidth: res[0].width
        });
      }
    });
  },
  // 分隔线拖动
  onSliderMove: function (e) {
    const touchX = e.touches[0].clientX;
    if (Math.abs(touchX - this.data.lastUpdateX) < 5) return;
    const deltaX = touchX - this.startX;

    // 使用缓存的容器宽度
    if (this.data.containerWidth === 0) {
      // 如果缓存未初始化，临时获取一次
      this.getContainerWidth();
      return;
    }
    
    const deltaPercent = (deltaX / this.data.containerWidth) * 100;
    let newPosition = this.startPosition + deltaPercent;
    // 限制分隔线位置在10-90之间
    newPosition = Math.max(10, Math.min(90, newPosition));
    
    this.setData({
      sliderPosition: newPosition,
      lastUpdateX: touchX
    });
  },
  
 
})
```

## 关键点说明
1. 需在页面加载的时候获取屏幕尺寸，缓存到data中，避免每次拖动都重新获取尺寸，导致卡顿
2. 限制一下分割线计算变化的次数，避免频繁请求导致卡顿
3. 分隔线拖动时，根据触摸移动距离计算分隔线位置百分比，限制在10-90之间
4. 上层图片宽度根据分隔线位置百分比动态计算，`clip-path`实现裁剪效果
5. 使用了 `mode="aspectFit"` 确保图片按比例完整显示，不会变形。

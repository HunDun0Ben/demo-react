import { lotteryBigLotteryRandom } from '@/services/demo/lotteryController';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import './style.css';

// 动画配置常量
const ANIMATION_CONFIG = {
  SHAKE_DURATION: 500,
  UPPER_DELAY_STEP: 600,
  LOWER_DELAY_OFFSET: 6, // 调整 offset 确保在 upper 全部开始后才开始 lower
  UPPER_BASE_DURATION: 2.8,
  LOWER_BASE_DURATION: 11.0, // 增加基础时长，确保比最慢的前区(约9.8s)慢
  SUCCESS_MESSAGE_DELAY: 500,
};

const SlotReel: React.FC<{
  target: number;
  isSpinning: boolean;
  delay: number;
  duration: number;
  max: number;
  color?: string;
  isBackZone?: boolean;
  onLock: () => void;
}> = ({
  target,
  isSpinning,
  delay,
  duration,
  max,
  color = '#222',
  isBackZone,
  onLock,
}) => {
  const [offset, setOffset] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    let lockTimer: NodeJS.Timeout;
    let spinTimer: NodeJS.Timeout;

    if (isSpinning) {
      setIsLocked(false);
      const startJump = max * 6 + Math.floor(Math.random() * max);
      setOffset(startJump);

      spinTimer = setTimeout(() => {
        const finalOffset = max * 12 + (target - 1);
        setOffset(finalOffset);

        lockTimer = setTimeout(() => {
          setIsLocked(true);
          onLock();
        }, duration * 1000);
      }, delay);

      return () => {
        clearTimeout(spinTimer);
        clearTimeout(lockTimer);
      };
    } else {
      setOffset(target > 0 ? target - 1 : 0);
      setIsLocked(false);
    }
  }, [isSpinning, target, delay, duration, max, onLock]);

  return (
    <div
      className={`slot-reel-container ${isLocked ? 'locked' : ''} ${
        isBackZone ? 'back-zone' : ''
      }`}
    >
      <div className="slot-mask top"></div>
      <div className="slot-mask glass-shine"></div>
      <div className="slot-mask bottom"></div>
      <div
        className="slot-reel-inner"
        style={{
          transform: `translateY(-${offset * 100}px)`,
          transition: isSpinning
            ? `transform ${duration}s cubic-bezier(0.12, 0, 0.1, 1)`
            : 'none',
          color: isLocked ? color : '#333',
        }}
      >
        {[...Array(max * 24)].map((_, i) => (
          <div key={i} className="slot-number">
            {(i % max) + 1 < 10 ? `0${(i % max) + 1}` : (i % max) + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

const LotteryPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [machineShaking, setMachineShaking] = useState(false);
  const [activeCount, setActiveCount] = useState(0);
  const [numbers, setNumbers] = useState<API.LotteryResult>({
    upperHalf: [],
    lowerHalf: [],
  });

  const handleLock = useCallback(
    () => setActiveCount((prev) => Math.max(0, prev - 1)),
    [],
  );

  const handleDraw = async () => {
    if (loading) return;

    setLoading(true);
    setMachineShaking(true);
    setActiveCount(7);

    setTimeout(() => setMachineShaking(false), ANIMATION_CONFIG.SHAKE_DURATION);

    try {
      const response = await lotteryBigLotteryRandom();
      if (response.code === 200 && response.data) {
        const sortedData = {
          upperHalf: [...response.data.upperHalf].sort((a, b) => a - b),
          lowerHalf: [...response.data.lowerHalf].sort((a, b) => a - b),
        };

        setIsSpinning(true);
        setNumbers(sortedData);

        // 动态计算总时长：取 lowerHalf 最后一个转轴的完成时间
        const totalDuration =
          (0 + ANIMATION_CONFIG.LOWER_DELAY_OFFSET) *
            ANIMATION_CONFIG.UPPER_DELAY_STEP +
          ANIMATION_CONFIG.LOWER_BASE_DURATION * 1000 +
          ANIMATION_CONFIG.SUCCESS_MESSAGE_DELAY;

        setTimeout(() => {
          setLoading(false);
          setIsSpinning(false);
          setActiveCount(0); // 强制重置，确保停止震动
          message.success('🎯 尘埃落定！祝您大奖临门！');
        }, totalDuration);
      } else {
        message.error('数据获取失败');
        setLoading(false);
        setMachineShaking(false);
        setIsSpinning(false);
        setActiveCount(0);
      }
    } catch (error) {
      message.error('抽奖请求异常，请稍后重试');
      setLoading(false);
      setMachineShaking(false);
      setIsSpinning(false);
      setActiveCount(0);
    }
  };

  const vibrationIntensity = activeCount * 0.45;

  return (
    <PageContainer>
      <div style={{ maxWidth: 900, margin: '50px auto' }}>
        <Card
          className={`slot-machine-card ${
            machineShaking
              ? 'shaking-heavy'
              : activeCount > 0
              ? 'vibration-decay'
              : ''
          }`}
          style={{
            ['--vibration-intensity' as any]: vibrationIntensity,
          }}
        >
          <div className="slot-panel-inner">
            <div style={{ textAlign: 'center', marginBottom: 25 }}>
              <h2
                style={{
                  color: '#444',
                  letterSpacing: '8px',
                  fontWeight: '900',
                  textShadow: '1px 1px 0 #fff',
                }}
              >
                🎰 PREMIUM LOTTERY 🎰
              </h2>
            </div>

            <div className="slot-main-row">
              {/* 前区逻辑：统一处理渲染与占位，避免布局错乱 */}
              {(numbers.upperHalf.length > 0
                ? numbers.upperHalf
                : [1, 2, 3, 4, 5, 6]
              ).map((num, idx) => (
                <SlotReel
                  key={`upper-${idx}`}
                  target={numbers.upperHalf.length > 0 ? num : 0}
                  max={35}
                  isSpinning={isSpinning}
                  delay={idx * ANIMATION_CONFIG.UPPER_DELAY_STEP}
                  duration={
                    ANIMATION_CONFIG.UPPER_BASE_DURATION + idx * idx * 0.28
                  }
                  color="#ff9c12"
                  onLock={handleLock}
                />
              ))}

              <div className="slot-divider"></div>

              {/* 后区逻辑 */}
              {(numbers.lowerHalf.length > 0 ? numbers.lowerHalf : [1]).map(
                (num, idx) => (
                  <SlotReel
                    key={`lower-${idx}`}
                    target={numbers.lowerHalf.length > 0 ? num : 0}
                    max={12}
                    isSpinning={isSpinning}
                    delay={
                      (idx + ANIMATION_CONFIG.LOWER_DELAY_OFFSET) *
                      ANIMATION_CONFIG.UPPER_DELAY_STEP
                    }
                    duration={ANIMATION_CONFIG.LOWER_BASE_DURATION + idx * 2.0}
                    color="#52c41a"
                    isBackZone
                    onLock={handleLock}
                  />
                ),
              )}
            </div>

            <div style={{ textAlign: 'center', marginTop: 50 }}>
              <Button
                type="primary"
                size="large"
                disabled={loading}
                onClick={handleDraw}
                className="slot-spin-btn"
              >
                {loading ? 'LUCK IS LOADING...' : 'SPIN NOW'}
              </Button>
              <div
                style={{
                  marginTop: 25,
                  color: '#666',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                ESTABLISHED 2026 · MECHANICAL ENGINE PRO
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default LotteryPage;

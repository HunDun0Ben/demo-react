import { lotteryBigLotteryRandom } from '@/services/demo/lotteryController';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.css';

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
    if (isSpinning) {
      setIsLocked(false);
      const startJump = max * 6 + Math.floor(Math.random() * max);
      setOffset(startJump);

      const timer = setTimeout(() => {
        const finalOffset = max * 12 + (target - 1);
        setOffset(finalOffset);

        setTimeout(() => {
          setIsLocked(true);
          onLock();
        }, duration * 1000);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setOffset(target > 0 ? target - 1 : 0);
      setIsLocked(false);
    }
  }, [isSpinning, target, delay, duration, max]);

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
          transform: `translateY(-${offset * 100}px)`, // 修正为 100px
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
    upperHalf: [1, 2, 3, 4, 5, 6],
    lowerHalf: [1],
  });

  const handleLock = () => setActiveCount((prev) => Math.max(0, prev - 1));

  const handleDraw = async () => {
    if (loading) return;

    setLoading(true);
    setMachineShaking(true);
    setActiveCount(7);

    setTimeout(() => setMachineShaking(false), 500);

    try {
      const response = await lotteryBigLotteryRandom();
      if (response.code === 200 && response.data) {
        const sortedData = {
          upperHalf: [...response.data.upperHalf].sort((a, b) => a - b),
          lowerHalf: [...response.data.lowerHalf].sort((a, b) => a - b),
        };

        setIsSpinning(true);
        setNumbers(sortedData);

        setTimeout(() => {
          setLoading(false);
          setIsSpinning(false);
          message.success('🎯 尘埃落定！祝您大奖临门！');
        }, 11500);
      } else {
        message.error('数据获取失败');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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
              {numbers.upperHalf?.map((num, idx) => (
                <SlotReel
                  key={`upper-${idx}`}
                  target={num}
                  max={35}
                  isSpinning={isSpinning}
                  delay={idx * 600}
                  duration={2.8 + idx * idx * 0.28}
                  color="#ff9c12"
                  onLock={handleLock}
                />
              ))}

              <div className="slot-divider"></div>

              {numbers.lowerHalf?.map((num, idx) => (
                <SlotReel
                  key={`lower-${idx}`}
                  target={num}
                  max={12}
                  isSpinning={isSpinning}
                  delay={(idx + 5) * 600}
                  duration={9.0 + idx * 2.0}
                  color="#52c41a"
                  isBackZone
                  onLock={handleLock}
                />
              ))}
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

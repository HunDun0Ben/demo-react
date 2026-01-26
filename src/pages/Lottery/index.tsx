import { lotteryBigLotteryRandom } from '@/services/demo/lotteryController';
import { debounce } from '@/utils/common/debounce';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, message, Row } from 'antd';
import React, { useState } from 'react';

const LotteryPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [numbers, setNumbers] = useState<API.LotteryResult>({
    upperHalf: [],
    lowerHalf: [],
  });

  const handleDraw = async () => {
    setLoading(true);
    lotteryBigLotteryRandom()
      .then((response: API.AppRes<API.LotteryResult>) => {
        if (response.code === 200 && response.data) {
          // 对 upperHalf 和 lowerHalf 进行从小到大排序
          const sortedData = {
            upperHalf: [...response.data.upperHalf].sort((a, b) => a - b),
            lowerHalf: [...response.data.lowerHalf].sort((a, b) => a - b),
          };
          setNumbers(sortedData);
        } else {
          message.error('抽奖失败！');
        }
      })
      .catch((error) => {
        console.error('请求失败', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 使用防抖包装 handleDraw
  const debouncedHandleDraw = debounce(handleDraw, 100);

  return (
    <PageContainer>
      <Card title="抽奖页面">
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Card>
              <h2>前区号码</h2>
              <div style={{ fontSize: 32, fontWeight: 'bold' }}>
                {numbers.upperHalf.length > 0
                  ? numbers.upperHalf.join(', ')
                  : '-'}
              </div>
            </Card>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Card>
              <h2>后区号码</h2>
              <div style={{ fontSize: 32, fontWeight: 'bold' }}>
                {numbers.lowerHalf.length > 0
                  ? numbers.lowerHalf.join(', ')
                  : '-'}
              </div>
            </Card>
          </Col>
        </Row>
        <div style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={debouncedHandleDraw}
          >
            开始抽奖
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
};

export default LotteryPage;

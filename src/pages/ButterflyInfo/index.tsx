import { getButterflies } from '@/services/demo/butterfly-info/ButterflyController';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const ButterflyPage: React.FC = () => {
  const [butterflies, setButterflies] = useState<API.Butterfly[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getButterflies();
        if (response?.data) {
          setButterflies(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch butterflies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '中文名称',
      dataIndex: 'chinese_name',
      key: 'chinese_name',
    },
    {
      title: '英文名称',
      dataIndex: 'english_name',
      key: 'english_name',
    },
    {
      title: '拉丁名称',
      dataIndex: 'latin_name',
      key: 'latin_name',
    },
    {
      title: '特征描述',
      dataIndex: 'feature_description',
      key: 'feature_description',
      width: '40%',
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Table
          columns={columns}
          dataSource={butterflies}
          rowKey="id"
          loading={loading}
        />
      </Card>
    </PageContainer>
  );
};

export default ButterflyPage;

"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SeriesData {
  name: string;
  data: number[];
}

const MyChart: React.FC = () => {
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [series, setSeries] = useState<SeriesData[]>([]);

  useEffect(() => {
    // 데이터 및 차트 옵션 설정
    const data = [10, 20, 30, 40, 50];
    const categories = ['월', '화', '수', '목', '금'];

    setSeries([{ name: '데이터', data }]);
    setChartOptions({
      chart: {
        id: 'basic-bar',
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories,
      },
    });
  }, []);

  return (
    <div>
      {typeof window !== 'undefined' && (
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
};

export default MyChart;
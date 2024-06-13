import { RefObject, useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

export const useCharts = (): [RefObject<HTMLDivElement>, echarts.ECharts | undefined] => {
	const chartRef = useRef<HTMLDivElement>(null);
	const [chartInstance, setChartInstance] = useState<echarts.ECharts>();
	useEffect(() => {
		const instance = echarts.init(chartRef.current as HTMLDivElement);
		setChartInstance(instance);
	}, []);
	return [chartRef, chartInstance];
};

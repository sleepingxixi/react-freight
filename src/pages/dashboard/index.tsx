import { Button, Card, Descriptions, DescriptionsProps } from 'antd';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { useUserInfo } from '@/stores';
import Api from '@/api';
import { Report } from '@/types/api';
import { formatMoney, formatNum } from '@/utils';
import { useCharts } from '@/hooks/useCharts';
// import { convertLegacyProps } from 'antd/es/button';

// 指定图表的配置项和数据
const orderOption = {
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		// data: ['订单', '流水']
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月']
	},
	yAxis: {
		type: 'value'
	},
	series: [
		{
			name: '订单',
			type: 'line',
			stack: 'Total',
			data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101]
		},
		{
			name: '流水',
			type: 'line',
			stack: 'Total',
			data: [2200, 1820, 1910, 234, 290, 330, 310, 1910, 234, 290]
		}
	]
};
const cityOption = {
	title: {
		text: '司机城市分布',
		left: 'center'
	},
	tooltip: {
		trigger: 'item'
	},
	legend: {
		orient: 'vertical',
		left: 'left'
	},
	series: [
		{
			name: '城市分布',
			type: 'pie',
			radius: '50%',
			data: [
				{ value: 1048, name: '北京' },
				{ value: 735, name: '深圳' },
				{ value: 580, name: '广州' },
				{ value: 484, name: '重庆' },
				{ value: 300, name: '上海' }
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}
	]
};
const ageOption = {
	title: {
		text: '司机年龄分布',
		left: 'center'
	},
	legend: {
		top: 'bottom'
	},
	tooltip: {
		trigger: 'item'
	},
	series: [
		{
			name: '年龄分布',
			type: 'pie',
			radius: [20, 100],
			center: ['50%', '50%'],
			roseType: 'area',
			itemStyle: {
				borderRadius: 8
			},
			data: [
				{ value: 40, name: '北京' },
				{ value: 38, name: '深圳' },
				{ value: 32, name: '广州' },
				{ value: 30, name: '重庆' },
				{ value: 28, name: '上海' }
			]
		}
	]
};

const modelOption = {
	legend: { left: 'left' },
	tooltip: {
		trigger: 'item'
	},
	radar: {
		// shape: 'circle',
		indicator: [
			{ name: '服务态度', max: 6500 },
			{ name: '在线时长', max: 16000 },
			{ name: '关注度', max: 30000 },
			{ name: '接单率', max: 38000 },
			{ name: '评分', max: 52000 }
		]
	},
	series: [
		{
			name: '司机模型诊断',
			type: 'radar',
			data: [
				{
					value: [4200, 3000, 20000, 35000, 50000],
					name: '司机模型诊断'
				}
			]
		}
	]
};
const DashBoard = () => {
	const userInfo = useUserInfo(state => state.userInfo);
	const [report, setReport] = useState<Report.ReportData>();
	// 目前只有第一个和最后一个使用hooks的方式进行设置，中间的图还保持原来的写法
	// 两种方式都可以
	const [lineChartRef, lineChartInstance] = useCharts();
	const [ladaChartRef, ladaChartInstance] = useCharts();
	useEffect(() => {
		getReportData();
	}, []);

	const getReportData = async () => {
		const data = await Api.getReportData();
		setReport(data);
	};

	// 获取折线图数据，只有这个使用api的方式，其他的都是静态的数据
	const showLineChart = async () => {
		if (!lineChartInstance) return;
		console.log('刷新');
		const data = await Api.getLineData();
		orderOption.xAxis.data = data.label;
		orderOption.series[0].data = data.order;
		orderOption.series[1].data = data.money;
		lineChartInstance?.setOption(orderOption);
	};
	const showCityChart = () => {
		const myChart = echarts.init(document.getElementById('pieCityChart'));
		myChart.setOption(cityOption);
	};
	const showAgeChart = () => {
		const myChart = echarts.init(document.getElementById('pieAgeChart'));
		myChart.setOption(ageOption);
	};
	const showModelChart = () => {
		ladaChartInstance?.setOption(modelOption);
	};
	useEffect(() => {
		showLineChart();
		showCityChart();
		showAgeChart();
		showModelChart();
	}, [lineChartInstance, ladaChartInstance]);
	const items: DescriptionsProps['items'] = [
		{
			key: 'UserName',
			label: '姓名',
			children: userInfo.userName
		},
		{
			key: 'Telephone',
			label: '电话',
			children: userInfo.mobile
		},
		{
			key: 'job',
			label: '职位',
			children: userInfo.job
		},
		{
			key: 'deptName',
			label: '部门',
			children: userInfo.deptName
		}
	];
	return (
		<div className={styles.dashboard}>
			<div className={styles.info}>
				<div className={styles['user-img']}></div>
				<Descriptions className={styles.desc} title='开心生活每一天！' items={items} />
			</div>
			<div className={styles['show-data']}>
				<div className={styles.card}>
					<div>司机数量</div>
					<div className={styles.data}>{formatNum(report?.driverCount)}个</div>
				</div>
				<div className={styles.card}>
					<div>总流水</div>
					<div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
				</div>
				<div className={styles.card}>
					<div>总订单</div>
					<div className={styles.data}>{formatNum(report?.orderCount)}单</div>
				</div>
				<div className={styles.card}>
					<div>开通城市</div>
					<div className={styles.data}>{formatNum(report?.cityNum)}座</div>
				</div>
			</div>
			<Card
				title='订单流水走势图'
				style={{ marginTop: '20px' }}
				extra={
					<Button type='primary' onClick={showLineChart}>
						刷新
					</Button>
				}
			>
				<div ref={lineChartRef} style={{ height: '300px' }}></div>
			</Card>
			<Card title='司机分布图' style={{ marginTop: '20px' }} extra={<Button type='primary'>刷新</Button>}>
				<div style={{ display: 'flex' }}>
					<div id='pieCityChart' style={{ height: '300px', flex: '1' }}></div>
					<div id='pieAgeChart' style={{ height: '300px', flex: '1' }}></div>
				</div>
			</Card>
			<Card title='模型诊断' style={{ marginTop: '20px' }} extra={<Button type='primary'>刷新</Button>}>
				<div ref={ladaChartRef} style={{ height: '300px' }}></div>
			</Card>
		</div>
	);
};
export default DashBoard;

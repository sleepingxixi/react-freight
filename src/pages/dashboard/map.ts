import * as echarts from 'echarts';
const data = [
  { name: '哈尔滨', value: 2 },
  { name: '沈阳', value: 2 },
  { name: '秦皇岛', value: 5 },
  { name: '天津', value: 2 },
  { name: '北京', value: 210 },
  { name: '保定', value: 50 },
  { name: '西安', value: 2 },
  { name: '临汾', value: 2 },
  { name: '乌兰察布', value: 2 },
  { name: '重庆', value: 2 },
  { name: '成都', value: 5 },
  { name: '武汉', value: 1 },
  { name: '南京', value: 3 },
  { name: '杭州', value: 5 },
  { name: '佛山', value: 2 },
  { name: '南宁', value: 25 },
  { name: '柳州', value: 2 },
  { name: '桂林', value: 2 },
  { name: '郑州', value: 4 },
  { name: '济南', value: 2 },
  { name: '上海', value: 2 },
];
const geoCoordMap = {
  哈尔滨: [126.63, 45.75],
  沈阳: [123.432791, 41.808645],
  秦皇岛: [119.57, 39.95],
  天津: [117.210813, 39.14393],
  北京: [116.46, 39.92],
  保定: [115.48, 38.85],
  西安: [108.953098, 34.2778],
  临汾: [111.538788, 36.099745],
  乌兰察布: [113.112846, 41.022363],
  重庆: [106.54, 29.59],
  成都: [104.06, 30.67],
  武汉: [114.31, 30.52],
  南京: [118.78, 32.04],
  杭州: [120.219375, 30.259244],
  佛山: [113.134026, 23.035095],
  南宁: [108.297234, 22.806493],
  柳州: [109.4, 24.33],
  桂林: [110.28, 25.29],
  郑州: [113.65, 34.76],
  济南: [117.024967, 36.682785],
  上海: [121.48, 31.22]
};
const convertData = function (data) {
  const res = [];
  for (let i = 0; i < data.length; i++) {
    const geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};
function renderItem(params, api) {
  const coords = [
    [116.7, 39.53],
    [103.73, 36.03],
    [112.91, 27.87],
    [120.65, 28.01],
    [119.57, 39.95]
  ];
  const points = [];
  for (let i = 0; i < coords.length; i++) {
    points.push(api.coord(coords[i]));
  }
  const color = api.visual('color');
  return {
    type: 'polygon',
    shape: {
      points: echarts.graphic.clipPointsByRect(points, {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height
      })
    },
    style: api.style({
      fill: color,
      stroke: echarts.color.lift(color)
    })
  };
}

export function loadBMap(ak: string) {
  return new Promise(function (resolve, reject) {
    if (typeof BMap !== 'undefined') {
      console.log("here")
      resolve(BMap)
      return true
    }
    window.onBMapCallback = function () {
      resolve(BMap)
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://api.map.baidu.com/api?v=3.0&ak=' + ak + '&callback=onBMapCallback'
    script.onerror = reject
    document.head.appendChild(script)
  })
};
export const option = {
  backgroundColor: 'transparent',
  title: {
    text: '旅游过的城市',
    subtext: '平平城市游玩足迹',
    left: 'center',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  bmap: {
    center: [104.114129, 37.550339],
    zoom: 5,
    roam: true,
    mapStyle: {
      styleJson: [
        {
          featureType: 'water',
          elementType: 'all',
          stylers: {
            color: '#044161'
          }
        },
        {
          featureType: 'land',
          elementType: 'all',
          stylers: {
            color: '#004981'
          }
        },
        {
          featureType: 'boundary',
          elementType: 'geometry',
          stylers: {
            color: '#064f85'
          }
        },
        {
          featureType: 'railway',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'highway',
          elementType: 'geometry',
          stylers: {
            color: '#004981'
          }
        },
        {
          featureType: 'highway',
          elementType: 'geometry.fill',
          stylers: {
            color: '#005b96',
            lightness: 1
          }
        },
        {
          featureType: 'highway',
          elementType: 'labels',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry',
          stylers: {
            color: '#004981'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry.fill',
          stylers: {
            color: '#00508b'
          }
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'green',
          elementType: 'all',
          stylers: {
            color: '#056197',
            visibility: 'off'
          }
        },
        {
          featureType: 'subway',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'manmade',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'local',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'labels',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'boundary',
          elementType: 'geometry.fill',
          stylers: {
            color: '#029fd4'
          }
        },
        {
          featureType: 'building',
          elementType: 'all',
          stylers: {
            color: '#1a5787'
          }
        },
        {
          featureType: 'label',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        }
      ]
    }
  },
  series: [
    {
      name: '天数',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: convertData(data),
      encode: {
        value: 2
      },
      symbolSize: function (val) {
        return 10;
      },
      label: {
        formatter: '{b}',
        position: 'right'
      },
      itemStyle: {
        color: '#ddb926'
      },
      emphasis: {
        label: {
          show: true
        }
      }
    },
    {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      data: convertData(
        data
          .sort(function (a, b) {
            return b.value - a.value;
          })
          .slice(0, 6)
      ),
      encode: {
        value: 2
      },
      symbolSize: function (val) {
        return 10;
      },
      showEffectOn: 'emphasis',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        formatter: '{b}',
        position: 'right',
        show: true
      },
      itemStyle: {
        color: '#f4e925',
        shadowBlur: 10,
        shadowColor: '#333'
      },
      zlevel: 1
    },
  ]
};


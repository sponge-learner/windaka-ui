const useBigeMap = (option) => {
  // 与地图相关的JS文件异步引入
  const script: string[] = [
    // 引入bigemap的离线地图
    `http://${option.mapIp}/bigemap.js/v2.1.0/bigemap.js`,
  ];
  // 地图css文件，地址换成本地的服务器css文件即可
  const css = [
    `http://${option.mapIp}/bigemap.js/v2.1.0/bigemap.css`,
  ];

  return new Promise((resolve) => {
    css.forEach(element => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      // awareLink.async = false;
      // 换成本地的服务器css文件即可
      link.href = element;
      document.head.appendChild(link);
    });

    const loads = script.map((src) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = false;
      script.src = src;
      document.head.appendChild(script);
      return script;
    });
    // 获取最后一项内容
    const end: any = loads.pop();
    end.onload = resolve;
  });
}

export default useBigeMap

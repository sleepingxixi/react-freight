/**
 * 高阶组件，加载路由时提前进行检查
 */

import axios from "axios"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

const BeforeCheck = (props: { children: React.ReactNode }) => {
  const location = useLocation();
  const [hasNewVersion, setHasNewVersion] = useState<boolean>(true);
  // 版本监控
  const versionCheck = async () => {
    // 开发环境不进行检查
    if (process.env.NODE_ENV === 'development') {
      setHasNewVersion(false);
      return
    }
    const response = await axios.get('version.json')
    if (__MY_APP_VERSION__ !== response.data.version) {
      setHasNewVersion(true)
      // message.info('有新版本，刷新页面')
      window.location.reload()
    } else {
      setHasNewVersion(false)
    }
  }
  useEffect(() => {
    versionCheck();
  }, [location.pathname])

  return hasNewVersion ? <></> : <div>{props.children}</div>
}
export default BeforeCheck;

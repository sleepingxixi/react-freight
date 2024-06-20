import path from "path";
import fs from "fs";
import type { Plugin } from 'vite'
// 将文本内容写入指定文件中
const writeVersion = async (versionFile:string, content:string) => {
  fs.writeFile(versionFile, content, (err) => {
    if (err) throw err;
  });
};

const refreshPlugin = (options:{version:number}): Plugin=> {
  // 声明配置文件路径

  let configPath:string;
  return {
    name: "refreshVersion",
    configResolved(resolvedConfig) {
      // 保存配置文件的路径，后用
      configPath = resolvedConfig.publicDir;
    },
    async buildStart() {
      // 生成版本信息文件路径
      const file = configPath + path.sep + "version.json";
      // 采用编译的当前时间作为每个版本的标识
      const content = JSON.stringify({ version: options.version });
      if (fs.existsSync(configPath)) {
        // 如果文件路径已存在，直接写入文件
        writeVersion(file, content);
      } else {
        // 如果文件路径不存在，先创建文件夹，然后再写入文件
        fs.mkdir(configPath, (err) => {
          if (err) throw err;
          writeVersion(file, content);
        });
      }
    },
  };
};

export default refreshPlugin;

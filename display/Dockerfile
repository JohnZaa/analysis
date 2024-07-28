# 使用官方的 Node.js 运行时镜像作为基础镜像
FROM node:18 as build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有文件到工作目录
COPY . .

# 构建 React 应用
RUN npm run build

FROM build AS development
RUN apt-get update \
    && apt-get install -y git
    
CMD ["npm", "start"]


# 使用 nginx 作为生产环境服务器
FROM nginx:alpine  

# 复制构建后的文件到 nginx 的 html 目录
COPY --from=build /app/build /usr/share/nginx/html

# 暴露端口
EXPOSE 80
EXPOSE 3000

# 启动 nginx 服务器
CMD ["nginx", "-g", "daemon off;"]
# Sử dụng Node.js làm base image
FROM node:22-slim

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Mở cổng mà ứng dụng sẽ lắng nghe
EXPOSE 3000

# Lệnh để chạy ứng dụng
CMD ["npm", "start"]
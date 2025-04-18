# Sử dụng Node.js image chính thức
FROM node:18 as build

# Tạo thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Build ứng dụng
RUN npm run build

# Sử dụng Nginx để phục vụ ứng dụng React
FROM nginx:alpine

# Sao chép build output từ bước trước
COPY --from=build /app/dist /usr/share/nginx/html

# Mở cổng
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
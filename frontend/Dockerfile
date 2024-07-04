# Используем официальный образ Node в качестве базового образа
FROM node:latest

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json внутрь контейнера
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы из текущего каталога внутрь контейнера
COPY . .

## Собираем проект
#RUN npm run build

EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "start-watch"]
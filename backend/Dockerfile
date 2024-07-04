FROM maven:3.6.3-openjdk-17 AS build

# Копируем файлы с исходным кодом и запускаем процесс сборки проекта
COPY mvnw .
COPY .mvn .
COPY pom.xml .
COPY src src
RUN mvn -f pom.xml clean package

# Используем официальный образ OpenJDK 17 для запуска приложения
FROM openjdk:17-jdk-alpine

## Устанавливаем рабочую директорию в контейнере
#WORKDIR /app

# Копируем JAR файл из процесса сборки в новый образ
COPY --from=build target/Clicker-0.0.1-SNAPSHOT.jar Clicker.jar

# Задаем порт, который приложение будет использовать
EXPOSE 8080

# Запускаем приложение при старте контейнера
CMD ["java", "-jar", "Clicker.jar"]
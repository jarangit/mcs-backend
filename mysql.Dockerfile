FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=mcs_db
ENV MYSQL_USER=mcs_user
ENV MYSQL_PASSWORD=1234

CMD ["--default-authentication-plugin=mysql_native_password"]
FROM nginx:latest
ARG ENV
ENV TZ Asia/Almaty
ENV DEBIAN_FRONTEND noninteractive
COPY ./docker/nginx /etc/logrotate.d/nginx
COPY ./docker/entrypoint.sh /entrypoint.sh
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/entrypoint.sh /entrypoint.sh

USER root
RUN rm /etc/nginx/conf.d/default.conf \
  && chmod -R 777 /var/log/nginx /var/cache/nginx/ /var/run/ \
  && chmod 644 /etc/nginx/* \
  && chmod 540 /entrypoint.sh

COPY dist /usr/share/nginx/html
EXPOSE 80/tcp
VOLUME /var/log/nginx
ENTRYPOINT ["/entrypoint.sh"]

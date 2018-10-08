FROM node:8.6.0-alpine
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata
    
WORKDIR /App

ADD / /App

RUN npm i --registry=https://registry.npm.taobao.org && npm install --production

CMD []

ENTRYPOINT ["/nodejs/bin/npm","run","start-docker"]

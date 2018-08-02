FROM registry.cn-shanghai.aliyuncs.com/watarux/nodejs:8.1.3

WORKDIR /App

ADD / /App

RUN npm config set registry https://registry.npm.taobao.org/ && npm install

CMD []

ENTRYPOINT ["/nodejs/bin/npm","run","start-docker"]
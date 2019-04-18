# Sentry部署

Sentry是一个故障收集平台，同时具备故障报警功能。

## 安装

使用Docker运行，快速安装参考地址 https://github.com/getsentry/onpremise

按照其README运行即可，但是9.1-onbuild的镜像有坑（config can’t change when service running），修改Dockerfile为9.0版本即可正常安装。

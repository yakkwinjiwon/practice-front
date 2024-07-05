#!/bin/bash

REPOSITORY=/home/ec2-user/app/step3
PROJECT_NAME=practice-front

echo "> Build 파일 복사"
cp $REPOSITORY/zip/*.jar $REPOSITORY/

echo "> 현재 구동 중인 리액트 애플리케이션 pid 확인"
CURRENT_PID=$(pgrep -fl ${PROJECT_NAME} | grep node | awk '{print $1}')

echo "현재 구동 중인 리액트 애플리케이션 pid: $CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
    echo "> 현재 구동 중인 리액트 애플리케이션이 없으므로 종료하지 않습니다."
else
    echo "> kill -15 $CURRENT_PID"
    kill -15 $CURRENT_PID
    sleep 5
fi

echo "> 새 애플리케이션 배포 준비"

# 리액트 애플리케이션이 있는 디렉토리로 이동
cd $REPOSITORY/$PROJECT_NAME

echo "> npm install"
npm install

echo "> npm run build"
npm run build

echo "> 새로운 리액트 애플리케이션 실행"

nohup serve -s build -l 3000 > $REPOSITORY/nohup.out 2>&1 &
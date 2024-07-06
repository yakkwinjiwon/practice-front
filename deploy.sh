#!/bin/bash

REPOSITORY=/home/ec2-user/app/step3
PROJECT_NAME=practice-front
LOG_FILE=$REPOSITORY/deploy.log

echo "> 전체 파일 복사"
cp -r $REPOSITORY/zip/* $REPOSITORY/

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

echo "> 3000번 포트 사용 여부 확인"
PORT_PID=$(lsof -t -i:3000)

if [ -n "$PORT_PID" ]; then
    echo "> 3000번 포트를 사용 중인 프로세스 종료: $PORT_PID"
    sudo kill -9 $PORT_PID
    sleep 5
else
    echo "> 3000번 포트를 사용 중인 프로세스가 없습니다."
fi

echo "> 새 애플리케이션 배포 준비"

echo "> npm install"
sudo npm install | sudo tee -a $LOG_FILE

echo "> npm install -g serve"
sudo npm install -g serve | sudo tee -a $LOG_FILE

echo "> npm run build"
sudo npm run build | sudo tee -a $LOG_FILE


echo "> 새로운 리액트 애플리케이션 실행"
SERVE_PATH=$(which serve)
sudo nohup $SERVE_PATH -s build -l 3000 > $REPOSITORY/nohup.out 2>&1 & # | sudo tee -a $LOG_FILE
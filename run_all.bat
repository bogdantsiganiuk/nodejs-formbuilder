@ECHO OFF
set mongolocation="C:\Program Files\MongoDB\Server\4.4\bin"

START "" /D %mongolocation% "mongod"
timeout 2
START "" /D %mongolocation% "mongo"
timeout 2
START "" "install.bat"
timeout 30
START "" "%~dp0\client\client-app\install.bat"
timeout 30
START "" "server.bat"
timeout 5
START "" "%~dp0\client\client-app\client.bat"

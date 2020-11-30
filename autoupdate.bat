@echo off

:a
git fetch > temp
git pull > temp
git add * > temp
git commit -a -m "Pushed by auto pusher at %date% - %time%" > temp
git push > temp
echo Commited!
timeout 5
goto a
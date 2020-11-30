@echo off

:a
git fetch
git pull
git add *
git commit -a -m "Pushed by auto pusher at %date% - %time%"
git push
echo Commited!
timeout 5
goto a
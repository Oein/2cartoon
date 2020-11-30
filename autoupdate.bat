@echo off

:a
git fetch
git pull
git add *
git commit -a -m "Pushed by auto pusher at %date% - %time%"
git push
echo 
timeout 5
goto a
@echo off
cd flask-backend
call venv\Scripts\activate
pip install -r requirements.txt
flask run
pause

# Git Commands:
git pull -r origin main
git rebase --continue
git config --global pull.rebase true

# Installation:
pip install virtualenv
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
pip freeze > requirements.txt

# Database (PostgreSQL):
su - postgres
psql
CREATE USER graduation_proj WITH PASSWORD 'django@@1';
CREATE DATABASE career_connect;
\c career_connect;
GRANT ALL PRIVILEGES ON DATABASE career_connect TO graduation_proj;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO graduation_proj;
GRANT ALL PRIVILEGES ON SCHEMA public TO graduation_proj;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO graduation_proj;

# Migrations:
python3 manage.py makemigrations api
python3 manage.py migrate
python3 manage.py createsuperuser
user:graduation_proj
email:graduation_proj@gmail.com
passwrod:django@@1

# Run server:
python3 manage.py runserver

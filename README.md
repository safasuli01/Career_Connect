<h1 align="center" id="title">Carrer Connect Job Portal</h1>

<h2 id="description">Description</h2>

<p>
Career Connect is a comprehensive job portal designed to bridge the gap between job seekers and employers, providing a seamless platform for career growth and recruitment. Whether you're a professional looking for your next opportunity or a company seeking top talent, Career Connect offers an easy-to-navigate interface to explore, apply for, and manage job postings.
</p>

## 🔧 Github Commands :-

`Step 1` : SSH Configuration.

```
ssh-keygen -t ed25519 -C "ex@gmail.com"
```

```
cat ~/.ssh/id_ed25519.pub
```

```
git config --global user.email "ex@gmail.com"
```

```
git config --global user.name "ex"
```

`Step 2` : Starting Git.

```
git init
```

```
git add .
```

```
git commit -m "first commit"
```

```
git branch -M main
```

```
git remote add origin git@github.com:safasuli01/backend_cc.git
```

```
git push -u origin main
```

`Step 3` : Clone.

```
git clone git@github.com:safasuli01/backend_cc.git
```

`Step 4` : Pull.

```
git pull -r origin main
```

```
Accept Both Changes
```

```
git rebase --continue
```

```
git config --global pull.rebase true
```

`Step 5` : Tag.

```
git checkout main
```

```
git tag
```

```
git tag -a v1.0 -m "Version 1.0"
```

```
git push origin v1.0
```

---

## 🛠️ Installation Steps :-

<h3 align="center"> Ubuntu </h3>

`Step 1` : Install and activate VirtualEnvironment.

```
python -m venv venv
```

```
source venv/bin/activate
```

`Step 2` : Install Packages.

```
pip install django
```

```
pip install djangorestframework
```

```
pip install psycopg2-binary
```

```
pip install pillow
```

`Step 3` : Install requiremental Packages.

```
pip freeze > requirements.txt
```

```
pip install -r requirements.txt
```

`Step 4` : Create Project.

```
django-admin startproject backend
```

```
cd backend
```

`Step 5` : Create Apps.

```
python3 manage.py startapp ....
```

```
python3 manage.py startapp projects
```
`Step 6` : Create Database.

```
su - postgres
```

```
psql
```

```
CREATE USER career_connect WITH PASSWORD 'career_connect@@';
```

```
create database career_connect;
```

```
\c career_connect;
```

```
GRANT ALL PRIVILEGES ON DATABASE career_connect TO career_connect;
```

```
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO career_connect;
```

```
GRANT ALL PRIVILEGES ON SCHEMA public TO career_connect;
```

```
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO career_connect;
```

`Step 7` : Create Migrate.

```
python3 manage.py makemigrations
```

```
python3 manage.py migrate
```

```
python3 manage.py createsuperuser
```

```
career_connect
```

```
career_connect@example.com
```

```
career_connect@@
```

`Step 8` : Run Server.

```
python3 manage.py runserver
```


---

## 🧐 Features :

<ul>
<li>
    <b>User Authentication:</b> Secure registration, login, and password recovery for job seekers and employers.
</li>

<li>
    <b>Profile Creation:</b> Users can create detailed profiles with resume uploads, skills, and career preferences.
</li>
<li>
    <b>Job Search & Filters:</b> Advanced search filters by keyword, job type, location, and industry.
</li>
<li>
    <b>Application Management:</b> Tools for tracking job applications, interviews, and status updates.
</li>
<li>
    <b>Job Posting:</b> Employers can create job listings with detailed descriptions and requirements.
</li>
<li>
    <b>Applicant Tracking System:</b> Employers can review, filter, and manage candidates from a single dashboard.
</li>
</ul>

---

## 💻 Built with :-

Technologies used in the project:

-   Django RestFramework
-   Postgres Database
-   HTML
-   CSS
-   Java
-   React Js
-   Bootstrap
-   Fontawesome
-   Material UI

---
<h1>Under The Supervision of:</h1>
<table>
    <tr>
        <td>
            <img src="https://avatars.githubusercontent.com/u/84921583?v=4"></img>
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://github.com/Ma7moudHelmi">Eng. Mahmoud Elmahmoudy</a>
        </td>
    </tr>
</table>

---

## Contributors

<table>
    <tr>
        <td>
            <img src="https://avatars.githubusercontent.com/u/171288314?v=4"></img>
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://github.com/safasuli01">Safa Abdullah</a>
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://avatars.githubusercontent.com/u/167586570?v=4"></img>
        </td>
        <td>
            <img src="https://avatars.githubusercontent.com/u/144252185?v=4"></img>
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://github.com/gihannazmy">Gihan Atef</a>
        </td>
        <td>
            <a href="https://github.com/Helana-99">Helana Nabil</a>
        </td>
    </tr>
</table>



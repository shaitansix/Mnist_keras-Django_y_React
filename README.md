# 🤖 MNIST Neural Network Playground
*Interactive web interface for training neural networks on MNIST dataset using Keras (Django backend) and React frontend*

---

## 🚀 Quick Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/shaitansix/Mnist_keras-Django_y_React.git
cd Mnist_keras-Django_y_React
```

### 2. Configure the backend (Django)
**From the project root:** <br />
**Create and activate virtual environment:**
```bash
cd server
pip install virtualenv
virtualenv -p python3.9 venv
.\venv\Scripts\activate  # Windows
```
**Install dependencies:**
```bash
pip install -r requirements.txt
Migrar la base de datos:
python manage.py makemigrations
python manage.py migrate
```
**Configure environment variables:** <br />
**Create a file . env in /server and add:**
```bash
SECRET_KEY=hhha2%kgyg_!f7(^h4@l^%wwc@7z^%^^ql7rt&d_aea)n3+3-j
```
**Create super user:**
```bash
python manage.py createsuperuser
Ejecutar el servidor Django: 
python manage.py runserver
```
*✔️ Backend available at: http://localhost:8000/admin/*

### 3. Configure the Frontend (React)
**From the project root:** <br />
**Install dependencies:**
```bash
cd client
npm install
```
**Run the development server:**
```bash
npm run dev
```
*✔️ Frontend available at: http://localhost:5173/*
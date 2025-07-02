# 🤖 MNIST Neural Network Playground
*Interactive web interface for training neural networks on MNIST dataset using Keras (Django backend) and React frontend*

---

## 🚀 Quick Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/shaitansix/Mnist_keras-Django_y_React.git
cd Mnist_keras-Django_y_React
```

### 2. Configurar el Backend (Django)
**Desde la raíz del proyecto:** <br />
**Crear y activar entorno virtual:**
```bash
cd server
pip install virtualenv
virtualenv -p python3.9 venv
.\venv\Scripts\activate  # Windows
```
**Instalar dependencias:**
```bash
pip install -r requirements.txt
Migrar la base de datos:
python manage.py makemigrations
python manage.py migrate
```
**Configurar variables de entorno:** <br />
**Crear un archivo .env en /server y agregar:**
```bash
SECRET_KEY=hhha2%kgyg_!f7(^h4@l^%wwc@7z^%^^ql7rt&d_aea)n3+3-j
```
**Crear superusuario:**
```bash
python manage.py createsuperuser
Ejecutar el servidor Django: 
python manage.py runserver
```
*✔️ Backend disponible en: http://localhost:8000/admin/*

### 3. Configurar el Frontend (React)
**Desde la raíz del proyecto:** <br />
**Instalar dependencias:**
```bash
cd client
npm install
```
**Ejecutar el servidor de desarrollo:**
```bash
npm run dev
```
*✔️ Frontend disponible en: http://localhost:5173/*
1. Clonar el repositorio
git clone https://github.com/shaitansix/Mnist_keras-Django_y_React.git
cd Mnist_keras-Django_y_React

2. Configurar el Backend (Django)
Desde la raíz del proyecto:
Crear y activar entorno virtual:
cd server
pip install virtualenv
virtualenv -p python3.9 venv
.\venv\Scripts\activate  # Windows
Instalar dependencias:
pip install -r requirements.txt
Migrar la base de datos:
python manage.py makemigrations
python manage.py migrate
Configurar variables de entorno:
Crear un archivo .env en /server y agregar: 
SECRET_KEY=hhha2%kgyg_!f7(^h4@l^%wwc@7z^%^^ql7rt&d_aea)n3+3-j
Crear superusuario: 
python manage.py createsuperuser
Ejecutar el servidor Django: 
python manage.py runserver
Backend disponible en: http://localhost:8000/admin/

3. Configurar el Frontend (React)
Desde la raíz del proyecto:
Instalar dependencias:
cd client
npm install
Ejecutar el servidor de desarrollo:
npm run dev
Frontend disponible en: http://localhost:5173/
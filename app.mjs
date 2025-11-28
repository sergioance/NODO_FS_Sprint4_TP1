import express from 'express';
import path from 'path';
import { connectDB } from './src/config/dbConfig.mjs';
import superHeroRoutes from './src/routes/superHeroRoutes.mjs';
import methodOverride from 'method-override';
import expressEjsLayouts from 'express-ejs-layouts';

const app = express();
const PORT = process.env.PORT || 3000;

// Archivos estáticos
app.use(express.static(path.resolve('./public')));

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.resolve('./src/views'));

// Layout base
app.use(expressEjsLayouts);
app.set('layout', 'layout'); // layout.ejs en src/views

// Middleware
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Variables globales para navbar
app.use((req, res, next) => {
  res.locals.navbarLinks = [
    //{ text: 'Inicio', href: '/', icon: '/icons/marvel_logo.ico' },
    { text: 'Listado Superhéroes', href: '/api/heroes/vista', icon: '/icons/dashboard.svg' },
    // { text: 'Agregar Superhéroe', href: '/api/heroes/formulario', icon: '/icons/add.svg' },
    { text: 'Sobre Nosotros', href: '/about', icon: '/icons/about.svg' },
    { text: 'Contactar', href: '/contact', icon: '/icons/contact.svg' },
  
  ];
  next();
});

app.use((req, res, next) => {
  res.locals.title = 'Superhéroes App'; // Título por defecto
  next();
});

// Conexión a MongoDB
connectDB();

// Rutas
app.use('/api', superHeroRoutes);

app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => {
  res.render('about', { title: 'Acerca de Nosotros' });
});

app.get('/contact', (req, res) => res.render('contact'));

app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

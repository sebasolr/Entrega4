const { Router } = require('express');
const Productos = require('./crud');
const multer  = require('multer')
const carpeta = __dirname

const productos = new Productos('archivos');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
const upload = multer({ storage: storage })

const router = Router();

router.get('/profile', function (req, res) {
    res.sendFile('E:/Programacion/Cursos/Coderhouse/backend/clase_ocho/entrega/public/index.html');
});
router.post('/profile',upload.single('avatar'), function (req, res) {
    const archivo = req.file.filename;
    res.json()
})

router.get('/api/productos', async (req, res) => {
 const producto = await productos.getAll()
res.json(producto)
})
router.get('/api/productos/:id', async (req, res) => {
  const producto = await  productos.getAll()
  const filtrado = producto.filter(item => item.id == req.params.id)
  res.json(filtrado)
})
router.post('/api/productos', async(req, res) => {
  const id = await productos.getAll()

  let newIDe = id[id.length - 1].id + 1

  const nombre = req.body.nombre
  const precio = req.body.precio
  const avatar = req.body.avatar
  const obj ={nombre:nombre,precio:precio,avatar:avatar,id: newIDe}
  await productos.saveItems(obj)
  res.redirect('/api/productos')
});
router.put('/api/productos/:id', async (req, res) => {
 const nombre = req.body.nombre
 const precio = req.body.precio
 const avatar = req.body.avatar
 await productos.editItem(req.params.id, nombre, precio, avatar)
 res.redirect(`/api/productos/${req.params.id}`)
});
router.delete('/api/productos/:id', async (req, res) => {
 productos.deleteItem(req.params.id)
 res.json({"Producto":"Eliminado con Exito"})
});


const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
router.post('/profile', cpUpload, function (req, res, next) {
    req.files['avatar'][0]
})
module.exports = router;

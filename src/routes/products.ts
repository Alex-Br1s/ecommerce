import { Router } from 'express'
import { handleGetAllProducts, handleGetAllProductsFilters, handleGetOneProduct, handleCreateProduct, handleUpdateProduct, handleDeleteOneProduct, handleGetAllProductsStock } from '../controllers/products'
import { checkAdminRole } from '../middleware/checkAdminRole'
import { authenticateToken } from '../middleware/authenticateToken'

// ?La advertencia que estás recibiendo se debe a una regla de ESLint (@typescript-eslint/no-misused-promises) que verifica que las funciones pasadas como argumentos en lugares donde se espera un valor void (es decir, sin retorno) no sean promesas.
// ?Cuando se usa async en la función de un controlador en Express, esa función devuelve una promesa, pero Express espera que las funciones de middleware y de manejo de rutas devuelvan void, no promesas.
// ?Antes router.get('/products', handleGetAllProducts) ahora || router.get('/products', (req, res, next) => {handleGetAllProducts(req, res).catch(next)})

const router = Router()

// ? Rutas de productos
router.get('/products', (req, res, next) => {
  handleGetAllProducts(req, res).catch(next)
})

router.get('/products/filtered', (req, res, next) => {
  handleGetAllProductsFilters(req, res).catch(next)
})

router.get('/product/:id', (req, res, next) => {
  handleGetOneProduct(req, res).catch(next)
})

//! Rutas de administrador
router.get('/products/stock', authenticateToken, checkAdminRole, (req, res, next) => {
  handleGetAllProductsStock(req, res).catch(next)
})

router.post('/product/create', authenticateToken, checkAdminRole, (req, res, next) => {
  handleCreateProduct(req, res).catch(next)
})

router.put('/product/edit/:id', authenticateToken, checkAdminRole, (req, res, next) => {
  handleUpdateProduct(req, res).catch(next)
})

router.delete('/product/delete/:id', authenticateToken, checkAdminRole, (req, res, next) => {
  handleDeleteOneProduct(req, res).catch(next)
})
//* categorias: Figuras, Peluches, Llaveros, Funkos, Comics

export default router

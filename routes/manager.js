const router = require('koa-router')()
//引入操作层
const managerController = require('../controllers/manager.js')

router.get('/manager', managerController.managerRender)
router.get('/manager/:id', managerController.managerSingle)
router.post('/manager', managerController.managerAdd)
router.put('/manager/:id', managerController.managerEdit)
router.del('/manager/:id', managerController.managerDelete)

module.exports = router
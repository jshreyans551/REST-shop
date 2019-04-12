const express = require("express");
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req,file,cb) => {
  if(file.mimetype === 'image.jpeg' || file.mimetype === 'image/png') 
    cb(null, true);
  else 
    cb(null, false);
}

const upload= multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter
});

router.get("/", ProductsController.get_all_products);

router.post("/", checkAuth, upload.single('productImage'), ProductsController.create_product);

router.get("/:productId", ProductsController.get_product_by_id);

router.patch("/:productId", checkAuth, ProductsController.update_product_details);

router.delete("/:productId", checkAuth, ProductsController.delete_product);

module.exports = router;
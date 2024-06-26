const { Product } = require("../models");
const Category = require("../models/Category");
const fs = require("fs");
const { createClient } = require("@supabase/supabase-js");
const formidable = require("formidable");
const _ = require("lodash");
const slugify = require("slugify");

//Display all products
async function index(req, res) {
  if (!req.query.data) {
    const allProducts = await Product.find();
    return res.json(allProducts);
  } else if (req.query.fndBy === "Category") {
    const products = await Product.find({ category: { $regex: req.query.data } });
    return res.json(products);
  } else if (req.query.fndBy === "Name") {
    //buscar tambien por la descripcion
    const products = await Product.find({ name: { $regex: req.query.data } });
    return res.json(products);
  }
}

//Get a random number of elements
async function getRandom(req, res) {
  if (req.query.slugToAvoid) {
    const allProductsWithoutId = await Product.find({ slug: { $ne: req.query.slugToAvoid } });
    const random = _.sampleSize(allProductsWithoutId, req.query.randomNumber);
    return res.json(random);
  } else {
    const allProducts = await Product.find();
    const random = _.sampleSize(allProducts, req.query.randomNumber);
    return res.json(random);
  }
}

//Show specific product by id through params
async function show(req, res) {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      return res.status(200).json(product);
    }
    return res.json("El producto no existe! Ha sido eliminado");
  } catch (error) {
    res.status(404);
  }
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

async function store(req, res) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    console.log(files.pictures)
    const allPictures = []
    if (!files.pictures.length && files.pictures) {
      const { data, error } = await supabase.storage
        .from("gema-product-img")
        .upload(files.pictures.newFilename, fs.createReadStream(files.pictures.filepath), {
          cacheControl: "3600",
          upsert: false,
          contentType: files.pictures.mimetype,
        });
      allPictures.push(
        `${`https://bvmhwmeqjbkperroelhp.supabase.co/storage/v1/object/public/gema-product-img/`}${files.pictures.newFilename
        }`
      )
    } else {
      for (const picture of files.pictures) {
        if (picture.newFilename) {
          const { data, error } = await supabase.storage
            .from("gema-product-img")
            .upload(picture.newFilename, fs.createReadStream(picture.filepath), {
              cacheControl: "3600",
              upsert: false,
              contentType: picture.mimetype,
            });
          allPictures.push(
            `${`https://bvmhwmeqjbkperroelhp.supabase.co/storage/v1/object/public/gema-product-img/`}${picture.newFilename
            }`
          )
        }
      }
    }
    try {
      const product = await Product.findOne({ name: fields.name });
      if (product) {
        return res.json(409);
      } else {
        try {
          const newProduct = new Product({
            name: fields.name,
            price: fields.price,
            stock: fields.stock,
            description: fields.description,
            pictures: allPictures,
            category: fields.category,
            slug: slugify(fields.name, { lower: true }),
          });
          newProduct.save();
          return res.status(200).json({ message: "El producto se guardo correctamente" });
        } catch (error) {
          return res.status(500).json({ message: "Error!" });
        }
      }
    } catch (error) {
      if (error) {
        return res.status(400).json({ message: "Algún casillero esta vacío" });
      }
    }
  });
}

async function update(req, res) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const currentProduct = await Product.findOne({ slug: req.params.slug })
    let allNewPictures = []
    if (files.pictures) {
      if (!files.pictures.length) {
        const { data, error } = await supabase.storage
          .from("gema-product-img")
          .upload(files.pictures.newFilename, fs.createReadStream(files.pictures.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.pictures.mimetype,
          });
        allNewPictures.push(
          `${`https://bvmhwmeqjbkperroelhp.supabase.co/storage/v1/object/public/gema-product-img/`}${files.pictures.newFilename
          }`
        )
        const picturesAsArray = req.query.pictures.split(",")
        allNewPictures = [...allNewPictures, ...picturesAsArray]
      } else {
        for (const picture of files.pictures) {
          if (picture.newFilename) {
            const { data, error } = await supabase.storage
              .from("gema-product-img")
              .upload(picture.newFilename, fs.createReadStream(picture.filepath), {
                cacheControl: "3600",
                upsert: false,
                contentType: picture.mimetype,
              });
            allNewPictures.push(
              `${`https://bvmhwmeqjbkperroelhp.supabase.co/storage/v1/object/public/gema-product-img/`}${picture.newFilename
              }`
            )
          }
        }
        const picturesAsArray = req.query.pictures.split(",");
        allNewPictures = [...allNewPictures, ...picturesAsArray];
      }
    } else {
      const picturesAsArray = req.query.pictures.split(",")
      allNewPictures = [...allNewPictures, ...picturesAsArray];
    }

    //ELIMINATE ALL CORRESPONDING PICTURES
    const picturesAsArray = req.query.pictures.split(",")
    for (const pic of currentProduct.pictures) {
      if (pic.includes("supabase")) {
        if (!picturesAsArray.includes(`${pic}`)) {
          const partToDelete = pic.split("/");
          const { data, error } = await supabase.storage
            .from('avatars')
            .remove([`${partToDelete[8]}`])
        }
      }
    }

    try {
      //VERIFY IF PRODUCT EXISTS
      let productExists;
      if (fields.name !== req.query.originalName) {
        productExists = await Product.findOne({ name: fields.name });
      }
      if (productExists) {
        return res.json(409);
      } else {
        try {
          await Product.findOneAndUpdate(
            { slug: req.params.slug },
            {
              name: fields.name,
              category: fields.category,
              price: fields.price,
              stock: fields.stock,
              description: fields.description,
              pictures: allNewPictures,
            },
          );
          const updateProduct = await Product.findOne({ slug: req.params.slug });
          if (updateProduct.category !== req.query.originalCategory) {
            await Category.findOneAndUpdate(
              { name: updateProduct.category },
              { $push: { products: updateProduct._id } },
            );
            await Category.findOneAndUpdate(
              {
                name: req.query.originalCategory
              },
              { $pull: { products: updateProduct._id } },
            );
          }
          return res.json(200);
        } catch (error) {
          res.status(500).json({ message: "Error! Not a valid product" });
        }
      }
    } catch (error) {
      if (error) {
        return res.status(400).json({ message: "A field is missing." });
      }
    }
  })
}

// Remove product from storage (only admin)
async function destroy(req, res) {
  try {
    await Product.findOneAndDelete({ slug: req.params.slug });
  } catch (error) {
    res.status(500);
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  getRandom,
};

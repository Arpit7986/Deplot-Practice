const mongoose=require('mongoose')
const Product=require('./models/Product')

const products=[
    {
        name:"Men’s Navy Running",
        img:"https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-008-400x400.jpg",
        price:104,
        desc:"Amazing Product To Buy"
    },
    {
        name:"Men’s Green Running",
        img:"https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-007-400x400.jpg",
        price:89,
        desc:"Amazing Product To Buy"
    },
    {
        name:"Women’s Tan Sneaker",
        img:"https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-011-400x400.jpg",
        price:80,
        desc:"Amazing Product To Buy"
    }
    
]



async function seedDB(){
    await Product.insertMany(products)
    console.log("Data Seeded Successfully");
}

module.exports=seedDB
const Sequelize = require('sequelize')
const conn = new Sequelize("postgres://localhost/productsales")

const Product = conn.define("product", {
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    discount: Sequelize.INTEGER,
    availability: Sequelize.STRING

})

const SyncAndSeed = () => {
     
    conn.sync({force:true}).then(()=>{
        Product.bulkCreate([
            {
                name: "Foo",
                price: 3,
                discount: 20,
                availability: "instock"
            }, 
            {
                name: "Bazz",
                price: 4,
                discount: 0,
                availability: "backordered"
            },
            {
                name: "Quq",
                price: 2,
                discount: 0,
                availability: "discontinued"
            },{
                name: "Bar",
                price: 13,
                discount: 50,
                availability: "instock"
            }, 
    ])
    }).catch((err)=>console.log(err))
}




module.exports = {conn, Product, SyncAndSeed}

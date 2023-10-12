
const oldData=
{
    _id: new ObjectId("64e4cbd9baa74dda12b2f17a"),
    user_id: '64d20a439748af3be87eb313',
    products: [
      {
        quantity: 1,
        product_id: '64d1d514485c39a0cde6f6a0',
       
        _id: new ObjectId("64e4f1e33f8ec8704273a513")
      },
      {
        quantity: 1,
        product_id: '64d1d517485c39a0cde6f6a4',
       
        _id: new ObjectId("64e4f1e53f8ec8704273a582")
      },
      {
        quantity: 1,
        product_id: '64d1d514485c39a0cde6f6a0',
       
        _id: new ObjectId("64e4f3533f8ec8704273a863")
      }
    ],
  }
there is a products.quantity in 1st oldData.now give products.quantity in newData whos products._id is equals to products.product_id in oldData


  const newData={
    "_id": "64e4cbd9baa74dda12b2f17a",
    "user_id": "64d20a439748af3be87eb313",
    "products": [
        {
          
            "_id": "64d1d517485c39a0cde6f6a4",
   
        }
    ]
}
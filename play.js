[
  {
      "_id": "65363dbb22fe0224d00b889d",
      "user_id": "64da576310f6675f044c3bba",
      "product_id": "64d1d517485c39a0cde6f6a4",
      "rating": 2,
      "description": "1st review",
      "__v": 0
  },
  {
      "_id": "65363dca22fe0224d00b889f",
      "user_id": "64da576310f6675f044c3bba",
      "product_id": "64d1d517485c39a0cde6f6a4",
      "rating": 3,
      "description": "1st review",
      "__v": 0
  },
  {
      "_id": "65364c4f5c7135252f6b5a97",
      "user_id": "64ddb0d2f8ee2a51a1990d99",
      "product_id": "64d1d517485c39a0cde6f6a4",
      "rating": 3,
      "description": "1st review",
      "__v": 0
  }
]
remove its user_id and replace it with obj whos id is equals to user_id 

[
  {
      "_id": "64da576310f6675f044c3bba",
      "name": "Prateek Sonar",
      "email": "prateeksonar02@gmail.com",
      "active": true,
      "billing_address": "lasur naka",
      "billing_city": "city",
      "billing_phone": 2783223,
      "billing_state": "Bihar",
      "billing_zip": 400054,
      "shipping_address": "dffdd",
      "shipping_city": "city",
      "shipping_phone": 9770707070,
      "shipping_state": "Arunachal Pradesh",
      "shipping_zip": 431109
  },
  {
      "_id": "64ddb0d2f8ee2a51a1990d99",
      "name": "126_Pratik Sonar",
      "email": "sonarpratik02.ps@gmail.com",
      "active": true,
      "billing_address": "lasur naka",
      "billing_city": "city",
      "billing_phone": 987654321023,
      "billing_state": "Gujarat",
      "billing_zip": 400054,
      "shipping_address": "dffdd",
      "shipping_city": "city",
      "shipping_phone": 9770707070,
      "shipping_state": "Andhra Pradesh",
      "shipping_zip": 431109
  }
]

for eg
{
  "_id": "65363dbb22fe0224d00b889d",
  "user":   {
    "_id": "64da576310f6675f044c3bba",
    "name": "Prateek Sonar",
    "email": "prateeksonar02@gmail.com",
    "active": true,
    "billing_address": "lasur naka",
    "billing_city": "city",
    "billing_phone": 2783223,
    "billing_phone": 2783223,
    "billing_state": "Bihar",
    "billing_zip": 400054,
    "shipping_address": "dffdd",
    "shipping_city": "city",
    "shipping_phone": 9770707070,
    "shipping_state": "Arunachal Pradesh",
    "shipping_zip": 431109
},
  "product_id": "64d1d517485c39a0cde6f6a4",
  "rating": 2,
  "description": "1st review",
  "__v": 0
}
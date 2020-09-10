# @timbouc/cart

A Shopping Cart Implementation for Node.js and browsers.



## Getting Started

This package is available in the npm registry.
It can easily be installed with `npm` or `yarn`.

```bash
$ npm i @timbouc/cart
# or
$ yarn add @timbouc/cart
```

Instantiate with a [configuration](examples/config.ts).

```javascript
const { Cart } = require('@timbouc/cart');
const cart = new Cart(config);
cart.session(context.uudid)
```





## Usage

### Registering Storage

```typescript
const { RedisStorage, PostgresStorage } from './StorageDrivers';

const session = context.uudid
const cart = new Cart(session, config)
cart.registerDriver('redis', RedisStorage)
cart.registerDriver('pg', PostgresStorage())

// use redis storage for different shopping carts
cart.driver('redis')
	.add(...)

// use postgres storage for wishlist
cart.driver('pg')
    .session(session + ':wishlist') // can also change session (user)
	.add(...)
```



### Response interface

Asynchronous methods will always return a Promise which resolves with a `Response`
object.



### Methods

<details>
<summary markdown="span"><code>add(item: CartInputItem|Array&lt;CartInputItem&gt;): Promise&lt;CartItem|Array<CartItem>&gt;</code></summary>

This method will append the content to the file at the location.
If the file doesn't exist yet, it will be created.

```javascript
// add one item to cart
const item = await cart.add({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 3, // defaults to one
    options: options as Array<CartItemOption>,
})

// add multiple items to cart
const [item1, item2] = await cart.add([
    {
        id: product1.id,
        name: product1.name,
        price: product1.price,
        options: [{
            name: "Color",
            value: "pink",
        }]
    },
    {
        id: product2.id,
        name: product2.name,
        price: product2.price,
    },
])
```

</details>

<details>
<summary markdown="span"><code>update(item_id: number|string, options: object): Promise&lt;CartItem&gt;</code></summary>

```typescript
// new item price, price can also be a string format like so: '98.67'
cart.update(456, {
    name: 'New Item Name',
    price: 99.99,
});


// update a product's quantity
cart.update(456, {
    quantity: 2, // if the current product has a quantity of 4, another 2 will be added so this will result to 6
});

// update a product by reducing its quantity
cart.update(456, {
    quantity: -1, // if the current product has a quantity of 4, another 2 will be subtracted so this will result to 3
});

// NOTE: as you can see by default, the quantity update is relative to its current value
// to totally replace the quantity instead of incrementing or decrementing its current quantity value
// pass an array in quantity
cart.update(456, {
    quantity: {
        relative: false,
        value: 5
    }
});
```

</details>

<details>
<summary markdown="span"><code>get(item_id: number_string): Promise&lt;CartItem&gt;</code></summary>


```javascript
const item = await cart.get(item_id);
```

</details>

<details>
<summary markdown="span"><code>empty(): Promise&lt;Boolean&gt;</code></summary>


```javascript
await cart.empty()
```

</details>

<details>
<summary markdown="span"><code>clear(): Promise</code></summary>

```javascript
await cart.clear()
```

</details>

## Contribution Guidelines

Any pull requests or discussions are welcome.
Note that every pull request providing new feature or correcting a bug should be created with appropriate unit tests.

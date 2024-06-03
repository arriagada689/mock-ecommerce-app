# Mock E-Commerce App

## Full stack application which simulates an online store using the MERN tech stack (MongoDB, Express, React, Node.js).

<img src="readme_pic.png" alt="Mock Ecommerce App" width="800" height="550">

## Features
- Product sorting and filtering
- User authentication
- Add/remove products from cart
- Favorite products
- Complete orders and track your order history

## Source Code Aspects

### Login Server Endpoint
Here's the server endpoint that handles user login and authentication with Node.js and Express. It checks the user's credentials, compares the password with the hashed version in the database, and if successful, initializes a JWT token and sends back user details to be stored locally.
```javascript
    const authUser = asyncHandler(async (req, res) => {
        const { username, password } = req.body

        const user = await User.findOne({username})

        if (user && (await user.matchPasswords(password))) {
            const token = generateToken(user._id)
            
            res.status(201).json({
                _id: user._id,
                username: user.username,
                cartTotal: user.cartTotal,
                token: token
            })
        } else {
            res.status(401)
            throw new Error('Invalid username or password')
        }
    })
```

### Frontend Routing
The React frontend uses `createBrowserRouter` to manage routes. All routes are nested under `<MainLayout>`, which includes the navbar. Some routes have dynamic parameters, and others require authentication.
```javascript
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/cart' element={<RequireAuth><Cart /></RequireAuth>}/>
            <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>}/>
            <Route path='/order_complete/:id' element={<RequireAuth><OrderComplete /></RequireAuth>}/>
            <Route path='/prompt' element={<Prompt />}/>
            <Route path='/product/:id' element={<ProductPage />}/>
            <Route path='/confirm_delete' element={<RequireAuth><ConfirmDelete /></RequireAuth>}/>
            <Route path='/update_profile' element={<RequireAuth><UpdateProfile /></RequireAuth>}/>
            <Route path='*' element={<NotFound />}/>
            </Route>
        )
    )
```

## Deployment Details
The frontend is hosted on [Vercel](https://vercel.com/), the backend server is hosted on [Render](https://render.com/), the database is hosted on [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database). The frontend of this project was developed using [Vite](https://vitejs.dev/).


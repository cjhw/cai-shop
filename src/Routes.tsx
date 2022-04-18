import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './components/core/Home'
import Shop from './components/core/Shop'
import Signin from './components/core/Signin'
import Signup from './components/core/Signup'
import DashBoard from './components/admin/DashBoard'
import PrivateRoute from './components/admin/PrivateRoute'
import AdminDashBoard from './components/admin/AdminDashBoard'
import AdminRoute from './components/admin/AdminRoute'
import AddCategory from './components/admin/AddCategory'
import AddProduct from './components/admin/AddProduct'
import Product from './components/core/Product'
import Cart from './components/core/Cart'
import Success from './components/core/Success'
import Orders from './components/admin/Orders'

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/shop" component={Shop} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/paysuccess" component={Success} />
        <PrivateRoute
          path="/user/dashboard"
          component={DashBoard}
        ></PrivateRoute>
        <AdminRoute path="/admin/dashboard" component={AdminDashBoard} />
        <AdminRoute path="/create/category" component={AddCategory} />
        <AdminRoute path="/create/product" component={AddProduct} />
        <AdminRoute path="/admin/orders" component={Orders} />
        <Route path="/product/:productId" component={Product} />
      </Switch>
    </HashRouter>
  )
}

export default Routes

import { Layout } from '@/Components/Layout'
import { ProductsPage } from '@/Components/products-page'
import React from 'react'

function Welcome() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API URL:", API_URL);
  return (
    <Layout>
      <ProductsPage />
    </Layout>
  )
}

export default Welcome

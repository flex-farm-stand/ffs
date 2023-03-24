import { gql } from 'graphql-request'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { AddProductForm, InventoryList } from '@/features/inventory'
import { graphQLClient } from '@/features/gql'
import { useSupabaseClient } from '@/features/supabase'
import { useAuth } from '@/features/users'
import { CenterAndLimitWidth } from '@/features/ui'
import { capitalize } from '@/features/utils'

const initialFeedback = { status: '', message: '' }
const initialName = ''
const initialPrice = ''
const attributes = [
  { name: 'checked', Component: () => <input type="checkbox" /> },
  { name: 'index', display: '#' },
  { name: 'name', display: 'Name' },
  { name: 'price', display: 'Price' },
  { name: 'dateAdded', display: 'Added' },
]

export function Inventory() {
  const auth = useAuth()
  const [editing, setEditing] = useState(false)
  const [feedback, setFeedback] = useState({ status: '', message: '' })
  const inputRef = useRef(null)
  const [imageFileName, setImageFileName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState(initialName)
  const [price, setPrice] = useState(initialPrice)
  const supabase = useSupabaseClient()
  const [uploading, setUploading] = useState(false)
  const { status, data, error } = useProducts({ sellerId: auth.user.id })

  useEffect(() => {
    getInventory()
  }, [])
  async function getInventory() {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, date_added')
      .eq('seller_id', auth.user.id)

    if (error) {
      throw new Error('Unable to query products table')
    }
    setInventory(
      data.map((d, i) => ({
        checked: false,
        index: '' + ++i,
        name: d.name,
        price: d.price,
        dateAdded: new Date(d.date_added).toDateString(),
        url: `/product/${d.id}`,
      }))
    )
    setLoading(false)
  }
  function handleCheckboxChange(index) {
    setInventory(
      inventory.map((item) =>
        item.index === index ? { ...item, checked: !item.checked } : item
      )
    )
  }
  async function handleFileChange(e) {
    try {
      setUploading(true)
      setFeedback(initialFeedback)

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('No image selected for upload')
      }
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      // Assign random sequence of fractional digits of [0 < number < 1)
      const fileName = `${Math.random().toString().slice(2)}.${fileExt}`

      // Query #1 - upload image
      const uploadResponse = await supabase.storage
        .from('product_images')
        .upload(fileName, file)

      if (uploadResponse.error) {
        throw uploadResponse.error
      }
      setImageFileName(fileName)

      const urlResponse = supabase.storage
        .from('product_images')
        .getPublicUrl(fileName)

      setImageUrl(urlResponse.data.publicUrl)
      setEditing(true)
    } catch (error) {
      setFeedback({ status: 'error', message: error.message })
    } finally {
      setUploading(false)
    }
  }
  function handlePriceChange(e) {
    setPrice(e.target.value)
    setEditing(true)
  }
  function handleNameChange(e) {
    setName(e.target.value)
    setEditing(true)
  }
  async function onInsert(e) {
    e.preventDefault()
    const data = await supabase.from('products').insert({
      seller_id: auth.user.id,
      name,
      price,
      available: true,
      image_filename: imageFileName,
    })

    if (data.error) {
      throw new Error('Unable to insert into products table')
    }
    resetForm()
    getInventory()
  }
  function resetForm() {
    setName(initialName)
    setPrice(initialPrice)
    setImageUrl('')
    setImageFileName('')
    setEditing(false)
    inputRef.current.focus()
  }

  return (
    !loading && (
      <CenterAndLimitWidth>
        <AddProductForm
          editing={editing}
          feedback={feedback}
          handleFileChange={handleFileChange}
          handleNameChange={handleNameChange}
          handlePriceChange={handlePriceChange}
          imageUrl={imageUrl}
          inputRef={inputRef}
          name={name}
          onInsert={onInsert}
          price={price}
          reset={resetForm}
          uploading={uploading}
        />
        <InventoryList
          attributes={attributes}
          data={data}
          error={error}
          handleCheckboxChange={handleCheckboxChange}
          inventory={inventory}
          status={status}
        />
      </CenterAndLimitWidth>
    )
  )
}

function useProducts({ sellerId }) {
  return useQuery({
    queryKey: ['products', sellerId],
    queryFn: async () => {
      const { products } = await graphQLClient.request(
        gql`
          query {
            products: productsCollection(
              filter: { sellerId: { eq: "${sellerId}" } }
            ) {
              edges {
                node {
                  name
                  price
                  dateAdded
                }
              }
            }
          }
        `
      )
      return products?.edges.map((d, i) => ({
        checked: false,
        index: '' + ++i,
        name: capitalize(d.node.name),
        price: '$' + (+d.node.price).toFixed(2),
        dateAdded: new Date(d.node.dateAdded).toDateString(),
        url: `/product/${d.id}`,
      }))
    },
    retry: false,
  })
}

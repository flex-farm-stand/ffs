import { useEffect, useRef, useState } from 'react'

import { AddProductForm, InventoryList } from '@/features/inventory'
import { useSupabaseClient } from '@/features/supabase'
import { useAuth } from '@/features/users'
import { CenterAndLimitWidth } from '@/features/ui'

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

  useEffect(() => {
    getInventory()
  }, [])
  async function getInventory() {
    const { data, error } = await supabase
      .from('products')
      .select('name, price, date_added')
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
      const fileName = `public/${Math.random().toString().slice(2)}.${fileExt}`

      // Query #1 - upload image
      const uploadResponse = await supabase.storage
        .from('product_images')
        .upload(fileName, file)

      if (uploadResponse.error) {
        throw uploadResponse.error
      }
      setImageFileName(fileName)

      // Query #2 - obtain URL to image that only works for the next 60 seconds
      const urlResponse = await supabase.storage
        .from('product_images')
        .createSignedUrls([fileName], 60)

      if (urlResponse.error) {
        throw urlResponse.error
      }
      setImageUrl(urlResponse.data[0].signedUrl)
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
          handleCheckboxChange={handleCheckboxChange}
          inventory={inventory}
        />
      </CenterAndLimitWidth>
    )
  )
}

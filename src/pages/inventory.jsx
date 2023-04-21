import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { fetchProductsBySeller, insertProduct } from '@/features/gql'
import { AddProductForm, InventoryList } from '@/features/inventory'
import { useAuth } from '@/features/users'
import { CenterAndLimitWidth } from '@/features/ui'
import { useSupabaseClient } from '@/features/supabase'

// Initial state
const initialFeedback = { status: '', message: '' }
const initialName = ''
const initialPrice = ''

// Form feedback messages
const successInsertProduct = 'Added one new product'
const failureInsertProduct = 'Unable to add new product'

//Attributes of each row of the inventory table
const attributes = [
  { name: 'checked', Component: () => <input type="checkbox" /> },
  { name: 'index', display: '#' },
  { name: 'name', display: 'Name' },
  { name: 'price', display: 'Price' },
  { name: 'dateAdded', display: 'Added' },
]

export function Inventory() {
  // Non-state hooks
  const auth = useAuth()
  const inputRef = useRef(null)
  const supabase = useSupabaseClient()

  // State hooks
  const [checkMarks, setCheckMarks] = useState([])
  const [editing, setEditing] = useState(false)
  const [feedback, setFeedback] = useState(initialFeedback)
  const [imageFileName, setImageFileName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState(initialName)
  const [price, setPrice] = useState(initialPrice)
  const [uploading, setUploading] = useState(false)

  // GQL hooks
  const newProduct = useMutation({
    mutationFn: (product) => insertProduct(product),
    onSuccess: () => {
      setFeedback(initialFeedback)
      queryClient.invalidateQueries({ queryKey: ['productsBySeller'] })
      setFeedback({ status: 'success', message: successInsertProduct })
    },
    onError: (err) => {
      console.error(err.message)
      setFeedback({ status: 'error', message: failureInsertProduct })
    },
  })
  const productList = useQueryToFetchProductList({ sellerId: auth.user.id })
  const queryClient = useQueryClient()
  function useQueryToFetchProductList({ sellerId }) {
    return useQuery({
      onSuccess: (data) => setCheckMarks(Array(data.length).fill(false)),
      queryFn: () => fetchProductsBySeller({ sellerId }),
      queryKey: ['productsBySeller', sellerId],
      retry: false,
    })
  }

  // State handlers
  function handleCheckboxChange(index) {
    setCheckMarks(checkMarks.map((cm, i) => (i === index ? !cm : cm)))
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
  function handleNameChange(e) {
    setName(e.target.value)
    setEditing(true)
  }
  function handlePriceChange(e) {
    setPrice(e.target.value)
    setEditing(true)
  }

  // Misc callbacks
  function onSubmitNewProduct(e) {
    e.preventDefault()
    newProduct.mutate({
      available: true,
      imageFileName,
      name,
      price,
      retrieveAccessToken: auth.retrieveAccessToken,
      sellerId: auth.user.id,
    })
  }
  function resetFormNewProduct() {
    setName(initialName)
    setPrice(initialPrice)
    setImageUrl('')
    setImageFileName('')
    setEditing(false)
    inputRef.current.focus()
  }

  return (
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
        onSubmit={onSubmitNewProduct}
        price={price}
        reset={resetFormNewProduct}
        uploading={uploading}
      />
      <InventoryList
        attributes={attributes}
        checkMarks={checkMarks}
        handleCheckboxChange={handleCheckboxChange}
        productList={productList}
      />
    </CenterAndLimitWidth>
  )
}

import { useRef, useState } from 'react'

import {
  useCreateProduct,
  useProductsBySeller,
  useUploadProductImage,
  AddProductForm,
  InventoryList,
} from '@/features/inventory'
import { CenterAndLimitWidth } from '@/features/ui'

// Initial state
const initialFeedback = { status: '', message: '' }
const initialName = ''
const initialPrice = ''

// Form feedback messages
const successInsertProduct = 'Added one new product'
const failureInsertProduct = 'Unable to add new product'
const failureUploadProductImage = 'No image selected for upload'

//Attributes of each row of the inventory table
const attributes = [
  { name: 'checked', Component: () => <input type="checkbox" /> },
  { name: 'index', display: '#' },
  { name: 'name', display: 'Name' },
  { name: 'price', display: 'Price' },
  { name: 'dateAdded', display: 'Added' },
]

export function Inventory() {
  // State hooks
  const [checkMarks, setCheckMarks] = useState([])
  const [editing, setEditing] = useState(false)
  const [formFeedback, setFormFeedback] = useState(initialFeedback)
  const [imageFileName, setImageFileName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState(initialName)
  const [price, setPrice] = useState(initialPrice)
  const [uploading, setUploading] = useState(false)

  // Misc hooks
  const inputRef = useRef(null)

  // GQL hooks
  const createProductMutation = useCreateProduct({
    failureInsertProduct,
    setFormFeedback,
    successInsertProduct,
  })
  const productsBySeller = useProductsBySeller({
    setCheckMarks,
  })
  const uploadProductImageMutation = useUploadProductImage({
    setFormFeedback,
    setImageFileName,
    setImageUrl,
    setUploading,
  })

  // State handlers
  function handleCheckboxChange(index) {
    setCheckMarks(checkMarks.map((cm, i) => (i === index ? !cm : cm)))
  }
  function handleFileChange(e) {
    setEditing(true)
    if (!e.target.files || e.target.files.length === 0) {
      setFormFeedback({ status: 'error', message: failureUploadProductImage })
      return
    }
    uploadProductImageMutation.mutate({ file: e.target.files[0] })
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
    createProductMutation.mutate({
      available: true,
      imageFileName,
      name,
      price,
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
        formFeedback={formFeedback}
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
        productsBySeller={productsBySeller}
      />
    </CenterAndLimitWidth>
  )
}

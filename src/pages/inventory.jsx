import { useEffect, useRef, useState } from 'react'

import { AddProductForm, InventoryList } from '@/features/inventory'
import { supabase, useAuth } from '@/features/users'

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
  const inputRef = useRef(null)
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState(initialName)
  const [price, setPrice] = useState(initialPrice)

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
    setEditing(false)
    inputRef.current.focus()
  }

  return (
    !loading && (
      <>
        <AddProductForm
          editing={editing}
          handleNameChange={handleNameChange}
          handlePriceChange={handlePriceChange}
          inputRef={inputRef}
          name={name}
          onInsert={onInsert}
          price={price}
          reset={resetForm}
        />
        <InventoryList
          attributes={attributes}
          handleCheckboxChange={handleCheckboxChange}
          inventory={inventory}
        />
      </>
    )
  )
}

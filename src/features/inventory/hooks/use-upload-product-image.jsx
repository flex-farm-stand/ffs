import { useMutation } from '@tanstack/react-query'

import { useSupabaseClient } from '@/features/supabase'

async function uploadProductImage({
  file,
  setImageFileName,
  setImageUrl,
  setUploading,
  supabase,
}) {
  setUploading(true)
  const fileExt = file.name.split('.').pop()
  // Assign random sequence of fractional digits of [0 < number < 1)
  const fileName = `${Math.random().toString().slice(2)}.${fileExt}`
  const { error: uploadError } = await supabase.storage
    .from('product_images')
    .upload(fileName, file)

  if (uploadError) {
    throw new Error(uploadError.message)
  }
  setImageFileName(fileName)

  const {
    data: { publicUrl },
  } = supabase.storage.from('product_images').getPublicUrl(fileName)

  setImageUrl(publicUrl)
}

export function useUploadProductImage({
  setFormFeedback,
  setImageFileName,
  setImageUrl,
  setUploading,
}) {
  const supabase = useSupabaseClient()

  return useMutation({
    mutationFn: ({ file }) =>
      uploadProductImage({
        file,
        setImageFileName,
        setImageUrl,
        setUploading,
        supabase,
      }),
    onSuccess: () => {
      setUploading(false)
    },
    onError: (err) => {
      console.error(err.message)
      setFormFeedback({ status: 'error', message: err.message })
      setUploading(false)
    },
  })
}

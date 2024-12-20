import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Description } from '@radix-ui/react-dialog'

interface ModuleProps {
  label: string
  optionName: string
  imageKey: string
  descriptionKey: string
  formData: any
  option: string
  handleButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void
}

const imageComponents: React.FC<ModuleProps> = ({
  label,
  optionName,
  imageKey,
  descriptionKey,
  formData,
  option,
  handleButtonClick,
  handleInputChange,
  handleFileChange
}) => {
  let labelText = ''

  switch (imageKey) {
    case 'description':
      labelText = 'Pon una descripción'
      break
    case 'tempOrigen':
      labelText = 'Temperatura Origen'
      break
    case 'tempDestino':
      labelText = 'Temperatura Destino'
      break
    default:
      labelText = 'Pon una descripción'
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
      <label style={{ flex: '0 0 50px', fontWeight: 'bold' }}>{label}: </label>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Button name={optionName} value='Si' onClick={handleButtonClick}>
          Sí
        </Button>
        <Button name={optionName} value='No' onClick={handleButtonClick}>
          No
        </Button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontWeight: 'bold' }}>{labelText}</label>
          <Input
            type='text'
            name={descriptionKey}
            value={formData[descriptionKey]}
            onChange={handleInputChange}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '200px' }}
          />
        </div>

        {formData[optionName] === option && imageKey !== 'tempDestino' && imageKey !== 'tempOrigen' && (
          <div style={{ marginTop: '20px' }}>
            <Dialog>
              <DialogTrigger asChild>
                <Button style={{ marginTop: '10px' }}>Seleccionar imágenes</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogTitle>Galería de Imágenes</DialogTitle>

                {/* Contenedor scrollable para las imágenes */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginTop: '20px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '8px'
                }}
                >
                  {formData[imageKey].map((imageUrl: string, index: number) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`image-${index}`}
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  ))}
                </div>

                {/* Sección para seleccionar más imágenes */}
                <div style={{ marginTop: '20px' }}>
                  <Button>
                    <label htmlFor={`dialog-file-input-${imageKey}`} style={{ cursor: 'pointer' }}>
                      Seleccionar más imágenes
                    </label>
                  </Button>

                  {formData[imageKey].length < 8
                    ? (
                      <input
                        type='file'
                        id={`dialog-file-input-${imageKey}`}
                        accept='image/*'
                        multiple
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e, imageKey)}
                      />
                      )
                    : (
                      <p style={{ color: 'red', marginTop: '10px' }}>No puedes agregar más de 8 imágenes</p>
                      )}
                </div>

                <DialogClose asChild>
                  <Button style={{ marginTop: '20px' }}>Cerrar</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  )
}

export default imageComponents

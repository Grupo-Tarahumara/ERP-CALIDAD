import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input' // Asegúrate de importar tus componentes personalizados

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
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '10px',
        width: '100%'
      }}
    >
      <label style={{ flex: 0.25, fontWeight: 'bold' }}>{label}: </label>
      <div style={{ flex: 0.8, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Button
          style={{ marginRight: '0' }}
          name={optionName}
          value='Si'
          onClick={handleButtonClick}
        >
          Sí
        </Button>
        <Button
          style={{ marginRight: '0' }}
          name={optionName}
          value='No'
          onClick={handleButtonClick}
        >
          No
        </Button>

        <div style={{ flex: 1, alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '70%', fontWeight: 'bold' }}>Pon una descripción</label>
          <Input
            type='text'
            name={descriptionKey}
            value={formData[descriptionKey]}
            onChange={handleInputChange}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        {formData[optionName] === option && (
          <div>
            <div style={{ marginTop: '20px' }}>
              <Button>
                <label
                  htmlFor={`file-input-${imageKey}`}
                  style={{ cursor: 'pointer' }}
                >
                  Seleccionar Imagen
                </label>
              </Button>
              {(formData[imageKey] != null && formData[imageKey].length < 8)
                ? (

                  <input
                    type='file'
                    id={`file-input-${imageKey}`}
                    accept='image/*'
                    multiple
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, imageKey)}
                  />
                  )
                : (
                  <p style={{ color: 'red', marginTop: '10px' }}>
                    No puedes agregar más de 8 imágenes
                  </p>
                  )}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  marginTop: '20px'
                }}
              >
                {formData[imageKey]?.map(
                  (imageUrl: string, index: number) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={imageKey}
                      style={{
                        width: '200px',
                        height: '200px',
                        margin: '10px',
                        objectFit: 'cover'
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default imageComponents

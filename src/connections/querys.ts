import { supabase } from './supabase'
import Swal from 'sweetalert2'
import { getIncompleteFields } from '@/components/validationEmptyFiles'

export const query = async () => {
  try {
    // Realizamos la solicitud GET a la API local
    const response = await fetch('http://localhost:3000/api/data')

    // Verificamos si la respuesta fue exitosa (status 200)
    if (!response.ok) {
      throw new Error('Error al obtener los datos')
    }

    // Convertimos la respuesta a JSON
    const data = await response.json()

    // Verificamos si tenemos datos en la respuesta
    if ((data != null) && data.length > 0) {
      console.log(data) // Mostramos los datos obtenidos
    } else {
      console.log('No hay datos disponibles')
    }
  } catch (e) {
    console.log('El error es:', e) // Capturamos y mostramos cualquier error que ocurra
  }
}

export const verificationOC = async (oc: string): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:3000/api/verificationOC?oc=${oc}`)

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`)
    }

    const data = await response.json() // Analiza el cuerpo de la respuesta como JSON

    if (data.length > 0) { // Si hay elementos, la OC ya existe
      Swal.fire({
        icon: 'warning',
        title: 'Elemento existente',
        text: 'La orden de compra ya fue registrada con este ID.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#9A3424',
        iconColor: '#9A3424'
      })
      return false
    }

    return true // No existen elementos, la OC es válida
  } catch (error) {
    console.error('Error en verificationOC:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al verificar la orden de compra.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#9A3424',
      iconColor: '#9A3424'
    })
    return false
  }
}

export const insert = async (formData: any): Promise<void> => {
  try {
    // Validar campos incompletos y verificar OC
    const incompleteFiles = getIncompleteFields(formData)
    console.log(incompleteFiles)

    if (incompleteFiles.length > 0) {
      Swal.fire({
        title: 'Campos incompletos',
        text: `Por favor completa los siguientes campos: ${incompleteFiles.join(', ')}`,
        icon: 'warning',
        confirmButtonText: 'Entendido'
      })
      return
    }

    const state = await verificationOC(formData.oc)

    if (state) {
      // Realizar la solicitud POST a la API
      const response = await fetch('http://localhost:3000/api/insertActa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fecha: formData.fecha,
          start_verification: formData.inicioVerificacion,
          end_verification: formData.terminoVerificacion,
          oc: formData.oc,
          provider: formData.proveedor,
          origin: formData.origen,
          bill: formData.factura,
          specie: formData.especie,
          boxes_received: formData.cajasRecibidas,
          varieties: formData.especie,
          cold_disc: formData.frioDescarga,
          carrier_line: formData.lineaTransportista,
          num_cont: formData.numeroContenedor,
          truck_plt: formData.placasCamion,
          box_plt: formData.placasCaja,
          driver: formData.chofer,
          setpoint_temp: formData.tempSetPoint,
          screen_temp: formData.tempPantalla,
          setpoint_obs: formData.observacionesSetPoint,
          screen_obs: formData.observacionesPantalla,
          therm_dst: formData.tempDestino,
          therm_org_obs: formData.tempOrigen,
          therm_dst_obs: formData.tempDestino,
          clean_free: formData.limpio,
          clean_obs: formData.observacionesSetPoint,
          close: formData.cajaCerrada,
          close_obs: formData.observacionesSetPoint,
          box_state: formData.lona,
          box_obs: formData.observacionesSetPoint,
          tarp_state: formData.fauna,
          tarp_obs: formData.observacionesSetPoint,
          pest_free: formData.carga,
          pest_obs: formData.observacionesSetPoint,
          load_state: formData.seguridadCarga,
          load_obs: formData.observacionesSetPoint,
          load_sec: formData.seguridadCarga,
          sec_obs: formData.observacionesSetPoint,
          seal: formData.sellado,
          seal_obs: formData.observacionesSetPoint,
          pallet_dmg: formData.numeroSerie,
          pallet_num: formData.resultadosInv,
          box_id: formData.numeroSerie,
          box_num: formData.resultadosInv,
          box_dmg: formData.numeroSerie,
          dmg_num: formData.resultadosInv,
          tempa_door: formData.tempAPuerta,
          tempa_mid: formData.tempAMedio,
          tempa_back: formData.tempAFondo,
          tempm_door: formData.tempMPuerta,
          tempm_mid: formData.tempMMedio,
          tempm_back: formData.tempMFondo,
          tempb_door: formData.tempBPuerta,
          tempb_mid: formData.tempBMedio,
          tempb_back: formData.tempBFondo,
          temp_min: formData.tempMin,
          temp_max: formData.tempMax,
          temp_ideal: formData.tempIdeal,
          invest_res: formData.resultadosInv,
          insp_name: formData.nombreInspector,
          driver_sign: formData.nombreChofer
        })
      })

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`)
      }

      Swal.fire({
        title: 'Éxito',
        text: 'Datos insertados correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })

      console.log('Datos insertados correctamente')
    } else {
      console.log('Los datos no son válidos o están incompletos')
    }
  } catch (e) {
    await Swal.fire({
      title: 'Error',
      text: `El error es: ${String((e as Error).message)}`,
      icon: 'error',
      confirmButtonText: 'Entendido'
    })
    console.log('El error es:', e)
  }
}

export const update = async (formData: any) => {
  try {
    const { data, error } = await supabase
      .from('ActaDescarga')
      .update([{
        fecha: formData.fecha,
        start_verification: formData.inicioVerificacion,
        end_verification: formData.terminoVerificacion,
        oc: formData.oc,
        provider: formData.proveedor,
        origin: formData.origen,
        bill: formData.factura,
        specie: formData.especie,
        boxes_received: formData.cajasRecibidas,
        varieties: formData.especie,
        cold_disc: formData.frioDescarga,
        carrier_line: formData.lineaTransportista,
        num_cont: formData.numeroContenedor,
        truck_plt: formData.placasCamion,
        box_plt: formData.placasCaja,
        driver: formData.chofer,
        setpoint_temp: formData.tempSetPoint,
        screen_temp: formData.tempPantalla,
        setpoint_obs: formData.observacionesSetPoint,
        screen_obs: formData.observacionesPantalla,
        therm_dst: formData.tempDestino,
        therm_org_obs: formData.tempOrigen,
        therm_dst_obs: formData.tempDestino,
        clean_free: formData.limpio,
        clean_obs: formData.observacionesSetPoint,
        close: formData.cajaCerrada,
        close_obs: formData.observacionesSetPoint,
        box_state: formData.lona,
        box_obs: formData.observacionesSetPoint,
        tarp_state: formData.fauna,
        tarp_obs: formData.observacionesSetPoint,
        pest_free: formData.carga,
        pest_obs: formData.observacionesSetPoint,
        load_state: formData.seguridadCarga,
        load_obs: formData.observacionesSetPoint,
        load_sec: formData.seguridadCarga,
        sec_obs: formData.observacionesSetPoint,
        seal: formData.sellado,
        seal_obs: formData.observacionesSetPoint,
        pallet_dmg: formData.numeroSerie,
        pallet_num: formData.resultadosInv,
        box_id: formData.numeroSerie,
        box_num: formData.resultadosInv,
        box_dmg: formData.numeroSerie,
        dmg_num: formData.resultadosInv,
        tempa_door: formData.tempAPuerta,
        tempa_mid: formData.tempAMedio,
        tempa_back: formData.tempAFondo,
        tempm_door: formData.tempMPuerta,
        tempm_mid: formData.tempMMedio,
        tempm_back: formData.tempMFondo,
        tempb_door: formData.tempBPuerta,
        tempb_mid: formData.tempBMedio,
        tempb_back: formData.tempBFondo,
        temp_min: formData.tempMin,
        temp_max: formData.tempMax,
        temp_ideal: formData.tempIdeal,
        invest_res: formData.resultadosInv,
        insp_name: formData.nombreInspector,
        driver_sign: formData.nombreChofer
      }]).eq('oc', formData.oc)

    if (error != null) {
      console.log('Hubo un error:', error)
    } else {
      console.log('Datos insertados correctamente:', data)
    }
  } catch (e) {
    console.log('El error es:', e)
  }
}

export const fetchActas = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/fetchActas')

    if (!response.ok) {
      console.error('Error fetching actas:', response.status, response.statusText)
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching actas:', error)
    return null
  }
}

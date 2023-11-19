export class EventosService {

    #urlEventos = 'http://localhost:3000/api/eventos';
    #urlEventosIMG = 'http://localhost:3000/api/images/';

    async getEventos(token) {
        try {
            let res = await fetch(this.#urlEventos, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            .catch(err=>{
                return null;
            });

            if (res && res.ok) {
                // La solicitud fue exitosa (código de respuesta 200-299)
                const responseData = await res.json();

                return responseData;
            } else {
                if(res){
                    // La solicitud no fue exitosa
                    return res.json();
                }
                return null;
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error('Error en la solicitud:', error);
            return null;
        }
    }


    async postEvento(eventoData, formData, token) {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            
            // Enviar información del evento
            requestOptions.body = JSON.stringify(eventoData);
            const resEvento = await fetch(this.#urlEventos, requestOptions)
            
            const eventoReturn = await resEvento.json();
            
            if(eventoReturn.status == 'fail'){
                return eventoReturn;
            }
            
            if (resEvento.ok) {
                // La información del evento se envió correctamente
                const resImagen = await fetch(this.#urlEventosIMG, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (resImagen.ok) {
                    // La imagen se envió correctamente
                    const responseDataImagen = await resImagen.json();
                    console.log(responseDataImagen);

                    // La información del evento y la imagen se enviaron correctamente
                    
                    return eventoReturn;
                } else {
                    // La imagen no se envió correctamente
                    const errorDataImagen = await resImagen.json();
                    return errorDataImagen;
                }
            } else {
                // La información del evento no se envió correctamente
                return eventoReturn;
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error('Error en la solicitud:', error);
            return error;
        }
    }

}

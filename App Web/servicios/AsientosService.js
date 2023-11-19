export class AsientosService {

    #urlAsientos = 'http://localhost:3000/api/asientos';


    async getAsientos(token) {
        try {
            let res = await fetch(this.#urlAsientos, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .catch(err => {
                    return null;
                });
                
            if (res && res.ok) {
                // La solicitud fue exitosa (código de respuesta 200-299)
                const responseData = await res.json();
                
                return responseData;
            } else {
                if (res) {
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


    async postAsiento(data, token) {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            // Enviar información del evento
            requestOptions.body = JSON.stringify(data);
            const res = await fetch(this.#urlAsientos, requestOptions);

            if (res.ok) {
                // La información del boleto se envió correctamente

                return res.json();

            } else {
                // La información del boleto no se envió correctamente
                const error = await res.json();
                console.log(error);
                return error;
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error('Error en la solicitud:', error);
            return null;
        }
    }

}

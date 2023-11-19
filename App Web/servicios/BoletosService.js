export class BoletosService {

    #urlBoletos = 'http://localhost:3000/api/boletos';


    async getBoletos(token) {
        try {
            let res = await fetch(this.#urlBoletos, {
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

    async postBoleto(data, token, idEvento, precio, asientos) {
        const boletosEnviados = [];

        // Se crean el número de boletos que se especificaron en el número de boletos disponibles.
        for (let i = 0; i < data.numBoletosDisponibles; i++) {
            const dataBoleto = {
                idEvento,
                idAsiento: asientos[i].idAsiento,
                precio,
                estado: "DISPONIBLE"
            };

            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataBoleto),
                };

                // Enviar información del boleto
                const res = await fetch(this.#urlBoletos, requestOptions);

                if (res.ok) {
                    // La información del boleto se envió correctamente
                    const boletoEnviado = await res.json();
                    boletosEnviados.push(boletoEnviado);
                } else {
                    // La información del boleto no se envió correctamente
                    const error = await res.json();
                    console.log(error);
                    return error;
                }
            } catch (error) {
                // Manejar errores de red u otros errores
                console.error('Error en la solicitud:', error);
            }
        }

        // Devolver la lista de boletos enviados.
        return boletosEnviados;
    }


}

export class EventosService {

    #urlEventos = 'http://localhost:3000/api/eventos';
    
    async getEventos(token) {
        try {
            let res = await fetch(this.#urlEventos, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Ajusta según las necesidades de tu API
                },
            });

            if (res.ok) {
                // La solicitud fue exitosa (código de respuesta 200-299)
                const responseData = await res.json();

                return responseData;
            } else {
                // La solicitud no fue exitosa
                return res.json();
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error('Error en la solicitud:', error);
        }
    }
}

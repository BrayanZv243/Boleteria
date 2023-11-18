export class SessionService {

    #urlLogin = 'http://localhost:3000/api/login';

    async loginUserNormal(userData) {
        try {
            let res = await fetch(this.#urlLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Puedes agregar otros encabezados según sea necesario
                },
                body: JSON.stringify(userData),
            })
            .catch(err => console.log(err));
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

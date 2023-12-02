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

    async getEventoPorID(token, idEvento) {
        try {
            let res = await fetch(`${this.#urlEventos}/${idEvento}`, {
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

    async putEvento(idEvento, eventoData, formData, token, nombreImagenEliminar) {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventoData),
            };
            
            // Actualizar la información del evento
            const resEvento = await fetch(`${this.#urlEventos}/${idEvento}`, requestOptions);

            const eventoReturn = await resEvento.json();

            if (eventoReturn.status === 'fail') {
                return eventoReturn;
            }

            if (resEvento.ok) {
                // La información del evento se actualizó correctamente
                
                const resImagen = await fetch(`${this.#urlEventosIMG}/${nombreImagenEliminar}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (resImagen.ok) {
                    // La imagen se actualizó correctamente
                    const responseDataImagen = await resImagen.json();
                    console.log(responseDataImagen);

                    // La información del evento y la imagen se actualizaron correctamente

                    return eventoReturn;
                } else {
                    // La imagen no se actualizó correctamente
                    const errorDataImagen = await resImagen.json();
                    return errorDataImagen;
                }
            } else {
                // La información del evento no se actualizó correctamente
                return eventoReturn;
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error('Error en la solicitud:', error);
            return error;
        }
    }

    async deleteEvento(evento, token) {
        try {
            // URL de la imagen asociada al evento
            const urlImagen = `${this.#urlEventosIMG}${evento.nombreImagen}`;

            // Elimina la imagen asociada al evento
            const resEliminarImagen = await fetch(urlImagen, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!resEliminarImagen.ok) {
                const errorImagen = await resEliminarImagen.json();
                console.error('Error al eliminar la imagen:', errorImagen);
                // Puedes decidir si esto debe ser un error crítico o simplemente un registro.
            }

            // URL del evento específico que se desea eliminar
            const urlEvento = `${this.#urlEventos}/${evento.idEvento}`;
            // Envía la solicitud para eliminar el evento
            const resEliminarEvento = await fetch(urlEvento, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Maneja la respuesta del servidor
            if (resEliminarEvento.ok) {
                // El evento se eliminó correctamente
                return await resEliminarEvento.json();
            } else {
                // El evento no se eliminó correctamente
                const errorData = await resEliminarEvento.json();
                return errorData;
            }
        } catch (error) {
            // Maneja errores de red u otros errores
            console.error('Error en la solicitud:', error);
            return error;
        }
    }



}

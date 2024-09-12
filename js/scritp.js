function getCharacterInfo() {
    const characterNameInput = document.getElementById('characterName');
    const characterInfo = document.getElementById('characterInfo');

    const characterName = characterNameInput.value.trim();  // Eliminar espacios en blanco

    let url = 'http://localhost:3001/characters';

    // Si se introduce un nombre de personaje, añadirlo a la URL
    if (characterName) {
        url += `/${characterName}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los personajes');
            }
            return response.json();
        })
        .then(data => {
            // Si se busca un personaje específico, data es un objeto. Si se buscan todos, data es un array.
            if (Array.isArray(data)) {
                // Mostrar todos los personajes en el DOM si no se introdujo un nombre
                characterInfo.innerHTML = data.map(character => `
                    <div>
                        <h2>${character.name}</h2>
                        <img src="${character.image}" alt="${character.name}" />
                        <p><strong>Especie:</strong> ${character.species}</p>
                        <p><strong>Estado:</strong> ${character.status}</p>
                        <p><strong>Nombre de origen:</strong> ${character.origin.name}</p>
                        <p><strong>Género:</strong> ${character.gender}</p>
                    </div>
                `).join('');
            } else {
                // Mostrar un solo personaje si se introdujo un nombre
                const { name, status, species, gender, origin, image } = data;

                characterInfo.innerHTML = `
                    <h2>${name}</h2>
                    <img src="${image}" alt="${name}" />
                    <p><strong>Especie:</strong> ${species}</p>
                    <p><strong>Estado:</strong> ${status}</p>
                    <p><strong>Nombre de origen:</strong> ${origin}</p>
                    <p><strong>Género:</strong> ${gender}</p>
                `;
            }
        })
        .catch(error => {
            // En caso de error, mostrar mensaje
            characterInfo.innerHTML = `<p>No se pudo encontrar el personaje.</p>`;
        });
}

getCharacterInfo() 

/*
function getCharacterInfo() {
    const characterNameInput = document.getElementById('characterName');
    const characterInfo = document.getElementById('characterInfo');

    const characterName = characterNameInput.value.trim();  // Asegura que no haya espacios en blanco

    // Verifica si se ha ingresado un nombre de personaje
    if (!characterName) {
        characterInfo.innerHTML = '<p>Por favor, introduce un nombre de personaje.</p>';
        return;
    }

    fetch(`http://localhost:3001/characters/${characterName}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Personaje no encontrado');
        }
        return response.json();
    })
    .then(data => {
        const { name, status, species, gender, origin, image } = data;

        // Mostrar los datos del personaje en el DOM
        characterInfo.innerHTML = `
            <h2>${name}</h2>
            <img src="${image}" alt="${name}" />
            <p><strong>Especie:</strong> ${species}</p>
            <p><strong>Estado:</strong> ${status}</p>
            <p><strong>Nombre de origen:</strong> ${origin}</p>
            <p><strong>Género:</strong> ${gender}</p>
        `;
    })
    .catch(error => {
        // En caso de error, mostrar mensaje
        characterInfo.innerHTML = `<p>No se pudo encontrar el personaje.</p>`;
    });
}
    */
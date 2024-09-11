function getCharacterInfo() {
    const characterNameInput = document.getElementById('characterName');
    const characterInfo = document.getElementById('characterInfo');

    const characterName = characterNameInput.value;

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
            <p><strong>Nombre de origen:</strong> ${origin.name}</p>
            <p><strong>Género:</strong> ${gender}</p>
        `;
    })
    .catch(error => {
        // En caso de error, mostrar mensaje
        characterInfo.innerHTML = `<p>No se pudo encontrar el personaje.</p>`;
    });
}

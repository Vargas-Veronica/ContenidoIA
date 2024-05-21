document.getElementById('story-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const brand = document.getElementById('brand').value;
    const tone = document.getElementById('tone').value;
    const image = document.getElementById('image').files[0];
  
    const formData = new FormData();
    formData.append('brand', brand);
    formData.append('tone', tone);
    formData.append('image', image);
  
    try {
      const response = await fetch('/generate-story', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      document.getElementById('story-text').innerText = result.story;
    } catch (error) {
      console.error('Error generating story:', error);
    }
  });
  
  document.getElementById('generateButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    try {
        const response = await fetch('/generate-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputText })
        });
        const data = await response.json();
        document.getElementById('responseText').innerText = data.text;
        
        if (data.imageURL) {
            document.getElementById('selectedImage').src = data.imageURL;
            document.getElementById('selectedImage').style.display = 'block';
            
            const imageDescriptionResponse = await fetch('/describe-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageURL: data.imageURL })
            });
            const imageData = await imageDescriptionResponse.json();
            document.getElementById('responseText').innerText += '\nDescripción de la imagen: ' + imageData.description;
        }
    } catch (error) {
        console.error('Error al generar contenido:', error);
    }
});

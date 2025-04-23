import { useState } from 'react';

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({ name: '', image: '', price: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: formData.price,
    };

    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((data) => onAddPlant(data));

    setFormData({ name: '', image: '', price: '' });
  }

  return (
    <form onSubmit={handleSubmit} data-testid="plant-form">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Plant name"
      />
      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="http://example.com/image.jpg"
      />
      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;

// controllers/JewelryController.js
class JewelryController {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async postJewelry(jewelryData, jewelryImageFiles) {
    const formData = new FormData();
    Object.entries(jewelryData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    jewelryImageFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('http://localhost:3000/api/jewelry', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to add jewelry');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      alert('Error adding jewelry: ' + error.message);
      return null;
    }
  }

  // Fetch all jewelry from API
  async fetchJewelry() {
    try {
      const response = await fetch(`${this.baseUrl}/api/jewelry`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Jewelry fetched:', result);
      
      const jewelryData = result.data || result;
      return Array.isArray(jewelryData) ? jewelryData : [];
      
    } catch (error) {
      console.error('Error fetching jewelry:', error);
      throw error;
    }
  }

  // Add a new jewelry item
  async addJewelry(jewelryData, jewelryImageFile) {
    const formData = new FormData();

    // Process jewelry data
    for (const key in jewelryData) {
      if (key === 'priceRange' && jewelryData[key]) {
        // Handle price range if it's a special format
        formData.append(key, jewelryData[key]);
      } else {
        formData.append(key, jewelryData[key]);
      }
    }

    if (jewelryImageFile) {
      formData.append('image', jewelryImageFile);
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/jewelry`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('✅ Jewelry added:', result.data);
        return result.data;
      } else {
        console.error(result);
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Add jewelry error:', error);
      throw error;
    }
  }

  // Delete a jewelry item
  async deleteJewelry(jewelryId) {
    try {
      const response = await fetch(`${this.baseUrl}/api/jewelry/${jewelryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete jewelry');
      }

      return true;
    } catch (error) {
      console.error('Error deleting jewelry:', error);
      throw error;
    }
  }

  // Update a jewelry item (for future use)
  async updateJewelry(jewelryId, jewelryData, jewelryImageFile) {
    const formData = new FormData();

    // Process jewelry data
    for (const key in jewelryData) {
      formData.append(key, jewelryData[key]);
    }

    if (jewelryImageFile) {
      formData.append('image', jewelryImageFile);
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/jewelry/${jewelryId}`, {
        method: 'PUT',
        body: formData
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('✅ Jewelry updated:', result.data);
        return result.data;
      } else {
        console.error(result);
        throw new Error(result.message || 'Update failed');
      }
    } catch (error) {
      console.error('Update jewelry error:', error);
      throw error;
    }
  }

  // Get initial jewelry data structure
  getInitialJewelryData() {
    return {
      type: "",
      category: "",
      material: "",
      caratWeight: "",
      priceRange: "",
      size: "",
    };
  }

  // Validate jewelry data before submission
  validateJewelryData(jewelryData) {
    const errors = [];
    
    if (!jewelryData.type?.trim()) {
      errors.push('Jewelry Type is required');
    }
    
    if (!jewelryData.category?.trim()) {
      errors.push('Category is required');
    }
    
    if (!jewelryData.material?.trim()) {
      errors.push('Material is required');
    }
    
    return errors;
  }

  // Local storage methods (for client-side only jewelry management)
  addJewelryLocal(jewelry, jewelryData, jewelryImage) {
    return [...jewelry, { ...jewelryData, image: jewelryImage }];
  }

  deleteJewelryLocal(jewelry, index) {
    const newJewelry = [...jewelry];
    newJewelry.splice(index, 1);
    return newJewelry;
  }

  // Helper method to get proper image URL
  getImageUrl(imagePath, baseUrl = this.baseUrl) {
    if (!imagePath) {
      return null;
    }
    
    // If it's already a full URL or blob URL, return as is
    if (imagePath.startsWith('http') || imagePath.startsWith('blob:')) {
      return imagePath;
    }
    
    // If it starts with /, it's a relative path from public folder
    if (imagePath.startsWith('/')) {
      return `${baseUrl}${imagePath}`;
    }
    
    // If it's just a filename, assume it's in uploads folder
    return `${baseUrl}/uploads/${imagePath}`;
  }
}

export default JewelryController;
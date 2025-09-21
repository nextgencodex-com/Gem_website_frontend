// controllers/GemsController.js
class GemsController {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  // Fetch all gems from API
  async fetchGems() {
    try {
      const response = await fetch(`${this.baseUrl}/api/gems`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Full API response:', result);
      
      // Debug: Log the image paths
      const gemsData = result.data || result;
      if (Array.isArray(gemsData) && gemsData.length > 0) {
        console.log('First gem images:', gemsData[0].images);
        gemsData.forEach((gem, index) => {
          console.log(`Gem ${index} images:`, gem.images);
        });
      }
      
      return Array.isArray(gemsData) ? gemsData : [];
      
    } catch (error) {
      console.error('Error fetching gems:', error);
      throw error;
    }
  }

  // Add a new gem
  async addGem(gemData, gemImageFiles) {
    const formData = new FormData();

    // Process gem data
    for (const key in gemData) {
      if (key === 'dimensions') {
        for (const dim in gemData.dimensions) {
          formData.append(`dimensions[${dim}]`, parseFloat(gemData.dimensions[dim]) || 0);
        }
      } else if (key === 'caratWeight' || key === 'price' || key === 'hardness') {
        formData.append(key, parseFloat(gemData[key]) || 0);
      } else if (key === 'inStock') {
        formData.append(key, gemData[key] ? 'true' : 'false');
      } else {
        formData.append(key, gemData[key]);
      }
    }

    // Support multiple images
    if (gemImageFiles && gemImageFiles.length > 0) {
      for (const file of gemImageFiles) {
        formData.append('images', file); // 'images' matches backend field
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/gems`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('✅ Gem added:', result.data);
        return result.data;
      } else {
        console.error(result);
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Add gem error:', error);
      throw error;
    }
  }

  // Delete a gem
  async deleteGem(gemId) {
    try {
      const response = await fetch(`${this.baseUrl}/api/gems/${gemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete gem');
      }

      return true;
    } catch (error) {
      console.error('Error deleting gem:', error);
      throw error;
    }
  }

  // Update a gem (for future use)
  async updateGem(gemId, gemData, gemImageFile) {
    const formData = new FormData();

    // Process gem data similar to addGem
    for (const key in gemData) {
      if (key === 'dimensions') {
        for (const dim in gemData.dimensions) {
          formData.append(`dimensions[${dim}]`, parseFloat(gemData.dimensions[dim]) || 0);
        }
      } else if (key === 'caratWeight' || key === 'price' || key === 'hardness') {
        formData.append(key, parseFloat(gemData[key]) || 0);
      } else if (key === 'inStock') {
        formData.append(key, gemData[key] ? 'true' : 'false');
      } else {
        formData.append(key, gemData[key]);
      }
    }

    if (gemImageFile) {
      formData.append('image', gemImageFile);
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/gems/${gemId}`, {
        method: 'PUT',
        body: formData
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('✅ Gem updated:', result.data);
        return result.data;
      } else {
        console.error(result);
        throw new Error(result.message || 'Update failed');
      }
    } catch (error) {
      console.error('Update gem error:', error);
      throw error;
    }
  }

  // Get initial gem data structure
  getInitialGemData() {
    return {
      name: "",
      description: "",
      caratWeight: "",
      clarity: "",
      color: "",
      origin: "",
      cut: "",
      treatment: "",
      price: "",
      category: "",
      inStock: true,
      dimensions: {
        length: "",
        width: "",
        depth: ""
      },
      certificateNumber: "",
      laboratory: "",
      hardness: ""
    };
  }

  // Validate gem data before submission
  validateGemData(gemData) {
    const errors = [];
    
    if (!gemData.name?.trim()) {
      errors.push('Name is required');
    }
    
    if (!gemData.category?.trim()) {
      errors.push('Category is required');
    }
    
    if (gemData.price && isNaN(parseFloat(gemData.price))) {
      errors.push('Price must be a valid number');
    }
    
    if (gemData.caratWeight && isNaN(parseFloat(gemData.caratWeight))) {
      errors.push('Carat weight must be a valid number');
    }
    
    return errors;
  }

  // Helper method to render gem field values
  renderGemFieldValue(gem, key) {
    if (key === 'dimensions') {
      return `L:${gem.dimensions?.length || 0}, W:${gem.dimensions?.width || 0}, D:${gem.dimensions?.depth || 0}`;
    }
    if (key === 'inStock') {
      return gem[key] ? 'Yes' : 'No';
    }
    if (key === 'price' || key === 'caratWeight' || key === 'hardness') {
      return gem[key] || '0';
    }
    return gem[key] || '';
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

export default GemsController;
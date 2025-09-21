export async function fetchGems() {
  try {
    const res = await fetch("http://localhost:3000/api/gems");
    if (!res.ok) {
      throw new Error(`Failed to fetch gems: ${res.status}`);
    }
    const json = await res.json();

    // If data is under a "data" key as shown in your logs:
    return json.data;
  } catch (err) {
    console.error("Error fetching gems:", err);
    return [];
  }
}

// Helper function to get proper image URL
export function getImageUrl(imagePath, baseUrl = 'http://localhost:3000') {
  if (!imagePath) {
    return "/placeholder.svg";
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it starts with /, it's a relative path from server root
  if (imagePath.startsWith('/')) {
    return `${baseUrl}${imagePath}`;
  }
  
  // If it's just a filename, assume it's in uploads folder
  return `${baseUrl}/uploads/${imagePath}`;
}

// Add default export
export default fetchGems;
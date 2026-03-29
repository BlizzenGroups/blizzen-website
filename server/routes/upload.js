import express from 'express';

const router = express.Router();

// Upload single image as Base64 to database
router.post('/image', (req, res) => {
  try {
    const { image, filename, mimetype } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'No image data provided'
      });
    }

    // Validate Base64 format
    if (!image.startsWith('data:image/')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image format. Must be Base64 encoded.'
      });
    }

    // Validate size (Base64 is ~33% larger than binary)
    const sizeInMB = Buffer.byteLength(image, 'utf8') / (1024 * 1024);
    if (sizeInMB > 3) {
      return res.status(400).json({
        success: false,
        message: 'Image too large. Maximum 2MB allowed.'
      });
    }

    console.log(`✓ Image received: ${filename} (${sizeInMB.toFixed(2)}MB Base64)`);

    res.json({
      success: true,
      message: 'Image stored in database successfully',
      data: {
        image: image,
        filename: filename,
        mimetype: mimetype,
        size: sizeInMB
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Upload failed'
    });
  }
});

// Upload multiple images as Base64
router.post('/images', (req, res) => {
  try {
    const { images } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No images provided'
      });
    }

    const processedImages = images.map(img => ({
      image: img.image,
      filename: img.filename,
      mimetype: img.mimetype
    }));

    res.json({
      success: true,
      message: `${images.length} images stored in database successfully`,
      data: processedImages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Upload failed'
    });
  }
});

// Upload general files (PDFs, documents, etc.)
router.post('/', async (req, res) => {
  try {
    const { file, filename, type } = req.body;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'No file data provided'
      });
    }

    // Validate Base64 format
    if (!file.startsWith('data:')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file format. Must be Base64 encoded.'
      });
    }

    // Validate file type for PDFs
    if (type === 'application/pdf' && !file.startsWith('data:application/pdf')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid PDF format.'
      });
    }

    // Validate size (Base64 is ~33% larger than binary)
    const sizeInMB = Buffer.byteLength(file, 'utf8') / (1024 * 1024);
    if (sizeInMB > 15) { // Allow up to ~10MB actual file size
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum 10MB allowed.'
      });
    }

    console.log(`✓ File received: ${filename} (${sizeInMB.toFixed(2)}MB Base64)`);

    // For development/demo purposes, we'll return a mock URL
    // In production, you would save to cloud storage (AWS S3, Google Cloud, etc.)
    const timestamp = Date.now();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const mockUrl = `/uploads/${timestamp}_${sanitizedFilename}`;

    // Store file info in memory for demo (in production, save to actual storage)
    global.uploadedFiles = global.uploadedFiles || {};
    global.uploadedFiles[mockUrl] = {
      data: file,
      filename: filename,
      type: type,
      uploadedAt: new Date()
    };

    res.json({
      success: true,
      message: 'File uploaded successfully',
      url: mockUrl,
      data: {
        filename: filename,
        type: type,
        size: sizeInMB
      }
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'File upload failed'
    });
  }
});

// Serve uploaded files
router.get('/file/*', (req, res) => {
  try {
    const filePath = req.path.replace('/file', '');
    const fileInfo = global.uploadedFiles?.[filePath];
    
    if (!fileInfo) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Extract base64 data
    const base64Data = fileInfo.data.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Set appropriate headers
    res.setHeader('Content-Type', fileInfo.type);
    res.setHeader('Content-Disposition', `attachment; filename="${fileInfo.filename}"`);
    res.setHeader('Content-Length', buffer.length);
    
    res.send(buffer);
  } catch (error) {
    console.error('File serve error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to serve file'
    });
  }
});

export default router;

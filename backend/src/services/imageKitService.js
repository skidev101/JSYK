const ImageKit = require('imagekit');

const imageKit = new ImageKit({
   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const getImageUploadSignature = async (req, res) => {
   try {
      const result = await imageKit.getAuthenticationParameters();

      res.status(200).json({
         success: true,
         data: result
      })
   } catch (err) {
      console.error('ImageKit signature error:', err);
      res.status(500).json({
         success: false,
         message: 'Failed to generate upload signature',
      });
   }
}
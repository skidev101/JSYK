// controllers/profileController.js
const User = require('../models/User');
const SlugService = require('../services/slugService');
const { validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Rate limiting for URL changes (prevent abuse)
const urlChangeLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5, // 5 URL changes per day
  message: {
    error: 'Too many URL changes. Try again tomorrow.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false
});

class ProfileController {
  /**
   * Get public profile by URL slug
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   */
  static async getPublicProfile(req, res) {
    try {
      const { slug } = req.params;
      
      // Find user by any URL type
      const user = await User.findByProfileUrl(slug);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Profile not found',
          code: 'PROFILE_NOT_FOUND'
        });
      }
      
      // Increment profile views (background task)
      User.findByIdAndUpdate(
        user._id,
        { 
          $inc: { profileViews: 1 },
          $set: { lastProfileView: new Date() }
        }
      ).exec(); // Fire and forget
      
      // Return public profile data
      res.json({
        success: true,
        data: {
          username: user.username,
          bio: user.bio,
          profileImage: user.profileImage,
          profileUrl: user.profileUrl,
          profileViews: user.profileViews,
          memberSince: user.createdAt
        }
      });
      
    } catch (error) {
      console.error('Get public profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        code: 'SERVER_ERROR'
      });
    }
  }
  
  /**
   * Update user's profile URL
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   */
  static async updateProfileUrl(req, res) {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
          code: 'VALIDATION_ERROR'
        });
      }
      
      const { customUrl, useCustomUrl } = req.body;
      const userId = req.user.id;
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }
      
      // If user wants to use custom URL
      if (useCustomUrl && customUrl) {
        // Check if user has remaining custom URL changes
        if (user.urlPreferences.allowedCustomUrls <= 0) {
          return res.status(403).json({
            success: false,
            message: 'You have exceeded your custom URL limit',
            code: 'CUSTOM_URL_LIMIT_EXCEEDED'
          });
        }
        
        // Check URL availability
        const availability = await SlugService.checkUrlAvailability(customUrl, userId);
        if (!availability.available) {
          return res.status(400).json({
            success: false,
            message: 'URL not available',
            errors: availability.errors,
            code: 'URL_NOT_AVAILABLE'
          });
        }
        
        // Update user with custom URL
        user.customUrl = customUrl;
        user.urlPreferences.useCustomUrl = true;
        
        // Decrease allowed custom URLs if it's a new custom URL
        if (!user.urlPreferences.customUrlVerified) {
          user.urlPreferences.allowedCustomUrls -= 1;
          user.urlPreferences.customUrlVerified = true;
        }
        
      } else {
        // User wants to use default slug
        user.urlPreferences.useCustomUrl = false;
      }
      
      await user.save();
      
      res.json({
        success: true,
        message: 'Profile URL updated successfully',
        data: {
          profileUrl: user.profileUrl,
          customUrl: user.customUrl,
          profileSlug: user.profileSlug,
          useCustomUrl: user.urlPreferences.useCustomUrl,
          remainingCustomUrls: user.urlPreferences.allowedCustomUrls
        }
      });
      
    } catch (error) {
      console.error('Update profile URL error:', error);
      
      // Handle duplicate key error
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'This URL is already taken',
          code: 'URL_ALREADY_TAKEN'
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Server error',
        code: 'SERVER_ERROR'
      });
    }
  }
  
  /**
   * Check URL availability
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   */
  static async checkUrlAvailability(req, res) {
    try {
      const { url } = req.body;
      const userId = req.user?.id || null;
      
      if (!url) {
        return res.status(400).json({
          success: false,
          message: 'URL is required',
          code: 'URL_REQUIRED'
        });
      }
      
      const availability = await SlugService.checkUrlAvailability(url, userId);
      
      res.json({
        success: true,
        data: {
          url,
          available: availability.available,
          errors: availability.errors
        }
      });
      
    } catch (error) {
      console.error('Check URL availability error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        code: 'SERVER_ERROR'
      });
    }
  }
  
  /**
   * Get user's profile settings
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   */
  static async getProfileSettings(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select('-password');
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }
      
      res.json({
        success: true,
        data: {
          username: user.username,
          email: user.email,
          bio: user.bio,
          profileImage: user.profileImage,
          profileUrl: user.profileUrl,
          customUrl: user.customUrl,
          profileSlug: user.profileSlug,
          urlPreferences: user.urlPreferences,
          profileViews: user.profileViews
        }
      });
      
    } catch (error) {
      console.error('Get profile settings error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        code: 'SERVER_ERROR'
      });
    }
  }
}

// Export with rate limiting middleware
module.exports = {
  ProfileController,
  urlChangeLimit
};
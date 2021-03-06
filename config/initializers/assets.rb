# Be sure to restart your server when you modify this file.
Rails.application.config.assets.version = '1.1'
# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.precompile += %w( rails.validations.js material_icons.css form_social_image.css)

# Add additional assets to the asset load path
Rails.application.config.assets.paths << Rails.root.join("app", "assets", "fonts", "vendor", "bower_components")
Rails.application.config.assets.precompile << /\.(?:svg|eot|woff|ttf|otf)$/
# Precompile additional assets.
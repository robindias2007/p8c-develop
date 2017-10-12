# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.precompile += %w( rails.validations.js )

# Add additional assets to the asset load path
Rails.application.config.assets.paths << Rails.root.join("app", "assets", "fonts", "vendor", "bower_components")
Rails.application.config.assets.precompile += %w(.svg .eot .woff .ttf .otf)
# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( material_icons.css.erb form_social_image.scss)


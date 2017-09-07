namespace :regenerate do
  
  task :social_images => :environment do
  	path = "#{Rails.root}/public/forms_social_images/*"
  	FileUtils.rm_rf(Dir.glob(path))

  	forms = Form.all
  	forms.each do |form|
  		form.save_social_image
  		sleep(5)
  	end
  end

end
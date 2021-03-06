namespace :generate do
  task :slugs => :environment do
		
		def generate_slug(form)
	    @slug = "#{form.title.parameterize}"   
	    return @slug
		end

	  def generate_secure_id(form)
	    loop do
	      @id = SecureRandom.hex(6)
	      break unless Form.where(secure_id: @id).exists?
	    end
	    return @id
	  end

  	forms = Form.all
  	forms.each do |form|
  		form.slug = generate_slug(form)
  		puts form.slug
  		form.secure_id = generate_secure_id(form)
  		puts form.secure_id
  		form.save!
  	end

  end

end
json.extract! form, :id, :title, :description, :url1, :url2, :url3, :created_at, :updated_at
json.url form_url(form, format: :json)
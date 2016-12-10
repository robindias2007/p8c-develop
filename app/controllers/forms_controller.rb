class FormsController < ApplicationController
  before_action :set_form, only: [:show, :edit, :update, :destroy]
  
  # GET /forms
  # GET /forms.json
  def index
    @forms = Form.all
  end

  # GET /forms/1
  # GET /forms/1.json
  def show
  end

  # GET /forms/new
  def new
    @form = Form.new
  end

  # GET /forms/1/edit
  def edit
  end

  # POST /forms
  # POST /forms.json
  def create

    @form = Form.new(form_params)

    respond_to do |format|
      if @form.save
            if params[:commit] == 'Publish'

        # url = URI("https://api.urlmeta.org/?url=#{@form.url1}")

        # http = Net::HTTP.new(url.host, url.port)
        # http.use_ssl = true
        # http.verify_mode = OpenSSL::SSL::VERIFY_NONE

        # request = Net::HTTP::Get.new(url)

        # response = http.request(request)
        # puts response.read_body
        # debugger
        # hash = JSON.parse(response.read_body)

        # form.update(title:hash["meta"]["title"], description:hash["meta"]["description"])      

        format.html { redirect_to @form, notice: 'Form was successfully created.' }
        format.json { render :show, status: :created, location: @form }
  
        else params[:commit] == 'Save as Draft'
        format.html {redirect_to @form, notice: 'Form was successfully Saved.'}
        end

        else
        format.html { render :new }
        format.json { render json: @form.errors, status: :unprocessable_entity }
      end
    end
    end
  

  # PATCH/PUT /forms/1
  # PATCH/PUT /forms/1.json
  def update
    respond_to do |format|
      if @form.update(form_params)
        format.html { redirect_to @form, notice: 'Form was successfully updated.' }
        format.json { render :show, status: :ok, location: @form }
      else
        format.html { render :edit }
        format.json { render json: @form.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /forms/1
  # DELETE /forms/1.json
  def destroy
    @form.destroy
    respond_to do |format|
      format.html { redirect_to forms_url, notice: 'Form was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_form
      @form = Form.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def form_params
      params.require(:form).permit(:title, :description, :title1, :title2, :title3, :titel4, :title5, :url1, :url2, :url3, :url4, :url5)
    end
end

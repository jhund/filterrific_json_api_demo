class StudentsController < ApplicationController

  protect_from_forgery except: :index

  def index
    (@filterrific = initialize_filterrific(
      Student,
      params[:filterrific],
      select_options: {
        sorted_by: Student.options_for_sorted_by,
        with_country_id: Country.options_for_select,
      },
    )) || return
    @students = @filterrific.find.page(params[:page])

    @total_num_of_students = @filterrific.find.count
    @current_page = params[:page]

    puts "*" * 70
    puts "Page Number : " + @current_page.to_s
    puts "Number of Students in this Page : " + @students.length.to_s
    puts "TOTAL Number of Students in this SEARCH  : " + @total_num_of_students.to_s
    puts "*" * 70

    respond_to do |format|
      format.html
      format.js
      format.json
    end
  end

end

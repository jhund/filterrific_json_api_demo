json.students @students do |student|
  json.id student.id
  json.name student.full_name
  json.first_name student.first_name
  json.last_name student.last_name
  json.email student.email
  json.country student.country.name
  json.created_at student.created_at
end

json.total_num_of_students @total_num_of_students
json.per_page Student.per_page
json.current_page @current_page

json.countries Country.options_for_select

# 3 top level keys: data meta errors (if errors no data etc.)

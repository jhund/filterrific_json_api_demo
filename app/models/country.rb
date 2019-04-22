class Country < ApplicationRecord

  has_many :students, dependent: :nullify

  def self.options_for_select
    # order('LOWER(name)').map { |e| [e.name, e.id] }
    order(Arel::Nodes::NamedFunction.new("lower", [Country.arel_table[:name]])).map { |e| [e.name, e.id] }
  end

end

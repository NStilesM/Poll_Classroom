class TextResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :text_responses do |t|
      t.string :body, null: false
      t.integer :registerable_id, null: false
      t.string :registerable_type, null: false
      t.timestamps
    end
    add_index :text_responses, :registerable_id
  end
end

json.extract! @group, :name, :id

# json.questionIds @question.question_ids

json.questions(@group.questions) do |question|
  json.id question.id
  json.title question.title
  json.kind question.kind
  json.response_limit question.response_limit
  json.closed question.closed
  json.allow_unregistered question.allow_unregistered
  json.question_options do
    json.array! question.question_options, :id, :label
  end
end

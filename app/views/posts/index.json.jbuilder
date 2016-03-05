json.array!(@posts) do |post|
  json.extract! post, :id, :title, :body, :created_at
  json.url post_url(post, format: :json)
end

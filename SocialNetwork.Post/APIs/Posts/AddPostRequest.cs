﻿using Mediator;
using PostModel = SocialNetwork.Post.Data.Models.Post;

namespace SocialNetwork.Post.APIs.Posts
{
    public class AddPostRequest(PostModel post) : IRequest<PostModel>
    {
        public PostModel Post { get; } = post;
    }
}

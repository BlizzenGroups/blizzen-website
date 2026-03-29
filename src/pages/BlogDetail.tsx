import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Loader2, Tag } from "lucide-react";
import { apiService } from "@/services/api";
import { sanitizeHtml } from "@/lib/html-sanitizer";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image?: string;
  publishedAt: string;
  tags: string[];
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  // Memoize the sanitized content to prevent re-sanitization on every render
  const sanitizedContent = useMemo(() => {
    return post?.content ? sanitizeHtml(post.content) : "";
  }, [post?.content]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await apiService.getBlog(slug!);
      if (data.success) {
        setPost(data.data);
        // Fetch related posts from the same category
        fetchRelatedPosts(data.data.category, data.data._id);
      }
    } catch (error: any) {
      console.error("Failed to fetch blog post:", error);
      if (error.response?.status === 404) {
        navigate("/blog");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (category: string, currentPostId: string) => {
    try {
      const data = await apiService.getBlogs(category);
      if (data.success) {
        // Filter out current post and limit to 3
        const related = data.data
          .filter((p: BlogPost) => p._id !== currentPostId)
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error("Failed to fetch related posts:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
          <Button onClick={() => navigate("/blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/blog")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      </div>

      {/* Hero Image */}
      {post.image && (
        <div className="w-full h-[400px] relative overflow-hidden mb-12">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Article Content */}
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title) }}
          />
          
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Tag size={16} className="text-muted-foreground" />
              {post.tags.map((tag, idx) => (
                <Badge key={idx} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Excerpt */}
          <p 
            className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-6 py-2 mb-8"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.excerpt) }}
          />
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost._id} 
                  to={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    {relatedPost.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <Badge className="mb-3">{relatedPost.category}</Badge>
                      <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                        {relatedPost.title}
                      </h3>
                      <p 
                        className="text-sm text-muted-foreground line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(relatedPost.excerpt) }}
                      />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogDetail;

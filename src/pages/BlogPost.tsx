import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Facebook, Twitter, Linkedin, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { mockBlogs, getRelatedPosts } from '@/data/mockBlogs';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = mockBlogs.find(post => post.slug === slug);
  const relatedPosts = post ? getRelatedPosts(post) : [];

  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
    window.scrollTo(0, 0);
  }, [post, navigate]);

  if (!post) return null;

  return (
    <Layout>
      <div className="bg-white">
        {/* Back Button */}
        <div className="fixed top-24 left-4 md:left-8 z-50">
          <Button
            variant="outline"
            onClick={() => navigate('/blog')}
            className="bg-white/90 shadow-sm hover:shadow rounded-full p-2 flex items-center space-x-1 transition-all duration-300"
          >
            <ArrowLeft size={18} />
           
          </Button>
        </div>

        {/* Hero Section */}
        <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="container mx-auto px-6 pb-16 md:pb-20">
              <div className="max-w-5xl">
                <div className="space-y-4">
                  <span className="inline-block bg-white px-4 py-1.5 rounded-full">
                    {post.category}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-serif leading-tight">
                    {post.title}
                  </h1>
                  <p className="text-lg leading-relaxed md:pr-10">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-5 pt-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-14 h-14 rounded-full border-2 border-white shadow-lg"
                    />
                    <div>
                      <p className="font-medium text-lg">{post.author.name}</p>
                      <p>{post.date} • {post.readTime} phút đọc</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto -mt-10 md:-mt-16 relative z-10">
              {/* Content Container */}
              <article className="bg-white rounded-lg shadow-lg p-6 md:p-10 mb-12">
                {/* Reading progress and engagement bar */}
                <div className="flex items-center justify-between pb-6 mb-8 border-b">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Heart size={18} />
                      <span>{post.likes || 42}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle size={18} />
                      <span>{post.comments?.length || 8}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Bookmark size={18} className="cursor-pointer" />
                    <Share2 size={18} className="cursor-pointer" />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full border hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Content */}
                <div className="article-content prose prose-lg max-w-none">
                  <ReactMarkdown 
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-3xl font-serif font-bold mt-12 mb-6" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-2xl font-serif font-semibold mt-10 mb-5" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-xl font-serif font-medium mt-8 mb-4" {...props} />,
                      p: ({node, ...props}) => <p className="text-lg leading-relaxed mb-6 text-gray-700" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
                      li: ({node, ...props}) => <li className="text-lg text-gray-700" {...props} />,
                      blockquote: ({node, ...props}) => (
                        <blockquote className="pl-6 py-2 my-6 border-l-4 border-gray-200 italic" {...props} />
                      ),
                      a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                      img: ({node, src, alt, ...props}) => (
                        <figure className="my-8">
                          <img 
                            src={src} 
                            alt={alt} 
                            className="rounded-lg w-full object-cover max-h-[500px]" 
                            {...props} 
                          />
                          {alt && (
                            <figcaption className="text-center text-sm text-gray-500 mt-2">
                              {alt}
                            </figcaption>
                          )}
                        </figure>
                      ),
                      code: ({node, ...props}) => <code className="bg-gray-100 rounded px-1 font-mono text-sm" {...props} />,
                      pre: ({node, ...props}) => (
                        <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto my-6 font-mono text-sm" {...props} />
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>

                {/* Author Bio */}
                <div className="mt-12 pt-6 border-t">
                  <div className="flex items-start gap-5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full border"
                    />
                    <div>
                      <h3 className="font-serif text-lg font-medium mb-2">
                        Viết bởi {post.author.name}
                      </h3>
                      <p className="mb-4">
                        {post.author.bio || "Chuyên gia với nhiều năm kinh nghiệm trong lĩnh vực này. Luôn đam mê chia sẻ kiến thức và kinh nghiệm với độc giả."}
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="rounded-full">Theo dõi</Button>
                        <Button variant="ghost" size="sm" className="rounded-full">Xem thêm bài viết</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share Section */}
                <div className="border-t mt-10 pt-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h3 className="text-lg font-semibold">Chia sẻ bài viết</h3>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-full">
                        <Facebook size={18} className="text-blue-600" />
                        <span className="hidden md:inline">Facebook</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-full">
                        <Twitter size={18} className="text-blue-400" />
                        <span className="hidden md:inline">Twitter</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-full">
                        <Linkedin size={18} className="text-blue-700" />
                        <span className="hidden md:inline">LinkedIn</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </article>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className="mt-12 mb-16">
                  <h2 className="text-2xl font-serif font-semibold mb-8 after:content-[''] after:block after:w-16 after:h-1 after:bg-gray-200 after:mt-2">
                    Bài viết liên quan
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.slug}`}
                        className="group"
                      >
                        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-white px-3 py-1 rounded-full text-xs">
                                {relatedPost.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h3 className="font-serif text-lg font-medium mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            <p className="mb-4 line-clamp-2 flex-1">{relatedPost.excerpt}</p>
                            <div className="flex items-center justify-between text-sm mt-auto">
                              <span>{relatedPost.date}</span>
                              <span>{relatedPost.readTime} phút đọc</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="text-center mt-8">
                    <Button
                      variant="outline"
                      className="rounded-full px-6 border-gray-300 hover:bg-gray-50"
                      onClick={() => navigate('/blog')}
                    >
                      Xem tất cả bài viết
                    </Button>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
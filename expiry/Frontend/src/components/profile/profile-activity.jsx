import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Heart, Share2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const initialCounts = (feed) =>
  feed.map(() => ({ likes: 0, comments: 0, shares: 0 }));

const ProfileActivity = ({ activityFeed }) => {
  const [feed, setFeed] = useState(activityFeed);
  const [counts, setCounts] = useState(initialCounts(activityFeed));
  const [commentInputs, setCommentInputs] = useState(Array(activityFeed.length).fill(''));

  const handleLike = (index) => {
    setCounts((currentCounts) => currentCounts.map((item, i) => i === index ? { ...item, likes: item.likes + 1 } : item));
  };
  const handleComment = (index) => {
    setCounts((currentCounts) => currentCounts.map((item, i) => i === index ? { ...item, comments: item.comments + 1 } : item));
  };
  const handleShare = (index) => {
    setCounts((currentCounts) => currentCounts.map((item, i) => i === index ? { ...item, shares: item.shares + 1 } : item));
  };
  const handleRemove = (index) => {
    setFeed((currentFeed) => currentFeed.filter((_, i) => i !== index));
    setCounts((currentCounts) => currentCounts.filter((_, i) => i !== index));
    setCommentInputs((inputs) => inputs.filter((_, i) => i !== index));
  };
  const handleInputChange = (index, value) => {
    setCommentInputs((inputs) => inputs.map((input, i) => i === index ? value : input));
  };
  const handleAddComment = (index, event) => {
    event.preventDefault();
    if (commentInputs[index].trim() !== '') {
      handleComment(index);
      setCommentInputs((inputs) => inputs.map((input, i) => i === index ? '' : input));
    }
  };

  return (
    <div className="space-y-6">
      {feed.map((item, index) => (
        <Card key={index} className="relative">
          <button
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
            onClick={() => handleRemove(index)}
            aria-label="Remove activity"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-lg text-primary">
                {item.user[0]}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{item.user}</div>
                <div className="text-xs text-muted-foreground mb-1">{item.time}</div>
                {item.type === 'photos' ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {item.photos?.map((url, i) => (
                      <img key={i} src={url} alt="activity" className="rounded-lg object-cover w-full h-28" />
                    ))}
                  </div>
                ) : (
                  <div className="text-sm mt-1">{item.content}</div>
                )}
                <div className="flex gap-6 mt-4 text-muted-foreground">
                  <button type="button" className="flex items-center gap-1 hover:text-primary" onClick={() => handleLike(index)}>
                    <Heart className="w-5 h-5" />
                    <span className="text-xs">{counts[index].likes}</span>
                  </button>
                  <button type="button" className="flex items-center gap-1 hover:text-primary" onClick={() => handleComment(index)}>
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-xs">{counts[index].comments}</span>
                  </button>
                  <button type="button" className="flex items-center gap-1 hover:text-primary" onClick={() => handleShare(index)}>
                    <Share2 className="w-5 h-5" />
                    <span className="text-xs">{counts[index].shares}</span>
                  </button>
                </div>
                <form className="mt-3 flex gap-2" onSubmit={event => handleAddComment(index, event)}>
                  <Input
                    value={commentInputs[index] || ''}
                    onChange={event => handleInputChange(index, event.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" variantClassName="primary">Post</Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileActivity; 
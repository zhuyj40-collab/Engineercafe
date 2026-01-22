import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Mail, AtSign, Users, Bookmark, FileText, Settings } from 'lucide-react';

interface UserProfileProps {
  onClose: () => void;
}

export function UserProfile({ onClose }: UserProfileProps) {
  const mentionPosts = [
    { id: '1', author: '田中太郎', content: '@私 フロントエンド面接について...', time: '2時間前' },
    { id: '2', author: '佐藤花子', content: '@私 学習リソースのおすすめ', time: '5時間前' },
  ];

  const myPosts = [
    { id: '1', title: 'フロントエンド技術面接の準備方法は？', replies: 12, likes: 45, time: '昨日' },
    { id: '2', title: '就活体験をシェアします', replies: 8, likes: 32, time: '3日前' },
    { id: '3', title: 'React面接でよくある質問まとめ', replies: 25, likes: 89, time: '1週間前' },
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={onClose}>
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l shadow-lg overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-0 rounded-none">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>ユーザー</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>就活生</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">フロントエンドエンジニア</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">就活中</Badge>
                    <Badge variant="outline">フロントエンド</Badge>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 統計情報 */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs text-muted-foreground">応募</div>
              </div>
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-xs text-muted-foreground">フォロワー</div>
              </div>
              <div>
                <div className="text-2xl font-bold">89</div>
                <div className="text-xs text-muted-foreground">フォロー中</div>
              </div>
            </div>

            <Separator />

            {/* 連携メール */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-3">
                <Mail className="w-4 h-4" />
                連携メール
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">user@gmail.com</span>
                  </div>
                  <Badge variant="secondary">接続済み</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  メールを追加
                </Button>
              </div>
            </div>

            <Separator />

            {/* メンション */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-3">
                <AtSign className="w-4 h-4" />
                メンション
                <Badge variant="destructive" className="ml-auto">2</Badge>
              </h3>
              <div className="space-y-2">
                {mentionPosts.map(post => (
                  <div key={post.id} className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                    <div className="flex items-start justify-between mb-1">
                      <span className="font-medium text-sm">{post.author}</span>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{post.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* フォロワー */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-3">
                <Users className="w-4 h-4" />
                フォロワー
                <Badge variant="outline" className="ml-auto">156</Badge>
              </h3>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <Avatar key={i} className="border-2 border-background">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                  +151
                </div>
              </div>
            </div>

            <Separator />

            {/* トラッキング */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-3">
                <Bookmark className="w-4 h-4" />
                トラッキング中
              </h3>
              <div className="space-y-2">
                {['フロントエンド面接のコツ', 'Reactベストプラクティス', 'TypeScript応用'].map((topic, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 border rounded-lg">
                    <span className="text-sm">{topic}</span>
                    <Button variant="ghost" size="sm">解除</Button>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* 投稿 */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-3">
                <FileText className="w-4 h-4" />
                投稿
                <Badge variant="outline" className="ml-auto">{myPosts.length}</Badge>
              </h3>
              <div className="space-y-2">
                {myPosts.map(post => (
                  <div key={post.id} className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                    <h4 className="font-medium text-sm mb-2">{post.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{post.replies} 返信</span>
                      <span>{post.likes} いいね</span>
                      <span className="ml-auto">{post.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <Button variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              アカウント設定
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
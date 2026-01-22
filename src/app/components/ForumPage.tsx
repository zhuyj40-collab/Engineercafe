import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Search,
  Building2,
  MessageSquare,
  ThumbsUp,
  Eye,
  UserPlus,
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  Image as ImageIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Masonry from "react-responsive-masonry";

interface PostCard {
  id: string;
  type: "interview" | "complaint";
  company: string;
  position?: string;
  jobType?: "新卒" | "中途";
  title: string;
  content: string;
  category?: string;
  coverType: "image" | "text";
  coverImage?: string;
  coverColor?: string;
  author: string;
  authorAvatar: string;
  isAnonymous: boolean;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
  time: string;
}

export function ForumPage() {
  const [selectedSection, setSelectedSection] = useState<
    "interview" | "complaint"
  >("interview");
  const [searchQuery, setSearchQuery] = useState("");

  const interviewPosts: PostCard[] = [
    {
      id: "1",
      type: "interview",
      company: "Google Japan",
      position: "ソフトウェアエンジニア",
      jobType: "新卒",
      title: "Google新卒面接通過！\n5回の面接を乗り越えた話",
      content:
        "アルゴリズムとデータ構造が中心。LeetCode Medium多め。面接官が優しくてヒントくれた！",
      coverType: "text",
      coverColor: "from-blue-500 to-purple-600",
      author: "山田太郎",
      authorAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      isAnonymous: false,
      likes: 234,
      comments: 45,
      views: 1890,
      tags: ["Google", "アルゴリズム", "新卒"],
      time: "2時間前",
    },
    {
      id: "2",
      type: "interview",
      company: "LINE株式会社",
      position: "フロントエンド",
      jobType: "中途",
      title: "LINE中途面接\nReact実務経験を深掘り",
      content:
        "技術面接2回。コーディング課題は自宅完成型。実装の意図を説明する力が重要だった。",
      coverType: "text",
      coverColor: "from-green-500 to-teal-600",
      author: "匿名",
      authorAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      isAnonymous: true,
      likes: 156,
      comments: 32,
      views: 892,
      tags: ["LINE", "React", "中途"],
      time: "5時間前",
    },
    {
      id: "3",
      type: "interview",
      company: "メルカリ",
      position: "バックエンド",
      jobType: "中途",
      title: "メルカリ面接体験\nGo & マイクロサービス",
      content:
        "システムデザインが難しかった。でもチームの雰囲気がすごく良くて、働きたいと思った！",
      coverType: "text",
      coverColor: "from-red-500 to-pink-600",
      author: "佐藤花子",
      authorAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
      isAnonymous: false,
      likes: 98,
      comments: 23,
      views: 567,
      tags: ["メルカリ", "Go", "システムデザイン"],
      time: "昨日",
    },
    {
      id: "4",
      type: "interview",
      company: "サイバーエージェント",
      position: "Webエンジニア",
      jobType: "新卒",
      title: "CA新卒選考\nポートフォリオが\n決め手に！",
      content:
        "チーム開発経験とポートフォリオについて詳しく聞かれた。自分のプロジェクトを熱く語れることが大事。",
      coverType: "text",
      coverColor: "from-orange-500 to-amber-600",
      author: "田中健",
      authorAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
      isAnonymous: false,
      likes: 187,
      comments: 41,
      views: 1234,
      tags: ["CA", "新卒", "ポートフォリオ"],
      time: "2日前",
    },
    {
      id: "5",
      type: "interview",
      company: "Yahoo Japan",
      position: "データエンジニア",
      jobType: "中途",
      title: "Yahoo面接\nデータ分析スキルを\nアピール",
      content:
        "SQLとPythonの実技試験あり。実務でどう活用したかを具体的に説明できると◎",
      coverType: "text",
      coverColor: "from-purple-500 to-indigo-600",
      author: "鈴木一郎",
      authorAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
      isAnonymous: false,
      likes: 142,
      comments: 28,
      views: 945,
      tags: ["Yahoo", "データ分析", "SQL"],
      time: "3日前",
    },
  ];

  const complaintPosts: PostCard[] = [
    {
      id: "c1",
      type: "complaint",
      company: "A社（IT系）",
      title: "月100時間残業\n当たり前って\nおかしくない？",
      content:
        "求人には「残業少なめ」って書いてあったのに...土日出勤も頻繁。もう限界です。",
      category: "残業",
      coverType: "text",
      coverColor: "from-red-600 to-rose-700",
      author: "匿名",
      authorAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=a1",
      isAnonymous: true,
      likes: 456,
      comments: 89,
      views: 3421,
      tags: ["残業", "ブラック"],
      time: "3時間前",
    },
    {
      id: "c2",
      type: "complaint",
      company: "B株式会社",
      title: "給与が求人票と\n全然違う件",
      content:
        "年収500万のはずが、みなし残業80時間込み。実質時給計算したら...😭",
      category: "給与",
      coverType: "text",
      coverColor: "from-amber-600 to-orange-700",
      author: "匿名",
      authorAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=a2",
      isAnonymous: true,
      likes: 523,
      comments: 102,
      views: 4567,
      tags: ["給与", "求人詐欺"],
      time: "6時間前",
    },
    {
      id: "c3",
      type: "complaint",
      company: "C IT Solutions",
      title: "パワハラ上司に\n耐えられない",
      content:
        "ミスするとみんなの前で大声で怒鳴られる。何人も病んで辞めていった。",
      category: "ハラスメント",
      coverType: "text",
      coverColor: "from-slate-700 to-slate-900",
      author: "匿名",
      authorAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=a3",
      isAnonymous: true,
      likes: 687,
      comments: 134,
      views: 5234,
      tags: ["パワハラ", "ブラック"],
      time: "昨日",
    },
    {
      id: "c4",
      type: "complaint",
      company: "D Corporation",
      title: "有給が取れない\n雰囲気",
      content:
        "「充実した福利厚生」って嘘。有給申請すると嫌な顔される。",
      category: "福利厚生",
      coverType: "text",
      coverColor: "from-indigo-600 to-violet-700",
      author: "匿名",
      authorAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=a4",
      isAnonymous: true,
      likes: 298,
      comments: 56,
      views: 2134,
      tags: ["有給", "福利厚生"],
      time: "2日前",
    },
    {
      id: "c5",
      type: "complaint",
      company: "E Systems",
      title: "完全ブラック企業\n絶対応募しないで",
      content:
        "サービス残業強要、パワハラ、給与未払い。3ヶ月で退職決めた。",
      category: "ブラック企業",
      coverType: "text",
      coverColor: "from-red-700 to-red-900",
      author: "匿名",
      authorAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=a5",
      isAnonymous: true,
      likes: 892,
      comments: 167,
      views: 6789,
      tags: ["ブラック企業", "要注意"],
      time: "3日前",
    },
  ];

  const currentPosts =
    selectedSection === "interview"
      ? interviewPosts
      : complaintPosts;

  return (
    <div className="space-y-6">
      {/* ヘッダーセクション */}
      <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50 to-slate-100 pb-4">
        <Tabs
          value={selectedSection}
          onValueChange={(v) => setSelectedSection(v as any)}
          className="mb-4"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="interview" className="gap-2">
              <Building2 className="w-4 h-4" />
              面接体験
            </TabsTrigger>
            <TabsTrigger value="complaint" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              匿名ツッコミ
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <MessageSquare className="w-4 h-4" />
                投稿
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedSection === "interview"
                    ? "面接体験を投稿"
                    : "匿名で投稿"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {selectedSection === "complaint" && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                    ⚠️
                    完全匿名投稿です。誹謗中傷や虚偽の情報は禁止です。
                  </div>
                )}
                <Input placeholder="企業名..." />
                {selectedSection === "interview" && (
                  <>
                    <Input placeholder="職種..." />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="応募タイプ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="新卒">
                          新卒
                        </SelectItem>
                        <SelectItem value="中途">
                          中途
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                )}
                <Input placeholder="タイトル..." />
                <Textarea
                  placeholder="内容を入力..."
                  className="min-h-[150px]"
                />
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-2">
                    <ImageIcon className="w-4 h-4" />
                    画像を追加
                  </Button>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">キャンセル</Button>
                  <Button>投稿</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* マソンリーレイアウト */}
      <Masonry columnsCount={3} gutter="16px">
        {currentPosts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            {/* カバー部分 */}
            <div
              className={`relative bg-gradient-to-br ${post.coverColor} p-6 min-h-[240px] flex items-center justify-center`}
            >
              <h3 className="text-white font-bold text-2xl text-center leading-tight whitespace-pre-line">
                {post.title}
              </h3>
              {post.jobType && (
                <Badge
                  variant="secondary"
                  className="absolute top-3 right-3 bg-white/90 text-slate-900"
                >
                  {post.jobType}
                </Badge>
              )}
            </div>

            {/* コンテンツ部分 */}
            <CardContent className="p-4 space-y-3">
              <p className="text-sm line-clamp-3">
                {post.content}
              </p>

              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={post.authorAvatar} />
                    <AvatarFallback>
                      {post.author[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {post.isAnonymous ? "匿名" : post.author}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {post.time}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>{post.views}</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </Masonry>
    </div>
  );
}
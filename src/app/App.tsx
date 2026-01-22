import { useState } from 'react';
import { EmailManagement } from './components/EmailManagement';
import { CalendarView } from './components/CalendarView';
import { UserProfile } from './components/UserProfile';
import { ForumPage } from './components/ForumPage';
import { Button } from './components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Calendar, MessageSquare, Bell } from 'lucide-react';
import { Badge } from './components/ui/badge';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'forum'>('dashboard');
  const [showUserProfile, setShowUserProfile] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 顶部導航欄 */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                就活管理プラットフォーム
              </h1>
              <nav className="flex gap-2">
                <Button
                  variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('dashboard')}
                  className="gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  ダッシュボード
                </Button>
                <Button
                  variant={currentPage === 'forum' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('forum')}
                  className="gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  フォーラム
                </Button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              <Avatar 
                className="cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-primary transition-all"
                onClick={() => setShowUserProfile(true)}
              >
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>ユーザー</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* 主コンテンツエリア */}
      <main className="container mx-auto px-6 py-8">
        {currentPage === 'dashboard' ? (
          <div className="space-y-6">
            {/* メール管理システム */}
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-1">AIメール管理</h2>
                <p className="text-sm text-muted-foreground">
                  メールをスマートに分類し、返信内容を自動生成
                </p>
              </div>
              <EmailManagement />
            </div>

            {/* カレンダー / 応募進捗 */}
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-1">スケジュールと進捗</h2>
                <p className="text-sm text-muted-foreground">
                  面接スケジュールを管理し、就活進捗を追跡
                </p>
              </div>
              <CalendarView />
            </div>
          </div>
        ) : (
          <ForumPage />
        )}
      </main>

      {/* ユーザー情報サイドバー */}
      {showUserProfile && (
        <UserProfile onClose={() => setShowUserProfile(false)} />
      )}
    </div>
  );
}